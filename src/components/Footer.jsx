import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/* ── Link data — mirrors the HTML design exactly ── */
const QUICK_LINKS = [
  { to: '/',       label: 'الرئيسية' },
  { to: '/today',  label: 'اليوم' },
  { to: '/quran',  label: 'القرآن الكريم' },
  { to: '/hadith', label: 'الأحاديث' },
  { to: '/duas',   label: 'الأدعية' },
];

const EXTRA_SERVICES = [
  { to: '/tasbih',        label: 'التسبيح' },
  { to: '/prayer-times',  label: 'مواقيت الصلاة' },
  { to: '/qibla',         label: 'اتجاه القبلة' },
  { to: '/zakat',         label: 'حساب الزكاة' },
  { to: '/hijri',         label: 'التقويم الهجري' },
];

const CONTACT_LINKS = [
  { href: '#', label: 'عن الموقع' },
  { href: '#', label: 'سياسة الخصوصية' },
  { href: '#', label: 'شروط الاستخدام' },
  { href: '#', label: 'اتصل بنا' },
  { href: '#', label: 'اقتراحات' },
];

function Footer() {
  return (
    <footer className="ft-footer" role="contentinfo">
      <div className="ft-container">

        {/* ── Three-column link grid ── */}
        <div className="ft-grid">

          {/* Column 1 — Quick links */}
          <nav className="ft-col" aria-label="روابط سريعة">
            <h4 className="ft-col-title">روابط سريعة</h4>
            <ul className="ft-list" role="list">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to} role="listitem">
                  <Link to={to} className="ft-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2 — Extra services */}
          <nav className="ft-col" aria-label="خدمات إضافية">
            <h4 className="ft-col-title">خدمات إضافية</h4>
            <ul className="ft-list" role="list">
              {EXTRA_SERVICES.map(({ to, label }) => (
                <li key={to} role="listitem">
                  <Link to={to} className="ft-link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <nav className="ft-col" aria-label="تواصل معنا">
            <h4 className="ft-col-title">تواصل معنا</h4>
            <ul className="ft-list" role="list">
              {CONTACT_LINKS.map(({ href, label }) => (
                <li key={label} role="listitem">
                  <a href={href} className="ft-link">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* ── Copyright bar ── */}
        <div className="ft-bottom" role="separator">
          <p className="ft-copyright">
            <span aria-hidden="true">©</span>{' '}
            {new Date().getFullYear()} جميع الحقوق محفوظة — الموقع الإسلامي
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;