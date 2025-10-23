import axios from 'axios';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

class QuranAPI {
  async getSurahList() {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/surah`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching surah list:', error);
      throw error;
    }
  }

  async getSurah(number, edition = 'ar.alafasy') {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/surah/${number}/${edition}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching surah:', error);
      throw error;
    }
  }

  async getMultipleEditions(surahNumber, editions = ['quran-uthmani', 'ar.alafasy', 'ar.muyassar']) {
    try {
      const editionsStr = editions.join(',');
      const response = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}/editions/${editionsStr}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching multiple editions:', error);
      throw error;
    }
  }

  async getAyah(reference, edition = 'ar.alafasy') {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/ayah/${reference}/${edition}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching ayah:', error);
      throw error;
    }
  }

  async getTafsir(surahNumber) {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}/ar.muyassar`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tafsir:', error);
      throw error;
    }
  }

  async getAudioEditions() {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/edition?format=audio&language=ar`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching audio editions:', error);
      throw error;
    }
  }

  async getJuz(number, edition = 'quran-uthmani') {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/juz/${number}/${edition}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching juz:', error);
      throw error;
    }
  }

  async searchQuran(keyword, edition = 'quran-uthmani') {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/search/${encodeURIComponent(keyword)}/${edition}`);
      return response.data.data;
    } catch (error) {
      console.error('Error searching Quran:', error);
      throw error;
    }
  }

  async getAllTafsirEditions() {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/edition/type/tafsir`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tafsir editions:', error);
      return [
        { identifier: 'ar.muyassar', name: 'التفسير الميسر', language: 'ar', type: 'tafsir' },
        { identifier: 'ar.jalalayn', name: 'تفسير الجلالين', language: 'ar', type: 'tafsir' },
        { identifier: 'ar.baghawi', name: 'تفسير البغوي', language: 'ar', type: 'tafsir' },
        { identifier: 'ar.qurtubi', name: 'تفسير القرطبي', language: 'ar', type: 'tafsir' },
        { identifier: 'ar.tabari', name: 'تفسير الطبري', language: 'ar', type: 'tafsir' }
      ];
    }
  }

  async getTafsirForSurah(surahNumber, tafsirEdition = 'ar.muyassar') {
    try {
      const response = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}/${tafsirEdition}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tafsir for surah:', error);
      throw error;
    }
  }
}

export default new QuranAPI();
