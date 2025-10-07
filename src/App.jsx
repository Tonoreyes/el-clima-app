import { useState, useEffect } from 'react';
import { getWeather } from './services/weather';
import './styles/app.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // 🔄 Cargar clima automáticamente al iniciar
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity') || 'Mexico City';
    getWeather(lastCity)
      .then(data => {
        setWeather(data);
        setCity(lastCity);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const handleSearch = async () => {
    try {
      const data = await getWeather(city);
      setWeather(data);
      setError('');
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="container">

      <h1>🌤️El Clima</h1>

      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Escribe una ciudad"
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{weather.name}</h2>
          <p>🌡️ Temperatura: {weather.main.temp}°C</p>
          <p>💧 Humedad: {weather.main.humidity}%</p>
          <p>🌬️ Viento: {weather.wind.speed} m/s</p>
          <p>☁️ Clima: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;


