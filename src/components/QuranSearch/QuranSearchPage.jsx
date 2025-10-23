import React, { useState } from 'react';
import quranApi from '../../services/quranApi';
import './QuranSearchPage.css';

function QuranSearchPage() {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState('quran-uthmani');

  const editions = [
    { id: 'quran-uthmani', name: 'القرآن الكريم - الرسم العثماني', lang: 'ar' },
    { id: 'quran-simple', name: 'القرآن الكريم - النص المبسط', lang: 'ar' },
    { id: 'en.sahih', name: 'Sahih International', lang: 'en' },
    { id: 'en.pickthall', name: 'Pickthall', lang: 'en' },
    { id: 'en.yusufali', name: 'Yusuf Ali', lang: 'en' },
    { id: 'ar.muyassar', name: 'التفسير الميسر', lang: 'ar' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError('الرجاء إدخال كلمة للبحث');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const result = await quranApi.searchQuran(keyword, selectedEdition);
      setSearchResults(result.matches || []);
      setTotalResults(result.count || 0);
    } catch (err) {
      setError('حدث خطأ أثناء البحث. الرجاء المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getJuzNumber = (ayahNumber) => {
    const juzBoundaries = [1, 149, 258, 385, 516, 641, 750, 854, 958, 1059, 1161, 1236, 1308, 1385, 1473, 1596, 1707, 1804, 1901, 2029, 2140, 2250, 2349, 2446, 2596, 2673, 2791, 2855, 2932, 3159, 6237];
    for (let i = 0; i < juzBoundaries.length - 1; i++) {
      if (ayahNumber >= juzBoundaries[i] && ayahNumber < juzBoundaries[i + 1]) {
        return i + 1;
      }
    }
    return 30;
  };

  return (
    <div className="quran-search-page">
      <div className="container">
        <div className="page-header">
          <h1>🔍 البحث في القرآن الكريم</h1>
          <p className="page-description">
            ابحث عن أي كلمة أو عبارة في آيات القرآن الكريم
          </p>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="ابحث عن كلمة أو عبارة..."
                className="search-input"
              />
              <button type="submit" className="search-button" disabled={loading}>
                {loading ? '⏳ جاري البحث...' : '🔍 بحث'}
              </button>
            </div>

            <div className="edition-selector">
              <label>اختر النسخة:</label>
              <select
                value={selectedEdition}
                onChange={(e) => setSelectedEdition(e.target.value)}
                className="edition-select"
              >
                {editions.map((edition) => (
                  <option key={edition.id} value={edition.id}>
                    {edition.name}
                  </option>
                ))}
              </select>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {totalResults > 0 && (
            <div className="results-count">
              <span className="count-badge">{totalResults}</span>
              <span>نتيجة بحث</span>
            </div>
          )}
        </div>

        <div className="search-results">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>جاري البحث...</p>
            </div>
          )}

          {!loading && searchResults.length === 0 && keyword && (
            <div className="no-results">
              <span className="no-results-icon">📭</span>
              <p>لم يتم العثور على نتائج</p>
              <p className="no-results-hint">جرب البحث بكلمة أخرى أو نسخة مختلفة</p>
            </div>
          )}

          {searchResults.map((result, index) => (
            <div key={index} className="result-card">
              <div className="result-header">
                <h3 className="surah-name">{result.surah.name}</h3>
                <div className="result-meta">
                  <span className="meta-badge">السورة: {result.surah.number}</span>
                  <span className="meta-badge">الجزء: {getJuzNumber(result.number)}</span>
                  <span className="meta-badge">الآية: {result.numberInSurah}</span>
                </div>
              </div>

              <div className="ayah-text quran-text">
                {result.text}
              </div>

              <div className="result-footer">
                <span className="surah-english">{result.surah.englishName}</span>
                <span className="ayah-number">الآية رقم {result.number} في المصحف</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuranSearchPage;
