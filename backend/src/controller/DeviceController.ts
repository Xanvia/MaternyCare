import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DeviceData } from "../entity/DeviceData";
import { MoreThanOrEqual, LessThanOrEqual } from "typeorm";

export class DeviceController {
  private static isScanning: boolean = false;
  private static scanInterval: NodeJS.Timer | null = null;
  private static deviceRepository = AppDataSource.getRepository(DeviceData);
  private static lastHeartRate: number = 140; // Starting with a normal fetal heart rate

  // Simulate realistic fetal heart rate data
  private static generateFetalHeartRateData() {
    // Fetal heart rate typically ranges from 110-160 bpm
    // Simulate small variations in heart rate
    const variation = Math.random() * 4 - 2; // -2 to +2 bpm change
    this.lastHeartRate = Math.max(
      110,
      Math.min(160, this.lastHeartRate + variation)
    );

    // Signal quality 0-100%
    const signalQuality = Math.random() * 20 + 80; // 80-100% quality

    return {
      heartRate: Math.round(this.lastHeartRate * 10) / 10, // Round to 1 decimal place
      signalQuality: Math.round(signalQuality),
    };
  }

  static async startDevice(req: Request, res: Response) {
    try {
      if (this.isScanning) {
        return res
          .status(400)
          .json({ message: "Device is already monitoring" });
      }

      this.isScanning = true;

      // Simulate periodic heart rate monitoring (every 2 seconds)
      this.scanInterval = setInterval(async () => {
        const fetalData = this.generateFetalHeartRateData();

        const deviceData = new DeviceData();
        deviceData.heartRate = fetalData.heartRate;
        deviceData.signalQuality = fetalData.signalQuality;
        deviceData.isScanning = true;

        await this.deviceRepository.save(deviceData);
      }, 2000); // Collect data every 2 seconds

      return res.status(200).json({
        message: "Fetal heart rate monitoring started",
        status: "monitoring",
      });
    } catch (error) {
      console.error("Error starting monitoring:", error);
      return res.status(500).json({
        message: "Error starting fetal heart rate monitoring",
        error: error.message,
      });
    }
  }

  static async stopDevice(req: Request, res: Response) {
    try {
      if (!this.isScanning) {
        return res.status(400).json({ message: "Device is not monitoring" });
      }

      if (this.scanInterval) {
        clearInterval(this.scanInterval);
        this.scanInterval = null;
      }

      this.isScanning = false;

      // Save final reading
      const fetalData = this.generateFetalHeartRateData();
      const deviceData = new DeviceData();
      deviceData.heartRate = fetalData.heartRate;
      deviceData.signalQuality = fetalData.signalQuality;
      deviceData.isScanning = false;
      await this.deviceRepository.save(deviceData);

      return res.status(200).json({
        message: "Fetal heart rate monitoring stopped",
        status: "stopped",
        lastReading: fetalData,
      });
    } catch (error) {
      console.error("Error stopping monitoring:", error);
      return res.status(500).json({
        message: "Error stopping fetal heart rate monitoring",
        error: error.message,
      });
    }
  }

  static async fetchData(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 30; // Default to last 30 readings
      const timeRange = parseInt(req.query.timeRange as string) || 60; // Default to last 60 seconds

      const timeThreshold = new Date(Date.now() - timeRange * 1000);

      const data = await this.deviceRepository.find({
        where: {
          timestamp: MoreThanOrEqual(timeThreshold),
        },
        order: { timestamp: "DESC" },
        take: limit,
      });

      // Calculate average heart rate
      const avgHeartRate =
        data.length > 0
          ? data.reduce((sum, reading) => sum + reading.heartRate, 0) /
            data.length
          : null;

      return res.status(200).json({
        message: "Data retrieved successfully",
        currentStatus: this.isScanning ? "monitoring" : "stopped",
        averageHeartRate: avgHeartRate
          ? Math.round(avgHeartRate * 10) / 10
          : null,
        data: data,
      });
    } catch (error) {
      console.error("Error fetching heart rate data:", error);
      return res.status(500).json({
        message: "Error fetching fetal heart rate data",
        error: error.message,
      });
    }
  }
}
