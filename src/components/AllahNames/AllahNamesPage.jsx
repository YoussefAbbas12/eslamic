import React, { useState } from 'react';
import allahNamesData from '../../data/allah-names.json';
import './AllahNamesPage.css';

function AllahNamesPage() {
  const [selectedName, setSelectedName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNames = allahNamesData.names.filter(name =>
    name.arabic.includes(searchTerm) ||
    name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.meaning.includes(searchTerm) ||
    name.explanation.includes(searchTerm)
  );

  const handleNameClick = (name) => {
    setSelectedName(selectedName?.id === name.id ? null : name);
  };

  return (
    <div className="allah-names-page">
      <div className="container">
        <div className="page-header">
          <h1>✨ أسماء الله الحسنى</h1>
          <p className="page-description">
            تعرف على أسماء الله الحسنى ومعانيها وتفسيرها
          </p>
          <p className="hadith-quote">
            "إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا، مِئَةً إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ"
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 ابحث في أسماء الله الحسنى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="names-count">
          <p>عدد الأسماء: {filteredNames.length} من 99</p>
        </div>

        <div className="names-grid">
          {filteredNames.map((name) => (
            <div
              key={name.id}
              className={`name-card ${selectedName?.id === name.id ? 'active' : ''}`}
              onClick={() => handleNameClick(name)}
            >
              <div className="name-header">
                <div className="name-number">{name.id}</div>
                <div className="name-arabic">{name.arabic}</div>
              </div>
              <div className="name-transliteration">{name.transliteration}</div>
              
              {selectedName?.id === name.id && (
                <div className="name-details">
                  <div className="name-meaning">
                    <strong>المعنى:</strong>
                    <p>{name.meaning}</p>
                  </div>
                  <div className="name-explanation">
                    <strong>التفسير:</strong>
                    <p>{name.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredNames.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>لا توجد نتائج تطابق بحثك</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllahNamesPage;
