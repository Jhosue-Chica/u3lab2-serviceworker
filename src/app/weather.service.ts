import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '';
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Manta,EC&appid=${this.apiKey}&units=metric&lang=es`;
  private weatherSubject = new BehaviorSubject<any>(null); // Para emitir los datos del clima
  public weather$ = this.weatherSubject.asObservable(); // Observable público para que los componentes se suscriban

  private locations = ['Manta,EC', 'Playas,EC', 'Pedernales,EC', 'Muisne,EC']; // Lista de ubicaciones
  private currentLocationIndex = 0;

  constructor(private http: HttpClient) {
    this.updateWeather();
    setInterval(() => {
      this.changeLocation();
      this.updateWeather();
    }, 3000);
  }

  private changeLocation() {
    this.currentLocationIndex = (this.currentLocationIndex + 1) % this.locations.length;
    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.locations[this.currentLocationIndex]}&appid=${this.apiKey}&units=metric&lang=es`;
  }

  private updateWeather() {
    this.http.get(this.apiUrl).subscribe(
      (data) => this.weatherSubject.next(data), // Emitir los nuevos datos del clima
      (error) => console.error('Error fetching weather data:', error)
    );
  }
}
