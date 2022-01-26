import { Injectable } from '@angular/core';
import {Weather} from "./resultInterface"
@Injectable({
  providedIn: 'root'
})

export class RequestService {

  public api: {
    apiKey: string;
    lat: string;
    lon: string;
    units: string;
  } = {
    apiKey: 'Yjk2YmEzMTk5YjJmMGEwNGU0ZWFlYzUyMjI5ZmYyYjE=',
    lat: '',
    lon: '',
    units: 'metric',
  };

  defineUrlSolicitud():string {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${this.api.lat}&lon=${this.api.lon}&appid=${atob(this.api.apiKey)}&lang=en&units=${this.api.units}`;
  }

  getData():Promise<Weather>{
    let promise:Promise<Weather>=new Promise((resolve,reject)=>{

      fetch(this.defineUrlSolicitud())
      .then((e:any)=>{
        return e.json()
      })
      .then((e)=>{
        resolve(e)
      })
      .catch((e:any)=>{
        reject("{}")
      })

    })
    return promise
  }

  public setLatitude(value:string):void{
    this.api.lat=value
  }

  public setLongitude(value:string):void{
    this.api.lon=value
  }

  constructor() {}
}
