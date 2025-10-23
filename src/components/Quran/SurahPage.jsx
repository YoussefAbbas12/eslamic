import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import quranApi from '../../services/quranApi';
import './SurahPage.css';

function SurahPage() {
  const { surahNumber } = useParams();
  const [surahData, setsurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAyah, setSelectedAyah] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showTafsirModal, setShowTafsirModal] = useState(false);
  const [currentTafsir, setCurrentTafsir] = useState('');
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSurah, setPlayingSurah] = useState(false);
  const [continueToEnd, setContinueToEnd] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  
  const continueToEndRef = useRef(false);
  const surahDataRef = useRef(null);

  useEffect(() => {
    continueToEndRef.current = continueToEnd;
  }, [continueToEnd]);

  useEffect(() => {
    surahDataRef.current = surahData;
  }, [surahData]);

  useEffect(() => {
    loadSurah();
    // eslint-disable-next-line
  }, [surahNumber]);

  const loadSurah = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await quranApi.getMultipleEditions(surahNumber, ['quran-uthmani', 'ar.alafasy', 'ar.muyassar']);
      setsurahData(data);
      surahDataRef.current = data;
      
      saveLastRead(data[0].number, 1, data[0].name);
    } catch (err) {
      setError('حدث خطأ في تحميل السورة. يرجى المحاولة مرة أخرى.');
      console.error('Error loading surah:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveLastRead = (surahNum, ayahNum, surahName) => {
    const lastRead = {
      surahNumber: surahNum,
      ayahNumber: ayahNum,
      surahName: surahName
    };
    localStorage.setItem('lastReadSurah', JSON.stringify(lastRead));
  };

  const handleAyahClick = (ayah) => {
    setSelectedAyah(ayah);
    setShowActions(true);
    saveLastRead(surahNumber, ayah.numberInSurah, surahData[0].name);
  };

  const stopCurrentAudio = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setAudioPlayer(null);
      setIsPlaying(false);
      setPlayingSurah(false);
      setContinueToEnd(false);
      continueToEndRef.current = false;
    }
  };

  const handlePlayAyah = (audioUrl, index, isAutoPlay = false) => {
    if (!isAutoPlay && audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    
    const audio = new Audio(audioUrl);
    setAudioPlayer(audio);
    setIsPlaying(true);
    setCurrentAyahIndex(index);
    
    audio.play();
    
    audio.onended = () => {
      const shouldContinue = continueToEndRef.current;
      const currentSurahData = surahDataRef.current;
      
      if (shouldContinue && currentSurahData && index < currentSurahData[1].ayahs.length - 1) {
        handlePlayAyah(currentSurahData[1].ayahs[index + 1].audio, index + 1, true);
      } else {
        setIsPlaying(false);
        setAudioPlayer(null);
        setContinueToEnd(false);
        continueToEndRef.current = false;
        setPlayingSurah(false);
      }
    };
  };

  const handlePlayFullSurah = () => {
    if (surahData && surahData[1] && surahData[1].ayahs.length > 0) {
      setPlayingSurah(true);
      setContinueToEnd(true);
      continueToEndRef.current = true;
      handlePlayAyah(surahData[1].ayahs[0].audio, 0);
    }
  };

  const handleShowTafsir = (tafsirText) => {
    setCurrentTafsir(tafsirText);
    setShowTafsirModal(true);
  };

  const handleCopyAyah = (text) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ الآية بنجاح!');
  };

  const handleShareAyah = (text, reference) => {
    if (navigator.share) {
      navigator.share({
        title: reference,
        text: text
      });
    } else {
      handleCopyAyah(`${text}\n\n${reference}`);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري تحميل السورة...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container page-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <h2>{error}</h2>
          <Link to="/quran" className="btn btn-primary">
            العودة لقائمة السور
          </Link>
        </div>
      </div>
    );
  }

  if (!surahData || surahData.length === 0) {
    return (
      <div className="container page-container">
        <div className="error-message">
          <h2>السورة غير موجودة</h2>
          <Link to="/quran" className="btn btn-primary">
            العودة لقائمة السور
          </Link>
        </div>
      </div>
    );
  }

  const textEdition = surahData[0];
  const audioEdition = surahData[1];
  const tafsirEdition = surahData[2];

  return (
    <div className="surah-page">
      <div className="container">
        <div className="surah-header">
          <Link to="/quran" className="back-button">
            <span>← </span>
            العودة لقائمة السور
          </Link>
          
          <div className="surah-info-header">
            <div className="surah-number-badge">{textEdition.number}</div>
            <div>
              <h1>{textEdition.name}</h1>
              <p className="surah-english-name">{textEdition.englishName} - {textEdition.englishNameTranslation}</p>
              <div className="surah-meta-info">
                <span className="meta-badge">
                  {textEdition.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                </span>
                <span className="meta-badge">{textEdition.numberOfAyahs} آية</span>
                <span className="meta-badge">السورة رقم {textEdition.number}</span>
              </div>
            </div>
          </div>
        </div>

        {textEdition.number !== 1 && textEdition.number !== 9 && (
          <div className="bismillah-container">
            <p className="bismillah-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        )}

        <div className="surah-controls">
          {isPlaying ? (
            <button className="play-surah-btn stop-btn" onClick={stopCurrentAudio}>
              ⏸️ إيقاف التشغيل
            </button>
          ) : (
            <button className="play-surah-btn" onClick={handlePlayFullSurah}>
              ▶️ تشغيل السورة كاملة
            </button>
          )}
          {isPlaying && !playingSurah && (
            <div className="continue-checkbox">
              <input
                type="checkbox"
                id="continueToEnd"
                checked={continueToEnd}
                onChange={(e) => {
                  setContinueToEnd(e.target.checked);
                  continueToEndRef.current = e.target.checked;
                }}
              />
              <label htmlFor="continueToEnd">إكمال القراءة حتى نهاية السورة</label>
            </div>
          )}
        </div>

        <div className="ayahs-container">
          {textEdition.ayahs.map((ayah, index) => (
            <div
              key={ayah.number}
              className={`ayah-item ${selectedAyah?.number === ayah.number ? 'selected' : ''} ${currentAyahIndex === index && isPlaying ? 'playing' : ''}`}
              onClick={() => handleAyahClick(ayah)}
            >
              <div className="ayah-content">
                <span className="ayah-text quran-text">{ayah.text}</span>
                <span className="ayah-number-badge">﴿{ayah.numberInSurah}﴾</span>
              </div>
              
              {selectedAyah?.number === ayah.number && showActions && (
                <div className="ayah-actions">
                  {isPlaying && currentAyahIndex === index ? (
                    <button
                      className="action-btn stop-btn-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        stopCurrentAudio();
                      }}
                      title="إيقاف الاستماع"
                    >
                      <span>⏸️</span> إيقاف
                    </button>
                  ) : (
                    <button
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAyah(audioEdition.ayahs[index].audio, index);
                      }}
                      title="استماع للآية"
                    >
                      <span>🔊</span> استماع
                    </button>
                  )}
                  
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowTafsir(tafsirEdition.ayahs[index].text);
                    }}
                    title="عرض التفسير"
                  >
                    <span>📖</span> تفسير
                  </button>
                  
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyAyah(ayah.text);
                    }}
                    title="نسخ الآية"
                  >
                    <span>📋</span> نسخ
                  </button>
                  
                  <button
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareAyah(ayah.text, `سورة ${textEdition.name} - الآية ${ayah.numberInSurah}`);
                    }}
                    title="مشاركة الآية"
                  >
                    <span>🔗</span> مشاركة
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="surah-footer">
          <div className="navigation-buttons">
            {textEdition.number > 1 && (
              <Link
                to={`/quran/${parseInt(textEdition.number) - 1}`}
                className="btn btn-outline"
              >
                ← السورة السابقة
              </Link>
            )}
            {textEdition.number < 114 && (
              <Link
                to={`/quran/${parseInt(textEdition.number) + 1}`}
                className="btn btn-outline"
              >
                السورة التالية →
              </Link>
            )}
          </div>
        </div>

        {showTafsirModal && (
          <div className="tafsir-modal-overlay" onClick={() => setShowTafsirModal(false)}>
            <div className="tafsir-modal" onClick={(e) => e.stopPropagation()}>
              <div className="tafsir-modal-header">
                <h2>📖 التفسير</h2>
                <button 
                  className="close-modal-btn" 
                  onClick={() => setShowTafsirModal(false)}
                >
                  ✕
                </button>
              </div>
              <div className="tafsir-modal-content">
                <p>{currentTafsir}</p>
                <div className="tafsir-source">
                  <small>المصدر: تفسير الميسر</small>
                </div>
              </div>
              <div className="tafsir-modal-footer">
                <button 
                  className="modal-action-btn" 
                  onClick={() => setShowTafsirModal(false)}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SurahPage;
