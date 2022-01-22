import { Component } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather-api';

  instancia:any="";

  datosCapture: any = false;

  defineUrlImagen(): string {
    return `https://openweathermap.org/img/wn/${this.datosCapture.weather[0].icon}.png`;
  }

  setLocation(values: { lat: string; lon: string }) {
    this.RequestService.setLatitude(values.lat);
    this.RequestService.setLongitude(values.lon)

    this.instancia=this.RequestService.getData().subscribe((result) => {
    this.datosCapture = result;});
  }

  sabanaLocation: {
    lat: string;
    lon: string;
  } = {
    lat: '9.936502',
    lon: '-84.107718',
  };

  casonaSR: {
    lat: string;
    lon: string;
  } = {
    lat: '10.833929',
    lon: '-85.612340',
  };

  laroca: {
    lat: string;
    lon: string;
  } = {
    lat: '9.942062',
    lon: '-84.736051',
  };

  myLocation() {
    let result: {
      lat: string;
      lon: string;
    } = {
      lat: '',
      lon: '',
    };
    navigator.geolocation.getCurrentPosition(
      function (position) {
        result.lat = position.coords.latitude.toString();
        result.lon = position.coords.longitude.toString();
      },
      function (error) {},
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    )
    this.setLocation(result)
  }

  copyLocation() {
    let dataCopy: string = `${this.datosCapture.coord.lat}, ${this.datosCapture.coord.lon}`;

    navigator.clipboard
      .writeText(dataCopy)
      .then(() => {
        console.log(dataCopy);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openMaps(){
    let url:string=`https://www.google.com/maps/search/${this.datosCapture.coord.lat},${this.datosCapture.coord.lon}`
    window.open(url);
    console.log(url);
  }

  constructor(public RequestService: RequestService) {}
}
