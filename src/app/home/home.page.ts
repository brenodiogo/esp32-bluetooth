import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public listOfBluetoothDevices: any;

  constructor(
    public toastController: ToastController,
    public bluetoothSerial: BluetoothSerial,
    public loadingController: LoadingController
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

  async listarBluetooth() {
    const loader = await this.presentLoading();
    await loader.present();
    try {
      const listOfBluetoothDevices = await this.bluetoothSerial.list();
      this.listOfBluetoothDevices = listOfBluetoothDevices;
      this.presentToast("Obtive lista de Bluetooth com sucesso!");
    } catch (error) {
      this.presentToast(error);
      return error;
    } finally {
      await loader.dismiss();
    }
  }

  async conectarComDispositivo(address: string) {
    const loader = await this.presentLoading();
    await loader.present();
    this.presentToast("Conectando com " + address);
    this.bluetoothSerial
      .connect(address)
      .subscribe(
        async success => {
          await loader.dismiss();
        },
        async error => {
          await loader.dismiss();
          console.log("erro" + error)
        }
      );
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      translucent: true,
      cssClass: "custom-class custom-loading"
    });
    return loading;
  }
}
