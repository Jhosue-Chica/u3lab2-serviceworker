import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-report',
  standalone: true,
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css'],
  imports: [CommonModule]
})
export class WeatherReportComponent implements OnInit, OnDestroy {
  
  weatherData: any;
  private weatherSubscription!: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherSubscription = this.weatherService.weather$.subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.weatherSubscription.unsubscribe(); 
  }

  // Método para obtener la URL del icono del clima
  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
