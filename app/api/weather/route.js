import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenWeather API key not configured' }, { status: 500 });
  }

  try {
    // Current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`
    );

    if (!currentResponse.ok) {
      throw new Error('Weather data not found for this city');
    }

    const currentData = await currentResponse.json();

    // Forecast (5 days)
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&units=metric&appid=${apiKey}`
    );

    let forecastData = null;
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json();
    }

    const weatherData = {
      current: {
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        main: currentData.weather[0].main
      },
      forecast: forecastData ? forecastData.list.slice(0, 5).map(item => ({
        dt: item.dt,
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon
      })) : []
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch weather data. Please check the city name and try again.' 
    }, { status: 500 });
  }
}