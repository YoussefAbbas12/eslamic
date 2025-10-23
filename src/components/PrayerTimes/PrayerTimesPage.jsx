import React, { useState, useEffect } from 'react';
import prayerTimesApi from '../../services/prayerTimesApi';
import './PrayerTimesPage.css';

function PrayerTimesPage() {
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Cairo');
  const [country, setCountry] = useState('Egypt');
  const [method, setMethod] = useState(4);
  const [currentPrayer, setCurrentPrayer] = useState(null);

  const popularCities = [
    { city: 'Makkah', country: 'Saudi Arabia', arabicName: 'مكة المكرمة' },
    { city: 'Madinah', country: 'Saudi Arabia', arabicName: 'المدينة المنورة' },
    { city: 'Riyadh', country: 'Saudi Arabia', arabicName: 'الرياض' },
    { city: 'Jeddah', country: 'Saudi Arabia', arabicName: 'جدة' },
    { city: 'Cairo', country: 'Egypt', arabicName: 'القاهرة' },
    { city: 'Dubai', country: 'United Arab Emirates', arabicName: 'دبي' },
    { city: 'Kuwait', country: 'Kuwait', arabicName: 'الكويت' },
    { city: 'Doha', country: 'Qatar', arabicName: 'الدوحة' },
    { city: 'Amman', country: 'Jordan', arabicName: 'عمان' },
    { city: 'Damascus', country: 'Syria', arabicName: 'دمشق' },
  ];

  const prayerNames = {
    Fajr: 'الفجر',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء'
  };

  const prayerIcons = {
    Fajr: '🌅',
    Dhuhr: '☀️',
    Asr: '🌤️',
    Maghrib: '🌆',
    Isha: '🌙'
  };

  useEffect(() => {
    loadPrayerTimes();
    // eslint-disable-next-line
  }, [city, country, method]);

  const loadPrayerTimes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await prayerTimesApi.getTimingsByCity(city, country, method);
      setTimings(data.timings);
      
      const current = await prayerTimesApi.getCurrentPrayerTime(data.timings);
      setCurrentPrayer(current);
    } catch (err) {
      setError('حدث خطأ في تحميل مواقيت الصلاة. يرجى المحاولة مرة أخرى.');
      console.error('Error loading prayer times:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity.city);
    setCountry(selectedCity.country);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري تحميل مواقيت الصلاة...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container page-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <h2>{error}</h2>
          <button onClick={loadPrayerTimes} className="btn btn-primary">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="prayer-times-page">
      <div className="container">
        <div className="page-header">
          <h1>🕌 مواقيت الصلاة</h1>
          <p className="page-description">
            مواقيت الصلاة الدقيقة حسب موقعك
          </p>
        </div>

        <div className="city-selector">
          <h3>اختر المدينة:</h3>
          <div className="cities-grid">
            {popularCities.map((cityData, index) => (
              <button
                key={index}
                className={`city-btn ${city === cityData.city ? 'active' : ''}`}
                onClick={() => handleCityChange(cityData)}
              >
                <span className="city-arabic">{cityData.arabicName}</span>
                <span className="city-english">{cityData.city}</span>
              </button>
            ))}
          </div>
        </div>

        {currentPrayer && (
          <div className="current-prayer-card">
            <div className="current-prayer-content">
              <h2>الصلاة القادمة</h2>
              <div className="prayer-display">
                <span className="prayer-icon">{prayerIcons[currentPrayer.next.name]}</span>
                <div className="prayer-info">
                  <h3>{prayerNames[currentPrayer.next.name]}</h3>
                  <p className="prayer-time">{currentPrayer.next.displayTime}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="prayer-times-grid">
          {Object.keys(prayerNames).map((prayerKey) => (
            <div
              key={prayerKey}
              className={`prayer-card ${currentPrayer?.current?.name === prayerKey ? 'current' : ''}`}
            >
              <div className="prayer-icon-large">{prayerIcons[prayerKey]}</div>
              <h3>{prayerNames[prayerKey]}</h3>
              <p className="prayer-time-large">{timings[prayerKey]}</p>
              {currentPrayer?.current?.name === prayerKey && (
                <span className="current-badge">الصلاة الحالية</span>
              )}
            </div>
          ))}
        </div>

        <div className="additional-times">
          <h3>أوقات إضافية</h3>
          <div className="additional-times-grid">
            <div className="time-item">
              <span className="time-label">الشروق</span>
              <span className="time-value">{timings.Sunrise}</span>
            </div>
            <div className="time-item">
              <span className="time-label">منتصف الليل</span>
              <span className="time-value">{timings.Midnight}</span>
            </div>
            <div className="time-item">
              <span className="time-label">الإمساك</span>
              <span className="time-value">{timings.Imsak}</span>
            </div>
          </div>
        </div>

        <div className="location-info">
          <p>📍 المدينة: {city}, {country}</p>
        </div>
      </div>
    </div>
  );
}

export default PrayerTimesPage;
