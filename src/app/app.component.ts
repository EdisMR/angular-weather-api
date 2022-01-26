import { Component } from '@angular/core';
import { RequestService } from './request.service';
import { location } from './interfaces';
import { Weather } from './resultInterface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather-api';

  instancia: any = '';

  datosCapture: any = false;

  defineUrlImagen(): string {
    return `https://openweathermap.org/img/wn/${this.datosCapture.weather[0].icon}.png`;
  }


  setLocation(values: { lat: string; lon: string }): void {
    this.RequestService.setLatitude(values.lat);
    this.RequestService.setLongitude(values.lon);

    this.instancia = this.RequestService.getData()
    .then((result:Weather) => {
      this.datosCapture = result;
    });
  }


  sabanaLocation: location = {
    lat: '9.936502',
    lon: '-84.107718',
  };

  casonaSR: location = {
    lat: '10.833929',
    lon: '-85.612340',
  };

  laroca: location = {
    lat: '9.942062',
    lon: '-84.736051',
  };


  myLocation(): void {
    new Promise((resolve, reject) => {

      let result: location = {
        lat: '',
        lon: '',
      };

      navigator.geolocation.getCurrentPosition(
        function (position) {
          result.lat = position.coords.latitude.toString();
          result.lon = position.coords.longitude.toString();
          resolve(result)
        },
        function (error) {
          reject(result)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );

    }).then((e:any) => {
      this.setLocation(e)
    });
  }


  copyLocation(): void {
    let dataCopy: string = `${this.datosCapture.coord.lat}, ${this.datosCapture.coord.lon}`;

    navigator.clipboard
      .writeText(dataCopy)
      .then(() => {
        alert(`${dataCopy} copied to clipboard`);
      })
      .catch((err) => {});
  }


  openMaps(): void {
    let url: string = `https://www.google.com/maps/search/${this.datosCapture.coord.lat},${this.datosCapture.coord.lon}`;
    window.open(url);
  }

  constructor(public RequestService: RequestService) {}
}
