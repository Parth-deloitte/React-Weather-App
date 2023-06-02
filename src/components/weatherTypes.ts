export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  name: string;
  weather: Weather[];
  main: { temp: number; humidity: number; pressure: number };
  sys: {
    sunrise: number;
    sunset: number;
  };

  timezone: number;
  rain: {
    "1h": number;
  };
  // Add other properties you need from the weather API response
}
