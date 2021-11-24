import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { googlecloudvisionapi } from '../../config/googlecloudvisionapi';

@Injectable({
  providedIn: 'root'
})
export class GoogleVisionService {

  constructor(public http: HttpClient) { }
  // Setting up to detect logo in an image
    getLogo(base64Image) {
      const body = {
        "requests": [
          {
            "image": {
              "content": base64Image
            },
            "features": [
              {
                "type": "LOGO_DETECTION",
                "maxResults":1
              }
            ]
          }
        ]
      }
      return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + googlecloudvisionapi.googleCloudVisionAPIKey, body);
    }

    getLabel(base64Image) {
      const body = {
        "requests": [
          {
            "image": {
              "content": base64Image
            },
            "features": [
              {
                "type": "LABEL_DETECTION",
                "maxResults":1
              }
            ]
          }
        ]
      }
      return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + googlecloudvisionapi.googleCloudVisionAPIKey, body);
    }

    getLabels(base64Image,feature) {
      const body = {
      "requests": [
      {
      "features": [
      {
      "type": feature.value,
      "maxResults": 10
      }],
      "image": {
      "content": base64Image
      }}]}
      return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + googlecloudvisionapi.googleCloudVisionAPIKey, body);
      }
    
}

