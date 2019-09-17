import { Component, OnInit } from "@angular/core";
import { BluetoothService } from "src/app/services/bluetooth-service.service";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";
import { ToastController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-dispositivo",
  templateUrl: "./dispositivo.page.html",
  styleUrls: ["./dispositivo.page.scss"]
})
export class DispositivoPage implements OnInit {
  connectedDevice: string;
  ligaDesliga: boolean = false;
  mostrarBotaoPrincipal: boolean = false;
  bombaEstaLigada: boolean = false;
  velocidade: number = 2000;

  constructor(
    private bluetoothService: BluetoothService,
    public bluetoothSerial: BluetoothSerial,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.connectedDevice = this.bluetoothService.getConnectedDevice();
  }

  async conectarDispositivo() {
    const loader = await this.createLoader();
    loader.present();
    this.bluetoothSerial.connect(this.connectedDevice).subscribe(
      success => {
        loader.dismiss();
        console.log("sucesso em conexão");
        console.log(success);
        this.presentToast(success);
        this.mostrarBotaoPrincipal = true;
      },
      error => {
        loader.dismiss();
        console.error("erro" + error);
        console.error(error);
        console.log(error);
        this.presentToast(error);
      }
    );
  }

  async escreverDados() {
    this.bombaEstaLigada = !this.bombaEstaLigada;
    // this.ligaDesliga = !this.ligaDesliga;
    const loader = await this.createLoader();
    // let message = this.ligaDesliga ? "ligar" : "desligar";
    loader.present();
    this.bluetoothSerial.write("1").then(
      async success => {
        loader.dismiss();
        this.presentToast("Comando ligar enviado");
        console.log("Comando 1 enviado.");
        console.log(success);
        await this.timeout(this.velocidade);
        this.bombaEstaLigada = !this.bombaEstaLigada;
      },
      async error => {
        loader.dismiss();
        // this.bombaEstaLigada = !this.bombaEstaLigada;
        this.presentToast("Erro ao enviar mensagem. Erro: " + error);
        console.error("Erro ao enviar mensagem. Erro: " + error);
        console.error(error);
        await this.timeout(this.velocidade);
        // console.log("Timeout: " +this.velocidade);
        this.bombaEstaLigada = !this.bombaEstaLigada;
      }
    );
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  // async escreverDados() {
  //   this.ligaDesliga = !this.ligaDesliga;
  //   const loader = await this.createLoader();
  //   let message = this.ligaDesliga ? "ligar" : "desligar";
  //   loader.present();
  //   this.bluetoothSerial.write(message).then(
  //     success => {
  //       loader.dismiss();
  //       this.presentToast("Comando enviado: " + message);
  //       console.log("Comando enviado: " + message);
  //       console.log(message);
  //       console.log(success);
  //     },
  //     error => {
  //       loader.dismiss();
  //       this.presentToast(
  //         "Erro ao enviar mensagem: " + message + " . Erro: " + error
  //       );
  //       console.error(
  //         "Erro ao enviar mensagem: " + message + " . Erro: " + error
  //       );
  //       console.error(error);
  //     }
  //   );
  // }

  async escreverDadosComoBuffer() {
    // Typed Array
    var data = new Uint8Array(4);
    data[0] = 0x41;
    data[1] = 0x42;
    data[2] = 0x43;
    data[3] = 0x44;

    // Array Buffer
    this.ligaDesliga = !this.ligaDesliga;
    const loader = await this.createLoader();
    let message = this.ligaDesliga ? "ligar" : "desligar";
    loader.present();
    this.bluetoothSerial.write(data.buffer).then(
      success => {
        loader.dismiss();
        this.presentToast("Comando enviado: " + message);
        console.log("Comando enviado: " + message);
        console.log(message);
        console.log(success);
      },
      error => {
        loader.dismiss();
        this.presentToast(
          "Erro ao enviar mensagem: " + message + " . Erro: " + error
        );
        console.error(
          "Erro ao enviar mensagem: " + message + " . Erro: " + error
        );
        console.error(error);
      }
    );
  }

  async testarConexao() {
    const loader = await this.createLoader();
    loader.present();
    this.bluetoothSerial.isConnected().then(
      success => {
        loader.dismiss();
        this.presentToast("Bluetooth is connected");
        console.log("Bluetooth is connected");
        console.log(success);
      },
      error => {
        loader.dismiss();
        this.presentToast("Bluetooth is not connected");
        console.error("Bluetooth is not connected");
        console.error(error);
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
}
