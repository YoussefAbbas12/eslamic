import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navigation/Navbar';
import HomePage from './components/Home/HomePage';
import TodayPage from './components/Today/TodayPage';
import QuranList from './components/Quran/QuranList';
import SurahPage from './components/Quran/SurahPage';
import QuranSearchPage from './components/QuranSearch/QuranSearchPage';
import HadithPage from './components/Hadith/HadithPage';
import DuasPage from './components/Duas/DuasPage';
import PrayerTimesPage from './components/PrayerTimes/PrayerTimesPage';
import TasbihPage from './components/Tasbih/TasbihPage';
import AllahNamesPage from './components/AllahNames/AllahNamesPage';
import IslamicQuizPage from './components/Quiz/IslamicQuizPage';
import KhatmahPage from './components/Khatmah/KhatmahPage';
import UserStatsPage from './components/Stats/UserStatsPage';
import IslamicRulingsPage from './components/IslamicRulings/IslamicRulingsPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/quran" element={<QuranList />} />
            <Route path="/quran/:surahNumber" element={<SurahPage />} />
            <Route path="/quran-search" element={<QuranSearchPage />} />
            <Route path="/hadith" element={<HadithPage />} />
            <Route path="/duas" element={<DuasPage />} />
            <Route path="/prayer-times" element={<PrayerTimesPage />} />
            <Route path="/tasbih" element={<TasbihPage />} />
            <Route path="/allah-names" element={<AllahNamesPage />} />
            <Route path="/islamic-rulings" element={<IslamicRulingsPage />} />
            <Route path="/quiz" element={<IslamicQuizPage />} />
            <Route path="/khatmah" element={<KhatmahPage />} />
            <Route path="/stats" element={<UserStatsPage />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
