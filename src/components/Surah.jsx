import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";

function Surah() {
  const { number } = useParams(); // استخراج رقم السورة من الـ URL
  const [surahs, setSurahs] = useState([]);
  const [oneSurah, setOneSurah] = useState(null);
  const [currentAyah, setCurrentAyah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const audioPlayer = useRef(new Audio()); // استخدام useRef هنا بدلاً من useState
  const API = "https://api.alquran.cloud/v1/quran/ar.alafasy";

  // جلب جميع السور عند تحميل الصفحة
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setSurahs(data.data.surahs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("خطأ في جلب البيانات:", error);
        setLoading(false);
      });
  }, []);

  // تحديث السورة المختارة عند تغيير `surahs` أو `number`
  useEffect(() => {
    if (surahs.length > 0) {
      const selectedSurah = surahs.find((surah) => surah.number === parseInt(number));
      setOneSurah(selectedSurah || null);
      if (selectedSurah && selectedSurah.ayahs.length > 0) {
        setCurrentPage(selectedSurah.ayahs[0].page);
      }
    }
  }, [surahs, number]);

  // تشغيل الصوت والانتقال تلقائيًا للآية التالية
  const playAyah = (ayah) => {
    if (!ayah.audio) return; // تأكد من أن الآية تحتوي على رابط الصوت

    audioPlayer.current.pause();
    audioPlayer.current.src = ayah.audio;
    audioPlayer.current.play();
    setCurrentAyah(ayah.number);
    setIsPlaying(true);

    audioPlayer.current.onended = () => {
      const nextAyah = oneSurah?.ayahs.find(a => a.numberInSurah === ayah.numberInSurah + 1);
      if (nextAyah) {
        playAyah(nextAyah);
      } else {
        setCurrentAyah(null);
        setIsPlaying(false);
      }
    };
  };

  // إيقاف الصوت عند الضغط على الزر
  const stopAudio = () => {
    audioPlayer.current.pause();
    setCurrentAyah(null);
    setIsPlaying(false);
  };

  // **تقسيم الآيات حسب الصفحة باستخدام useMemo لتحسين الأداء**
  const groupedAyahs = useMemo(() => {
    return oneSurah
      ? oneSurah.ayahs.reduce((acc, ayah) => {
          acc[ayah.page] = acc[ayah.page] || [];
          acc[ayah.page].push(ayah);
          return acc;
        }, {})
      : {};
  }, [oneSurah]);

  return (
    <div className="container">
      <header>
        <div className="page-info">📖 صفحة {currentPage}</div>
      </header>
      <main style={{width: '50%',margin: 'auto'}}>
        {loading ? (
          <p>جاري تحميل البيانات...</p>
        ) : oneSurah ? (
          <>
            <h2 className="surah-title">{oneSurah.name}</h2>
            <p className="bismillah">﷽</p>

            {Object.keys(groupedAyahs).map((pageNumber) => (
              <div key={pageNumber} className="page-section">
                <br />
                <h5 className="page-title">📄 {pageNumber}</h5>
                {groupedAyahs[pageNumber].map((ayah) => (
                  <p
                    key={ayah.number}
                    className={`ayah ${currentAyah === ayah.number ? "active" : ""}`}
                    onClick={() => playAyah(ayah)}
                  >
                    {ayah.text} ﴿{ayah.numberInSurah}﴾
                  </p>
                ))}
              </div>
            ))}
          </>
        ) : (
          <p>لا توجد بيانات لهذه السورة</p>
        )}

        {isPlaying && (
          <button className="stop-audio-btn" onClick={stopAudio}>
            ⏸ إيقاف الصوت
          </button>
        )}
      </main>
    </div>
  );
}

export default Surah;
