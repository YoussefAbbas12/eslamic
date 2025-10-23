import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="home-page text-center py-5" style={{ backgroundColor: "#0d2d22", color: "white" }}>
    <h1 className="mb-4" style={{ color: "#b99047" }}>مرحبًا بك في موقعنا الإسلامي</h1>
    <p className="mb-5">﴿ وَذَكِّرْ فَإِنَّ الذِّكْرَى تَنفَعُ الْمُؤْمِنِينَ ﴾</p>

    <div className="container">
        <div className="row g-4">
        <div className="col-md-3">
            <Link to="/surahs" className="card bg-dark text-white h-100 border-0" style={{ backgroundColor: "#132f26" }}>
            <div className="card-body">
                <h4 style={{ color: "#b99047" }}>📖 سور القرآن</h4>
            </div>
            </Link>
        </div>
        <div className="col-md-3">
            <Link to="/duas" className="card bg-dark text-white h-100 border-0" style={{ backgroundColor: "#132f26" }}>
            <div className="card-body">
                <h4 style={{ color: "#b99047" }}>🤲 الأدعية</h4>
            </div>
            </Link>
        </div>
        <div className="col-md-3">
            <Link to="/prayer-times" className="card bg-dark text-white h-100 border-0" style={{ backgroundColor: "#132f26" }}>
            <div className="card-body">
                <h4 style={{ color: "#b99047" }}>🕋 مواقيت الصلاة</h4>
            </div>
            </Link>
        </div>
        <div className="col-md-3">
            <Link to="/tasbih" className="card bg-dark text-white h-100 border-0" style={{ backgroundColor: "#132f26" }}>
            <div className="card-body">
                <h4 style={{ color: "#b99047" }}>📿 التسبيح</h4>
            </div>
            </Link>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Hero
