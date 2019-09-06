import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class BluetoothService {
  private device: any;

  constructor() {}

  getConnectedDevice() {
    return this.device;
  }

  setConnectedDevice(device: any) {
    this.device = device;
  }
}
