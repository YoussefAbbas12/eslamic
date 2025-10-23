import React, { useState, useEffect } from 'react';
import adhkarData from '../../data/adhkar.json';
import './TasbihPage.css';

function TasbihPage() {
  const [category, setCategory] = useState('afterPrayer');
  const [selectedDhikr, setSelectedDhikr] = useState(null);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);

  const categories = {
    morning: { name: 'أذكار الصباح', icon: '🌅', color: '#FFB84D' },
    evening: { name: 'أذكار المساء', icon: '🌆', color: '#8B5CF6' },
    afterPrayer: { name: 'أذكار ما بعد الصلاة', icon: '🕌', color: '#2C5F2D' },
    sleep: { name: 'أذكار النوم', icon: '🌙', color: '#4A5568' },
    general: { name: 'أذكار عامة', icon: '📿', color: '#B8860B' }
  };

  useEffect(() => {
    if (adhkarData[category]?.length > 0) {
      setSelectedDhikr(adhkarData[category][0]);
      setTarget(adhkarData[category][0].count);
      setCount(0);
    }
  }, [category]);

  const handleCount = () => {
    if (count < target) {
      setCount(count + 1);
      setIsAnimating(true);
      
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      
      setTimeout(() => setIsAnimating(false), 300);
      
      if (count + 1 === target) {
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100, 50, 100]);
        }
        setTimeout(() => {
          alert('تم إكمال الذكر! بارك الله فيك');
          setCompletedSets(completedSets + 1);
        }, 300);
      }
      
      const savedStats = JSON.parse(localStorage.getItem('userStats') || '{}');
      savedStats.totalTasbihat = (savedStats.totalTasbihat || 0) + 1;
      if (count + 1 === target) {
        savedStats.totalAdhkar = (savedStats.totalAdhkar || 0) + 1;
      }
      localStorage.setItem('userStats', JSON.stringify(savedStats));
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompletedSets(0);
  };

  const handleSelectDhikr = (dhikr) => {
    setSelectedDhikr(dhikr);
    setTarget(dhikr.count);
    setCount(0);
  };

  const progress = (count / target) * 100;
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const generateTickMarks = () => {
    const marks = [];
    const totalMarks = Math.min(target, 33);
    const angleStep = 360 / totalMarks;
    
    for (let i = 0; i < totalMarks; i++) {
      const angle = (i * angleStep - 90) * (Math.PI / 180);
      const innerRadius = 145;
      const outerRadius = count > i ? 155 : 153;
      const x1 = 160 + innerRadius * Math.cos(angle);
      const y1 = 160 + innerRadius * Math.sin(angle);
      const x2 = 160 + outerRadius * Math.cos(angle);
      const y2 = 160 + outerRadius * Math.sin(angle);
      
      marks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={count > i ? categories[category].color : '#e0e0e0'}
          strokeWidth={count > i ? '3' : '2'}
          strokeLinecap="round"
          className="tick-mark"
        />
      );
    }
    return marks;
  };

  return (
    <div className="tasbih-page">
      <div className="container">
        <div className="page-header">
          <h1>📿 التسبيح والأذكار</h1>
          <p className="page-description">
            عداد تفاعلي للأذكار والتسبيح مع أذكار الصباح والمساء
          </p>
        </div>

        <div className="categories-selector">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              className={`category-tab ${category === key ? 'active' : ''}`}
              onClick={() => setCategory(key)}
              style={{ '--category-color': categories[key].color }}
            >
              <span>{categories[key].icon}</span>
              <span>{categories[key].name}</span>
            </button>
          ))}
        </div>

        <div className="tasbih-layout">
          <div className="dhikr-list-sidebar">
            <h3>اختر الذكر:</h3>
            <div className="dhikr-list">
              {adhkarData[category]?.map((dhikr, index) => (
                <button
                  key={index}
                  className={`dhikr-item ${selectedDhikr === dhikr ? 'active' : ''}`}
                  onClick={() => handleSelectDhikr(dhikr)}
                >
                  <div className="dhikr-preview">{dhikr.text.substring(0, 50)}...</div>
                  <div className="dhikr-count-badge">{dhikr.count}×</div>
                </button>
              ))}
            </div>
          </div>

          <div className="tasbih-counter-section">
            {selectedDhikr && (
              <>
                <div className="dhikr-text-display">
                  <p className="dhikr-text">{selectedDhikr.text}</p>
                  {selectedDhikr.benefit && (
                    <div className="dhikr-benefit-display">
                      <strong>الفائدة:</strong> {selectedDhikr.benefit}
                    </div>
                  )}
                </div>

                <div className="counter-display">
                  <div className={`circular-counter ${isAnimating ? 'animate' : ''}`}>
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={categories[category].color} stopOpacity="1" />
                          <stop offset="100%" stopColor={categories[category].color} stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      
                      {generateTickMarks()}
                      
                    <div className="counter-content">
                      <button
                        className="count-button-center"
                        onClick={handleCount}
                        style={{ 
                          background: `linear-gradient(135deg, ${categories[category].color}, ${categories[category].color}dd)`,
                          boxShadow: `0 8px 32px ${categories[category].color}66`
                        }}
                        aria-label={`سبّح - ${count} من ${target}`}
                      >
                        <div className="button-text">سبِّح</div>
                        <div className="count-display">{count}</div>
                        <div className="target-display">من {target}</div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="counter-controls">
                    <button className="control-btn" onClick={handleReset}>
                      🔄 إعادة تعيين
                    </button>
                    <div className="completed-sets">
                      مجموعات مكتملة: <strong>{completedSets}</strong>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasbihPage;
