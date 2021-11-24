import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleVisionService} from '../service/google-vision.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedfeature:"LABEL_DETECTION";

  constructor(private camera: Camera,
    public alertController: AlertController,
    private vision: GoogleVisionService,
    private route : Router,
    public loadingController: LoadingController,) { }

  ngOnInit() {
  }

  async takePhoto() {
    const options: CameraOptions = {
    quality: 100,
    targetHeight: 500,
    targetWidth: 500,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    // correctOrientation: true
    }
    this.camera.getPicture(options).then(async (imageData) => {
    const loading = await this.loadingController.create({
    message: 'Getting Results...',
    translucent: true
    });
    await loading.present();
    this.vision.getLabels(imageData,this.selectedfeature).subscribe(async (result) => {
    console.log(result)
    let navigationExtras: NavigationExtras = {
    queryParams: {
    special: JSON.stringify(imageData),
    result : JSON.stringify(result),
    feature : JSON.stringify(this.selectedfeature)
    }};
    console.log('route====')
    this.route.navigate(["show-class"],navigationExtras)
    await loading.dismiss()
    }, err => {
    console.log(err);
    });
    }, err => {
    console.log(err);
    });
    }

    async selectPhoto(){
      const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
      }
      this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      const loading = await this.loadingController.create({
      message: 'Getting Results...',
      translucent: true
      });
      await loading.present();
      this.vision.getLabels(imageData,this.selectedfeature).subscribe(async (result) => {
      let navigationExtras: NavigationExtras = {
      queryParams: {
      special: JSON.stringify(imageData),
      result : JSON.stringify(result),
      feature : JSON.stringify(this.selectedfeature)
      }};
      this.route.navigate(["showclass"],navigationExtras)
      await loading.dismiss()
      }, err => {
      console.log(err);
      });
      }, (err) => {
      console.log(err)
      })
      }

      async presentAlertConfirm() {
        const alert = await this.alertController.create({
        header: 'Select one option ',
        message: 'Take Photo or Select from Galary!!!',
        buttons: [
        {
        text: 'Camera',
        role: 'camera',
        handler: () => {
        this.takePhoto();
        }
        }, {
        text: 'Gallery',
        role: 'gallery',
        handler: () => {
        this.selectPhoto();
        }
        }
        ]
        });
        await alert.present();
        }

        radioGroupChange(event)
        {
        this.selectedfeature = event.detail;
        }

  }