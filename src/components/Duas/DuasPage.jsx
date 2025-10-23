import React, { useState, useEffect } from 'react';
import duasData from '../../data/duas.json';
import './DuasPage.css';

function DuasPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDua, setExpandedDua] = useState(null);

  useEffect(() => {
    if (duasData.categories.length > 0) {
      setSelectedCategory(duasData.categories[0].id);
    }
  }, []);

  const filteredCategories = duasData.categories.filter(category =>
    category.name.includes(searchTerm) ||
    category.duas.some(dua =>
      dua.title.includes(searchTerm) || dua.arabic.includes(searchTerm)
    )
  );

  const currentCategory = duasData.categories.find(cat => cat.id === selectedCategory);

  const handleCopyDua = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الدعاء بنجاح!');
  };

  const handleShareDua = (text, title) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text
      });
    } else {
      handleCopyDua(`${title}\n\n${text}`);
    }
  };

  return (
    <div className="duas-page">
      <div className="container">
        <div className="page-header">
          <h1>🤲 الأدعية</h1>
          <p className="page-description">
            أدعية لكل المناسبات والأوقات من القرآن والسنة
          </p>
        </div>

        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="ابحث في الأدعية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="duas-layout">
          <div className="categories-sidebar">
            <h3>التصنيفات</h3>
            <div className="categories-list">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.duas.length}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="duas-content">
            {currentCategory && (
              <>
                <div className="category-header">
                  <span className="category-header-icon">{currentCategory.icon}</span>
                  <h2>{currentCategory.name}</h2>
                </div>

                <div className="duas-grid">
                  {currentCategory.duas.map((dua) => (
                    <div key={dua.id} className="dua-card">
                      <div className="dua-card-header">
                        <h3>{dua.title}</h3>
                        <button
                          className="expand-btn"
                          onClick={() => setExpandedDua(expandedDua === dua.id ? null : dua.id)}
                        >
                          {expandedDua === dua.id ? '−' : '+'}
                        </button>
                      </div>

                      <div className={`dua-content ${expandedDua === dua.id ? 'expanded' : ''}`}>
                        <p className="dua-arabic">{dua.arabic}</p>
                        {dua.benefit && (
                          <div className="dua-benefit">
                            <strong>الفائدة:</strong> {dua.benefit}
                          </div>
                        )}

                        <div className="dua-actions">
                          <button
                            className="action-btn"
                            onClick={() => handleCopyDua(dua.arabic)}
                          >
                            <span>📋</span> نسخ
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => handleShareDua(dua.arabic, dua.title)}
                          >
                            <span>🔗</span> مشاركة
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DuasPage;
