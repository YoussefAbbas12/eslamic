import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quranApi from '../../services/quranApi';
import './QuranList.css';

function QuranList() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    loadSurahs();
    const saved = localStorage.getItem('lastReadSurah');
    if (saved) {
      setLastRead(JSON.parse(saved));
    }
  }, []);

  const loadSurahs = async () => {
    try {
      const data = await quranApi.getSurahList();
      setSurahs(data);
    } catch (error) {
      console.error('Error loading surahs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.number.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري تحميل السور...</p>
      </div>
    );
  }

  return (
    <div className="quran-list-page">
      <div className="container">
        <div className="page-header">
          <h1>📖 القرآن الكريم</h1>
          <p className="page-description">
            اقرأ واستمع إلى القرآن الكريم كاملاً مع التفسير
          </p>
        </div>

        {lastRead && (
          <div className="last-read-card fade-in">
            <div className="last-read-icon">🔖</div>
            <div className="last-read-content">
              <h3>آخر موضع قراءة</h3>
              <p>{lastRead.surahName} - الآية {lastRead.ayahNumber}</p>
            </div>
            <Link to={`/quran/${lastRead.surahNumber}`} className="btn btn-primary">
              متابعة القراءة
            </Link>
          </div>
        )}

        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="ابحث عن سورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="surahs-grid">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              to={`/quran/${surah.number}`}
              className="surah-card"
            >
              <div className="surah-number">
                <span>{surah.number}</span>
              </div>
              <div className="surah-info">
                <h3 className="surah-arabic-name">{surah.name}</h3>
                <p className="surah-english-name">{surah.englishName}</p>
                <div className="surah-meta">
                  <span className="surah-type">
                    {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                  </span>
                  <span className="surah-ayahs">{surah.numberOfAyahs} آية</span>
                </div>
              </div>
              <div className="surah-icon">
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="no-results">
            <p>لا توجد نتائج للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuranList;
