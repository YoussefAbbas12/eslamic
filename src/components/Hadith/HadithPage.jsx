import React, { useState, useEffect } from 'react';
import hadithsData from '../../data/hadiths.json';
import './HadithPage.css';

function HadithPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedHadith, setExpandedHadith] = useState(null);

  useEffect(() => {
    if (hadithsData.categories.length > 0) {
      setSelectedCategory(hadithsData.categories[0].id);
    }
  }, []);

  const filteredCategories = hadithsData.categories.filter(category =>
    category.name.includes(searchTerm) ||
    category.hadiths.some(hadith =>
      hadith.arabic.includes(searchTerm) ||
      hadith.topic.includes(searchTerm) ||
      hadith.narrator.includes(searchTerm)
    )
  );

  const currentCategory = filteredCategories.find(cat => cat.id === selectedCategory);

  const filteredHadiths = currentCategory?.hadiths.filter(hadith =>
    hadith.arabic.includes(searchTerm) ||
    hadith.topic.includes(searchTerm) ||
    hadith.narrator.includes(searchTerm)
  );

  const handleCopyHadith = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الحديث');
  };

  const handleShareHadith = (text, topic) => {
    if (navigator.share) {
      navigator.share({
        title: topic,
        text: text
      });
    } else {
      handleCopyHadith(text);
    }
  };

  return (
    <div className="hadith-page">
      <div className="container">
        <div className="page-header">
          <h1>📚 الأحاديث النبوية</h1>
          <p className="page-description">
            مجموعة من الأحاديث النبوية الشريفة مصنفة حسب المواضيع
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 ابحث في الأحاديث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="hadith-content-wrapper">
          <div className="categories-sidebar">
            <h3>التصنيفات</h3>
            <div className="categories-list">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  <span className="hadith-count">{category.hadiths.length}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hadiths-content">
            {currentCategory && (
              <>
                <div className="category-header">
                  <span className="category-header-icon">{currentCategory.icon}</span>
                  <h2>{currentCategory.name}</h2>
                  <p className="hadiths-count">
                    {filteredHadiths?.length || 0} حديث
                  </p>
                </div>

                <div className="hadiths-grid">
                  {filteredHadiths?.map((hadith) => (
                    <div key={hadith.id} className="hadith-card">
                      <div className="hadith-card-header">
                        <div className="hadith-topic">
                          <span className="topic-icon">📌</span>
                          <span>{hadith.topic}</span>
                        </div>
                        <button
                          className="expand-btn"
                          onClick={() => setExpandedHadith(expandedHadith === hadith.id ? null : hadith.id)}
                        >
                          {expandedHadith === hadith.id ? '−' : '+'}
                        </button>
                      </div>

                      <div className={`hadith-content ${expandedHadith === hadith.id ? 'expanded' : ''}`}>
                        <p className="hadith-arabic">{hadith.arabic}</p>
                        
                        <div className="hadith-meta">
                          <div className="meta-item">
                            <strong>الراوي:</strong> {hadith.narrator}
                          </div>
                          <div className="meta-item">
                            <strong>المصدر:</strong> {hadith.source}
                          </div>
                        </div>

                        <div className="hadith-actions">
                          <button
                            className="action-btn"
                            onClick={() => handleCopyHadith(hadith.arabic)}
                          >
                            <span>📋</span> نسخ
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => handleShareHadith(hadith.arabic, hadith.topic)}
                          >
                            <span>🔗</span> مشاركة
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredHadiths?.length === 0 && (
                  <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <p>لا توجد أحاديث تطابق بحثك</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HadithPage;
