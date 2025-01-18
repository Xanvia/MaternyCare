import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DeviceData } from "../entity/DeviceData";
import { MoreThanOrEqual } from "typeorm";

export class DeviceController {
  private static isScanning: boolean = false;
  private static scanInterval: NodeJS.Timer | null = null;
  private static deviceRepository = AppDataSource.getRepository(DeviceData);
  private static lastHeartRate: number = 140;

  // Generate fetal heart rate data
  private static generateFetalHeartRateData() {
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

  static async startDevice(request: Request, response: Response) {
    try {
      if (this.isScanning) {
        return response
          .status(400)
          .json({ message: "Device is already monitoring" });
      }

      this.isScanning = true;

      this.scanInterval = setInterval(async () => {
        const fetalData = this.generateFetalHeartRateData();

        const deviceData = new DeviceData();
        deviceData.heartRate = fetalData.heartRate;
        deviceData.signalQuality = fetalData.signalQuality;
        deviceData.isScanning = true;

        await this.deviceRepository.save(deviceData);
      }, 2000);

      return response.status(200).json({
        message: "Fetal heart rate monitoring started",
        status: "monitoring",
      });
    } catch (error) {
      console.error("Error starting monitoring:", error);
      return response.status(500).json({
        message: "Error starting fetal heart rate monitoring",
        error: error.message,
      });
    }
  }

  static async stopDevice(request: Request, response: Response) {
    try {
      if (!this.isScanning) {
        return response
          .status(400)
          .json({ message: "Device is not monitoring" });
      }

      if (this.scanInterval) {
        clearInterval(this.scanInterval);
        this.scanInterval = null;
      }

      this.isScanning = false;

      const fetalData = this.generateFetalHeartRateData();
      const deviceData = new DeviceData();
      deviceData.heartRate = fetalData.heartRate;
      deviceData.signalQuality = fetalData.signalQuality;
      deviceData.isScanning = false;
      await this.deviceRepository.save(deviceData);

      return response.status(200).json({
        message: "Fetal heart rate monitoring stopped",
        status: "stopped",
        lastReading: fetalData,
      });
    } catch (error) {
      console.error("Error stopping monitoring:", error);
      return response.status(500).json({
        message: "Error stopping fetal heart rate monitoring",
        error: error.message,
      });
    }
  }

  static async fetchData(request: Request, response: Response) {
    try {
      const limit = parseInt(request.query.limit as string) || 30;
      const timeRange = parseInt(request.query.timeRange as string) || 60;

      const timeThreshold = new Date(Date.now() - timeRange * 1000);

      const data = await this.deviceRepository.find({
        where: {
          timestamp: MoreThanOrEqual(timeThreshold),
        },
        order: { timestamp: "DESC" },
        take: limit,
      });

      const avgHeartRate =
        data.length > 0
          ? data.reduce((sum, reading) => sum + reading.heartRate, 0) /
            data.length
          : null;

      return response.status(200).json({
        message: "Data retrieved successfully",
        currentStatus: this.isScanning ? "monitoring" : "stopped",
        averageHeartRate: avgHeartRate
          ? Math.round(avgHeartRate * 10) / 10
          : null,
        data: data,
      });
    } catch (error) {
      console.error("Error fetching heart rate data:", error);
      return response.status(500).json({
        message: "Error fetching fetal heart rate data",
        error: error.message,
      });
    }
  }
}
