import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DeviceData } from "../entity/DeviceData";
import { Mother } from "../entity/Mother";
import { MoreThanOrEqual } from "typeorm";

export class DeviceController {
  private scanInterval: NodeJS.Timer | null = null;
  private deviceRepository = AppDataSource.getRepository(DeviceData);
  private motherRepository = AppDataSource.getRepository(Mother);
  private lastHeartRate: number = 140;

  // Generate fetal heart rate data
  private generateFetalHeartRateData() {
    const variation = Math.random() * 4 - 2;
    this.lastHeartRate = Math.max(
      110,
      Math.min(160, this.lastHeartRate + variation)
    );
    const signalQuality = Math.random() * 20 + 80;

    return {
      heartRate: Math.round(this.lastHeartRate * 10) / 10,
      signalQuality: Math.round(signalQuality),
    };
  }

  async startDevice(request: Request, response: Response) {
    const { motherId } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      const isScanning = await this.deviceRepository.findOne({
        where: { isScanning: true, mother: { id: motherId } },
      });

      if (isScanning) {
        return { message: "Device is already monitoring" };
      }

      this.scanInterval = setInterval(async () => {
        const fetalData = this.generateFetalHeartRateData();

        const deviceData = new DeviceData();
        deviceData.heartRate = fetalData.heartRate;
        deviceData.signalQuality = fetalData.signalQuality;
        deviceData.isScanning = true;
        deviceData.mother = mother;

        await this.deviceRepository.save(deviceData);
      }, 2000);

      return {
        message: "Fetal heart rate monitoring started",
        status: "monitoring",
      };
    } catch (error) {
      console.error("Error starting monitoring:", error);
      return {
        message: "Error starting fetal heart rate monitoring",
        error: error.message,
      };
    }
  }

  async stopDevice(request: Request, response: Response) {
    const { motherId } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      const isScanning = await this.deviceRepository.findOne({
        where: { isScanning: true, mother: { id: motherId } },
      });

      if (!isScanning) {
        return { message: "Device is not monitoring" };
      }

      if (this.scanInterval) {
        clearInterval(this.scanInterval);
        this.scanInterval = null;
      }

      // Update all records to set isScanning to false for the specific mother
      await this.deviceRepository.update(
        { isScanning: true, mother: { id: motherId } },
        { isScanning: false }
      );

      const fetalData = this.generateFetalHeartRateData();
      const deviceData = new DeviceData();
      deviceData.heartRate = fetalData.heartRate;
      deviceData.signalQuality = fetalData.signalQuality;
      deviceData.isScanning = false;
      deviceData.mother = mother;
      await this.deviceRepository.save(deviceData);

      return {
        message: "Fetal heart rate monitoring stopped",
        status: "stopped",
        lastReading: fetalData,
      };
    } catch (error) {
      console.error("Error stopping monitoring:", error);
      return {
        message: "Error stopping fetal heart rate monitoring",
        error: error.message,
      };
    }
  }

  async fetchData(request: Request) {
    const { motherId } = request.query;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: parseInt(motherId as string) },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      const limit = parseInt(request.query.limit as string) || 30;
      const timeRange = parseInt(request.query.timeRange as string) || 60;

      const timeThreshold = new Date(Date.now() - timeRange * 1000);

      const data = await this.deviceRepository.find({
        where: {
          timestamp: MoreThanOrEqual(timeThreshold),
          mother: { id: mother.id },
        },
        order: { timestamp: "DESC" },
        take: limit,
      });

      const avgHeartRate =
        data.length > 0
          ? data.reduce((sum, reading) => sum + reading.heartRate, 0) /
            data.length
          : null;

      const isScanning = await this.deviceRepository.findOne({
        where: { isScanning: true, mother: { id: mother.id } },
      });

      return {
        message: "Data retrieved successfully",
        currentStatus: isScanning ? "monitoring" : "stopped",
        averageHeartRate: avgHeartRate
          ? Math.round(avgHeartRate * 10) / 10
          : null,
        data: data,
      };
    } catch (error) {
      console.error("Error fetching heart rate data:", error);
      return {
        message: "Error fetching fetal heart rate data",
        error: error.message,
      };
    }
  }
}
