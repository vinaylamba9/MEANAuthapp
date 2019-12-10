import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events_url = "http://localhost:3000/api/events";
  specialEvents_url = "http://localhost:3000/api/special";
  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<any>(this.events_url);
  }

  getSpecialEvents(){
    return this.http.get<any>(this.specialEvents_url);
  }
}
