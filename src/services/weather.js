const API_KEY = '64889c6bf14ca9d330ebd53c312a4c01';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(city) 
{
  const res = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error('Ciudad no encontrada');
  return res.json();
}

