import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { Observable } from 'rxjs';

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
    apiKey: 'b96ba3199b2f0a04e4eaec52229ff2b1',
    lat: '',
    lon: '',
    units: 'metric',
  };

  defineUrlSolicitud():string {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${this.api.lat}&lon=${this.api.lon}&appid=${this.api.apiKey}&lang=en&units=${this.api.units}`;
  }

  getData():Observable<any[]>{
    return this.http.get<any[]>(this.defineUrlSolicitud())
  }

  public setLatitude(value:string):void{
    this.api.lat=value
  }

  public setLongitude(value:string):void{
    this.api.lon=value
  }

  constructor(private http:HttpClient) {}
}
