import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    public toastController: ToastController,
    public bluetoothSerial: BluetoothSerial
  ) {}

  ativarBluetooth() {
    this.presentToast("Ativar Bluetooth Clicado");
    this.bluetoothSerial.enable().then(
      () => {
        this.presentToast("Ativar Bluetooth Sucesso");
      },
      () => {
        this.presentToast("Ativar Bluetooth Erro");
      }
    );
  }

  listarBluetooth() {}

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
