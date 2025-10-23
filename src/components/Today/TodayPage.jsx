import React, { useState, useEffect } from 'react';
import adhkarData from '../../data/adhkar.json';
import duasData from '../../data/duas.json';
import hadithsData from '../../data/hadiths.json';
import './TodayPage.css';

function TodayPage() {
  const [todayContent, setTodayContent] = useState({
    dhikr: null,
    dua: null,
    hadith: null,
    ayah: null
  });

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    const morningAdhkar = adhkarData.morning || [];
    const allDuas = duasData.categories.flatMap(cat => cat.duas);
    const allHadiths = hadithsData.categories.flatMap(cat => cat.hadiths);
    
    const verses = [
      { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", surah: "الشرح", ayah: 5 },
      { arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", translation: "إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ", surah: "يوسف", ayah: 87 },
      { arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ", translation: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", surah: "البقرة", ayah: 152 },
      { arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا", translation: "وَقُل رَّبِّ زِدْنِي عِلْمًا", surah: "طه", ayah: 114 },
      { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", translation: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", surah: "البقرة", ayah: 201 },
      { arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ", translation: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ", surah: "هود", ayah: 88 }
    ];

    setTodayContent({
      dhikr: morningAdhkar[dayOfYear % morningAdhkar.length] || morningAdhkar[0],
      dua: allDuas[dayOfYear % allDuas.length],
      hadith: allHadiths[dayOfYear % allHadiths.length],
      ayah: verses[dayOfYear % verses.length]
    });
  }, []);

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('ar-EG', options);
  };

  return (
    <div className="today-page">
      <div className="container">
        <div className="page-header">
          <h1>📅 اليوم</h1>
          <p className="page-description">{getFormattedDate()}</p>
          <p className="page-subtitle">
            ابدأ يومك بذكر الله والاطلاع على آية وحديث ودعاء اليوم
          </p>
        </div>

        <div className="today-content-grid">
          {todayContent.ayah && (
            <div className="today-card ayah-card">
              <div className="card-header">
                <span className="card-icon">📖</span>
                <h2>آية اليوم</h2>
              </div>
              <div className="card-content">
                <p className="arabic-text large">{todayContent.ayah.arabic}</p>
                <div className="card-meta">
                  <span>سورة {todayContent.ayah.surah}</span>
                  <span>•</span>
                  <span>الآية {todayContent.ayah.ayah}</span>
                </div>
              </div>
            </div>
          )}

          {todayContent.hadith && (
            <div className="today-card hadith-card">
              <div className="card-header">
                <span className="card-icon">📚</span>
                <h2>حديث اليوم</h2>
              </div>
              <div className="card-content">
                <p className="arabic-text">{todayContent.hadith.arabic}</p>
                <div className="card-meta">
                  <span>رواه: {todayContent.hadith.narrator}</span>
                  <span>•</span>
                  <span>{todayContent.hadith.source}</span>
                </div>
              </div>
            </div>
          )}

          {todayContent.dhikr && (
            <div className="today-card dhikr-card">
              <div className="card-header">
                <span className="card-icon">📿</span>
                <h2>ذكر اليوم</h2>
              </div>
              <div className="card-content">
                <p className="arabic-text">{todayContent.dhikr.text}</p>
                {todayContent.dhikr.benefit && (
                  <div className="card-benefit">
                    <strong>الفائدة:</strong>
                    <p>{todayContent.dhikr.benefit}</p>
                  </div>
                )}
                <div className="card-meta">
                  <span>عدد المرات: {todayContent.dhikr.count}</span>
                </div>
              </div>
            </div>
          )}

          {todayContent.dua && (
            <div className="today-card dua-card">
              <div className="card-header">
                <span className="card-icon">🤲</span>
                <h2>دعاء اليوم</h2>
              </div>
              <div className="card-content">
                <h3 className="dua-title">{todayContent.dua.title}</h3>
                <p className="arabic-text">{todayContent.dua.arabic}</p>
                {todayContent.dua.benefit && (
                  <div className="card-benefit">
                    <strong>الفائدة:</strong>
                    <p>{todayContent.dua.benefit}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="refresh-note">
          <p>💡 يتم تحديث المحتوى يومياً تلقائياً</p>
        </div>
      </div>
    </div>
  );
}

export default TodayPage;
