import React, { useEffect, useState } from "react";
import axios from "axios";
import SurahCard from "./SurahCard";

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.alquran.cloud/v1/quran/ar.alafasy")
      .then((response) => {
        setSurahs(response.data.data.surahs);
      })
      .catch((error) => console.error("خطأ في جلب البيانات:", error));
  }, []);

  return (
    <div className="surah-list">
      {surahs.map((surah) => (
        <SurahCard key={surah.number} surah={surah} />
      ))}
    </div>
  );
};

export default SurahList;