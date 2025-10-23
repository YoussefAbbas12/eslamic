import React from 'react';
import { Routes, Route } from "react-router-dom";
import SurahList from "./SurahList";
import Surah from "./Surah";

function MainSurah() {
  return (
    <div className="app">
      <h1>سور القرآن الكريم</h1>
      <Routes>
        <Route path="/" element={<SurahList />} />            {/* /surah */}
        <Route path=":number" element={<Surah />} />          {/* /surah/1 */}
      </Routes>
    </div>
  );
}

export default MainSurah;
