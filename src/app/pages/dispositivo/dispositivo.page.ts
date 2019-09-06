import { Component, OnInit } from '@angular/core';
import { BluetoothService } from 'src/app/services/bluetooth-service.service';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {
  connectedDevice: string;

  constructor(private bluetoothService: BluetoothService) { }

  ngOnInit() {
    this.connectedDevice = this.bluetoothService.getConnectedDevice();
  }

}
