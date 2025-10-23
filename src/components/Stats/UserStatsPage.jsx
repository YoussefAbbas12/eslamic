import React, { useState, useEffect } from 'react';
import './UserStatsPage.css';

function UserStatsPage() {
  const [stats, setStats] = useState({
    totalTasbihat: 0,
    totalAdhkar: 0,
    juzRead: 0,
    savedDuas: 0,
    quizScores: [],
    dailyStreak: 0,
    lastVisit: null
  });

  useEffect(() => {
    const storedStats = localStorage.getItem('userStats');
    if (storedStats) {
      setStats(JSON.parse(storedStats));
    } else {
      const initialStats = {
        totalTasbihat: 0,
        totalAdhkar: 0,
        juzRead: 0,
        savedDuas: 0,
        quizScores: [],
        dailyStreak: 0,
        lastVisit: new Date().toISOString()
      };
      setStats(initialStats);
      localStorage.setItem('userStats', JSON.stringify(initialStats));
    }
  }, []);

  const resetStats = () => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين جميع الإحصائيات؟')) {
      const resetData = {
        totalTasbihat: 0,
        totalAdhkar: 0,
        juzRead: 0,
        savedDuas: 0,
        quizScores: [],
        dailyStreak: 0,
        lastVisit: new Date().toISOString()
      };
      setStats(resetData);
      localStorage.setItem('userStats', JSON.stringify(resetData));
    }
  };

  const getAverageQuizScore = () => {
    if (stats.quizScores.length === 0) return 0;
    const sum = stats.quizScores.reduce((a, b) => a + b, 0);
    return Math.round(sum / stats.quizScores.length);
  };

  const getLevel = () => {
    const points = stats.totalTasbihat + stats.totalAdhkar * 5 + stats.juzRead * 50;
    if (points >= 5000) return { name: 'ماسي', color: '#E91E63', icon: '💎' };
    if (points >= 2000) return { name: 'ذهبي', color: '#FFD700', icon: '🏆' };
    if (points >= 1000) return { name: 'فضي', color: '#C0C0C0', icon: '🥈' };
    return { name: 'برونزي', color: '#CD7F32', icon: '🥉' };
  };

  const level = getLevel();

  return (
    <div className="stats-page">
      <div className="container">
        <div className="page-header">
          <h1>📊 إحصائياتي</h1>
          <p className="page-description">
            تتبع تقدمك ونشاطك في الموقع
          </p>
        </div>

        <div className="level-card">
          <div className="level-icon">{level.icon}</div>
          <h2 style={{ color: level.color }}>المستوى: {level.name}</h2>
          <p>استمر في العمل الصالح للوصول إلى مستويات أعلى!</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card tasbihat-card">
            <div className="stat-icon">📿</div>
            <div className="stat-content">
              <h3>التسبيحات</h3>
              <p className="stat-number">{stats.totalTasbihat.toLocaleString()}</p>
              <p className="stat-label">تسبيحة</p>
            </div>
          </div>

          <div className="stat-card adhkar-card">
            <div className="stat-icon">🌙</div>
            <div className="stat-content">
              <h3>الأذكار المكتملة</h3>
              <p className="stat-number">{stats.totalAdhkar}</p>
              <p className="stat-label">ذكر</p>
            </div>
          </div>

          <div className="stat-card quran-card">
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <h3>أجزاء القرآن</h3>
              <p className="stat-number">{stats.juzRead}</p>
              <p className="stat-label">جزء مقروء</p>
            </div>
          </div>

          <div className="stat-card duas-card">
            <div className="stat-icon">🤲</div>
            <div className="stat-content">
              <h3>الأدعية المحفوظة</h3>
              <p className="stat-number">{stats.savedDuas}</p>
              <p className="stat-label">دعاء</p>
            </div>
          </div>

          <div className="stat-card quiz-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>متوسط الاختبارات</h3>
              <p className="stat-number">{getAverageQuizScore()}%</p>
              <p className="stat-label">من {stats.quizScores.length} اختبار</p>
            </div>
          </div>

          <div className="stat-card streak-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <h3>سلسلة الأيام</h3>
              <p className="stat-number">{stats.dailyStreak}</p>
              <p className="stat-label">يوم متتالي</p>
            </div>
          </div>
        </div>

        {stats.quizScores.length > 0 && (
          <div className="quiz-history">
            <h3>📈 تاريخ الاختبارات</h3>
            <div className="quiz-scores">
              {stats.quizScores.map((score, index) => (
                <div key={index} className="quiz-score-item">
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ 
                        width: `${score}%`,
                        background: score >= 80 ? '#4CAF50' : score >= 60 ? '#FF9800' : '#F44336'
                      }}
                    ></div>
                  </div>
                  <span className="score-text">{score}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="achievements-section">
          <h3>🏅 الإنجازات</h3>
          <div className="achievements-grid">
            <div className={`achievement ${stats.totalTasbihat >= 1000 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">🌟</span>
              <p>ألف تسبيحة</p>
            </div>
            <div className={`achievement ${stats.juzRead >= 10 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">📚</span>
              <p>قارئ متمكن</p>
            </div>
            <div className={`achievement ${stats.dailyStreak >= 7 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">💪</span>
              <p>أسبوع متواصل</p>
            </div>
            <div className={`achievement ${getAverageQuizScore() >= 85 ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">🎓</span>
              <p>عالم بالدين</p>
            </div>
          </div>
        </div>

        <button className="reset-btn" onClick={resetStats}>
          🔄 إعادة تعيين الإحصائيات
        </button>
      </div>
    </div>
  );
}

export default UserStatsPage;
