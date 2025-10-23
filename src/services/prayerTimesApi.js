import axios from 'axios';

const ALADHAN_API_BASE = 'https://api.aladhan.com/v1';

class PrayerTimesAPI {
  async getTimingsByCity(city, country, method = 5) {
    try {
      const response = await axios.get(`${ALADHAN_API_BASE}/timingsByCity`, {
        params: {
          city,
          country,
          method
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      throw error;
    }
  }

  async getTimingsByCoordinates(latitude, longitude, method = 5) {
    try {
      const response = await axios.get(`${ALADHAN_API_BASE}/timings`, {
        params: {
          latitude,
          longitude,
          method
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      throw error;
    }
  }

  async getCalendarByCity(city, country, month, year, method = 5) {
    try {
      const response = await axios.get(`${ALADHAN_API_BASE}/calendarByCity`, {
        params: {
          city,
          country,
          month,
          year,
          method
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching calendar:', error);
      throw error;
    }
  }

  async getMethods() {
    try {
      const response = await axios.get(`${ALADHAN_API_BASE}/methods`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching methods:', error);
      throw error;
    }
  }

  async getCurrentPrayerTime(timings) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const prayerTimes = prayers.map(prayer => {
      const [hours, minutes] = timings[prayer].split(':');
      return {
        name: prayer,
        time: parseInt(hours) * 60 + parseInt(minutes),
        displayTime: timings[prayer]
      };
    });

    for (let i = 0; i < prayerTimes.length; i++) {
      if (currentTime < prayerTimes[i].time) {
        return {
          current: i > 0 ? prayerTimes[i - 1] : null,
          next: prayerTimes[i]
        };
      }
    }

    return {
      current: prayerTimes[prayerTimes.length - 1],
      next: prayerTimes[0]
    };
  }
}

export default new PrayerTimesAPI();
