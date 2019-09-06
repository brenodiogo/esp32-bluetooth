import { Component, ChangeDetectorRef } from "@angular/core";
import { ToastController } from "@ionic/angular";
// import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { BLE } from "@ionic-native/ble/ngx";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public listOfBluetoothDevices: any[] = [];

  constructor(
    public toastController: ToastController,
    // public bluetoothSerial: BluetoothSerial,
    private ble: BLE,
    public loadingController: LoadingController,
    private changeDetector: ChangeDetectorRef
  ) {}

  ativarBluetooth() {
    this.presentToast("Ativar Bluetooth Clicado");
    this.ble.enable().then(
      sucesso => {
        this.presentToast("Ativar Bluetooth Sucesso" + sucesso);
      },
      error => {
        this.presentToast("Ativar Bluetooth Erro " + error);
      }
    );
  }

  async buscarBluetooth() {
    const loader = await this.createLoader();
    await loader.present();
    this.listOfBluetoothDevices = [];

    this.ble.scan([], 8).subscribe(
      success => {
        loader.dismiss();
        this.presentToast("Obtive lista de Bluetooth com sucesso! " + success);
        console.log("Sucess on bluetooth scan");
        console.log(success);
        this.listOfBluetoothDevices.push(success);
        this.changeDetector.detectChanges();
      },
      error => {
        loader.dismiss();
        this.presentToast(error);
        console.log(error);
        this.presentToast("Não obtive lista de Bluetooth. " + error);
        return error;
      }
    );
  }

  async conectarComDispositivo(address: string) {
    const loader = await this.createLoader();
    loader.present();
    this.presentToast("Conectando com " + address);
    this.ble.connect(address).subscribe(
      success => {
        loader.dismiss();
        console.log("sucesso" + success);
        this.presentToast(success);
      },
      async error => {
        loader.dismiss();
        console.log("erro" + error);
        this.presentToast(error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  async createLoader() {
    const loader = await this.loadingController.create({
      message: "Please wait...",
      translucent: true,
      cssClass: "custom-class custom-loading"
    });
    return loader;
  }

  // ASCII only
  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  // ASCII only
  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }
}
// Bluetooth serial

//  ativarBluetooth() {
//   this.presentToast("Ativar Bluetooth Clicado");
//   this.bluetoothSerial.enable().then(
//     () => {
//       this.presentToast("Ativar Bluetooth Sucesso");
//     },
//     () => {
//       this.presentToast("Ativar Bluetooth Erro");
//     }
//   );
// }

// async listarBluetooth() {
//   const loader = await this.presentLoading();
//   await loader.present();
//   try {
//     const listOfBluetoothDevices = await this.bluetoothSerial.list();
//     this.listOfBluetoothDevices = listOfBluetoothDevices;
//     this.presentToast("Obtive lista de Bluetooth com sucesso!");
//   } catch (error) {
//     this.presentToast(error);
//     return error;
//   } finally {
//     await loader.dismiss();
//   }
// }

// async conectarComDispositivo(address: string) {
//   const loader = await this.presentLoading();
//   await loader.present();
//   this.presentToast("Conectando com " + address);
//   this.bluetoothSerial
//     .connect(address)
//     .subscribe(
//       async success => {
//         await loader.dismiss();
//         console.log("sucesso" + success);
//         this.presentToast(success);
//       },
//       async error => {
//         await loader.dismiss();
//         console.log("erro" + error);
//         this.presentToast(error);
//       }
//     );
// }

// let connectCallback = (data) => {
//   console.log(data);
//   loader.dismiss();
// };
// let errorConnectCallback = (error) => {
//   console.log(error);
//   loader.dismiss();
// };
