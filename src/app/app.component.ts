import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherReportComponent } from './weather-report/weather-report.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherReportComponent, HttpClientModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'u3lab2-serviceworker';

  constructor(public weatherService: WeatherService) {}
}
