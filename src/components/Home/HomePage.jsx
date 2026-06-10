import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('homeTheme') || 'green');

  useEffect(() => {
    try {
      localStorage.setItem('homeTheme', theme);
    } catch (e) {}
  }, [theme]);

  const features = [
    {
      id: 1,
      title: 'القرآن الكريم',
      icon: '📖',
      description: 'قراءة واستماع القرآن الكريم كاملاً مع التفسير',
      path: '/quran',
      gradient: 'linear-gradient(135deg, #2C5F2D 0%, #97BC62FF 100%)'
    },
    {
      id: 2,
      title: 'الأحاديث النبوية',
      icon: '📚',
      description: 'مكتبة شاملة للأحاديث الصحيحة مع البحث والفلترة',
      path: '/hadith',
      gradient: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)'
    },
    {
      id: 3,
      title: 'الأدعية',
      icon: '🤲',
      description: 'أدعية لكل المناسبات والمواقف اليومية',
      path: '/duas',
      gradient: 'linear-gradient(135deg, #4A8F4C 0%, #6BAA6D 100%)'
    },
    {
      id: 4,
      title: 'مواقيت الصلاة',
      icon: '🕌',
      description: 'أوقات الصلاة حسب موقعك مع التنبيهات',
      path: '/prayer-times',
      gradient: 'linear-gradient(135deg, #2C5F2D 0%, #4A8F4C 100%)'
    },
    {
      id: 5,
      title: 'التسبيح والأذكار',
      icon: '📿',
      description: 'سبحة إلكترونية مع أذكار الصباح والمساء',
      path: '/tasbih',
      gradient: 'linear-gradient(135deg, #D4AF37 0%, #E6C966 100%)'
    },
    {
      id: 6,
      title: 'الختمة الجماعية',
      icon: '🎯',
      description: 'أنشئ ختمة جماعية وشاركها مع الآخرين',
      path: '/khatmah',
      gradient: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)'
    }
  ];

  const themeOptions = [
    { id: 'green', label: 'Green & Blue (Calm & Spiritual)' },
    { id: 'red', label: 'Red + White + Gold (Warm & Powerful)' },
    { id: 'earth', label: 'Earth Tones (Beige + Brown)' },
    { id: 'lux', label: 'Black + Gold + White (Luxury)' },
    { id: 'pastel', label: 'Soft Pastel (Kids & Learning)' },
    { id: 'orange', label: 'Orange + Cream + Dark Gray (Modern)' }
  ];

  return (
    <div className={`homepage theme-${theme}`}>
      <section className="hero-section">
        <div className="theme-selector">
          <select value={theme} onChange={(e) => setTheme(e.target.value)} aria-label="Select theme">
            {themeOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="hero-content">
          <div className="hero-decoration">
            <span className="decoration-icon">☪️</span>
          </div>
          <h1 className="hero-title fade-in">
            بسم الله الرحمن الرحيم
          </h1>
          <p className="hero-subtitle fade-in">
            ﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ ﴾
          </p>
          <p className="hero-description fade-in">
            موقعك الشامل للقرآن الكريم والأحاديث والأدعية وكل ما يحتاجه المسلم في حياته اليومية
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>ميزات الموقع</h2>
            <div className="header-divider"></div>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link 
                to={feature.path} 
                key={feature.id}
                className="feature-card"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div
                  className="feature-card-bg"
                  style={{ background: `linear-gradient(135deg, var(--primary-main) 0%, var(--secondary-main) 100%)` }}
                ></div>
                <div className="feature-content">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-arrow">
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="quran-verse-section">
        <div className="container">
          <div className="verse-card">
            <div className="verse-decoration">
              <span>✦</span>
            </div>
            <p className="quran-text">
              ﴿ إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَأَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ لَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ ﴾
            </p>
            <p className="verse-reference">سورة البقرة - آية 277</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">114</div>
              <div className="stat-label">سورة قرآنية</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6236</div>
              <div className="stat-label">آية كريمة</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">حديث نبوي</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">دعاء</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
