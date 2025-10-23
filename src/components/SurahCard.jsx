import React from "react";
import { Link } from "react-router-dom";

const SurahCard = ({ surah }) => {
  return (
    <Link to={`/surah/${surah.number}`} className="surah-card">
      <h2>{surah.name}</h2>
      <p>عدد الآيات: {surah.ayahs.length}</p>
      <p>التصنيف: {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}</p>
    </Link>
  );
};

export default SurahCard;
