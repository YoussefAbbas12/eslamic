import React, { useState, useEffect, useMemo, useCallback } from 'react';
import hadithsData from '../../data/hadiths.json';
import './HadithPage.css';

// ─── Sub-components ──────────────────────────────────────────────────────────

/**
 * Decorative gold divider used between hadith items.
 */
const HadithDivider = React.memo(() => (
  <div className="hp-divider" aria-hidden="true">
    <span className="hp-divider-ornament">❧</span>
  </div>
));
HadithDivider.displayName = 'HadithDivider';

/**
 * Single hadith card with expand/collapse toggle, copy and share actions.
 */
const HadithCard = React.memo(({ hadith, isExpanded, onToggle, onCopy, onShare }) => {
  const cardId = `hadith-card-${hadith.id}`;
  const contentId = `hadith-content-${hadith.id}`;

  return (
    <article
      id={cardId}
      className="hp-hadith-card"
      aria-label={`حديث: ${hadith.topic}`}
    >
      {/* Card Header */}
      <div className="hp-card-header">
        {/* Expand / Collapse toggle — positioned on the start side (left in RTL) */}
        <button
          className="hp-expand-btn"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-label={isExpanded ? `طي حديث ${hadith.topic}` : `توسيع حديث ${hadith.topic}`}
        >
          <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
        </button>

        {/* Topic badge — positioned on the end side (right in RTL) */}
        <div className="hp-topic-badge">
          <span aria-hidden="true">⭐</span>
          <h3 className="hp-topic-name">{hadith.topic}</h3>
        </div>
      </div>

      {/* Collapsible content */}
      <div
        id={contentId}
        className={`hp-card-body ${isExpanded ? 'hp-card-body--expanded' : ''}`}
        role="region"
        aria-label={`نص حديث ${hadith.topic}`}
      >
        {/* Arabic hadith text */}
        <p className="hp-arabic-text">{hadith.arabic}</p>

        <HadithDivider />

        {/* Narrator & Source metadata */}
        <div className="hp-meta-block">
          <span className="hp-meta-item">
            <strong className="hp-meta-label">الراوي:</strong>
            <span>{hadith.narrator}</span>
          </span>
          <span className="hp-meta-separator" aria-hidden="true">•</span>
          <span className="hp-meta-item">
            <strong className="hp-meta-label">المصدر:</strong>
            <span>{hadith.source}</span>
          </span>
        </div>

        {/* Action buttons */}
        <div className="hp-actions" role="group" aria-label="إجراءات الحديث">
          <button
            className="hp-action-btn"
            onClick={onCopy}
            aria-label={`نسخ حديث: ${hadith.topic}`}
          >
            <span aria-hidden="true">📋</span>
            <span>نسخ</span>
          </button>
          <button
            className="hp-action-btn"
            onClick={onShare}
            aria-label={`مشاركة حديث: ${hadith.topic}`}
          >
            <span aria-hidden="true">🔗</span>
            <span>مشاركة</span>
          </button>
        </div>
      </div>
    </article>
  );
});
HadithCard.displayName = 'HadithCard';

/**
 * Single category button in the sidebar.
 */
const CategoryButton = React.memo(({ category, isActive, onClick }) => (
  <button
    className={`hp-category-btn ${isActive ? 'hp-category-btn--active' : ''}`}
    onClick={onClick}
    aria-pressed={isActive}
    aria-label={`${category.name} — ${category.hadiths.length} حديث`}
  >
    {/* Count badge */}
    <span className={`hp-category-count ${isActive ? 'hp-category-count--active' : ''}`}>
      {category.hadiths.length}
    </span>

    {/* Name + Icon */}
    <div className="hp-category-info">
      <span className="hp-category-name">{category.name}</span>
      <span className="hp-category-icon" aria-hidden="true">{category.icon}</span>
    </div>
  </button>
));
CategoryButton.displayName = 'CategoryButton';

// ─── Main Page Component ──────────────────────────────────────────────────────

function HadithPage() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm]             = useState('');
  const [expandedHadith, setExpandedHadith]     = useState(null);
  const [copyFeedback, setCopyFeedback]         = useState(null); // hadith id that was just copied

  // Set default category on mount
  useEffect(() => {
    if (hadithsData.categories.length > 0) {
      setSelectedCategory(hadithsData.categories[0].id);
    }
  }, []);

  // ── Derived data (memoised) ─────────────────────────────────────────────────
  const filteredCategories = useMemo(
    () =>
      hadithsData.categories.filter(
        (category) =>
          category.name.includes(searchTerm) ||
          category.hadiths.some(
            (h) =>
              h.arabic.includes(searchTerm) ||
              h.topic.includes(searchTerm) ||
              h.narrator.includes(searchTerm)
          )
      ),
    [searchTerm]
  );

  const currentCategory = useMemo(
    () => filteredCategories.find((cat) => cat.id === selectedCategory),
    [filteredCategories, selectedCategory]
  );

  const filteredHadiths = useMemo(
    () =>
      currentCategory?.hadiths.filter(
        (h) =>
          h.arabic.includes(searchTerm) ||
          h.topic.includes(searchTerm) ||
          h.narrator.includes(searchTerm)
      ),
    [currentCategory, searchTerm]
  );

  // ── Handlers (stable references via useCallback) ───────────────────────────
  const handleCategorySelect = useCallback((id) => {
    setSelectedCategory(id);
    setExpandedHadith(null); // collapse any open card when switching category
  }, []);

  const handleToggleExpand = useCallback((hadithId) => {
    setExpandedHadith((prev) => (prev === hadithId ? null : hadithId));
  }, []);

  const handleCopyHadith = useCallback(
    (hadithId, text) => {
      navigator.clipboard.writeText(text).catch(() => {
        // Fallback for browsers that don't support clipboard API
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      });
      setCopyFeedback(hadithId);
      setTimeout(() => setCopyFeedback(null), 2000);
    },
    []
  );

  const handleShareHadith = useCallback((text, topic) => {
    if (navigator.share) {
      navigator.share({ title: topic, text });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text).catch(() => null);
    }
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setExpandedHadith(null);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main className="hp-page" role="main">
      <div className="hp-container">

        {/* ── Hero / Title ── */}
        <section className="hp-hero" aria-label="عنوان صفحة الأحاديث النبوية">
          {/* Search bar */}
          <div className="hp-search-wrapper">
            {/* Visually-hidden label for screen readers */}
            <label htmlFor="hadith-search" className="hp-sr-only">
              البحث في الأحاديث النبوية
            </label>
            <div className="hp-search-bar" role="search">
              <button
                className="hp-search-icon-btn"
                aria-label="بحث"
                tabIndex={-1}
              >
                <span aria-hidden="true">🔍</span>
              </button>
              <input
                id="hadith-search"
                type="search"
                className="hp-search-input"
                placeholder="ابحث في الأحاديث..."
                value={searchTerm}
                onChange={handleSearchChange}
                autoComplete="off"
                dir="rtl"
              />
            </div>
          </div>

          {/* Calligraphic page title */}
          <h1 className="hp-hero-title" lang="ar">
            الأحاديث النبوية
          </h1>
          <p className="hp-hero-subtitle">
            مجموعة من الأحاديث النبوية الشريفة مصنفة حسب المواضيع
          </p>
        </section>

        {/* ── Two-column layout: content (3/4) | sidebar (1/4) ── */}
        <div className="hp-layout">

          {/* ── Hadiths Content Column ── */}
          <section
            className="hp-content-col"
            aria-label="قائمة الأحاديث"
          >
            {currentCategory ? (
              <div className="hp-panel">
                {/* Floating category banner */}
                <header className="hp-category-banner" aria-label="التصنيف الحالي">
                  <div className="hp-banner-count-badge">
                    <span>{filteredHadiths?.length ?? 0}</span>
                    <span>أحاديث</span>
                  </div>
                  <div className="hp-banner-title">
                    <h2 className="hp-banner-name">{currentCategory.name}</h2>
                    <span className="hp-banner-icon" aria-hidden="true">
                      {currentCategory.icon}
                    </span>
                  </div>
                </header>

                {/* Hadith list */}
                <div className="hp-hadiths-list">
                  {filteredHadiths && filteredHadiths.length > 0 ? (
                    filteredHadiths.map((hadith) => (
                      <HadithCard
                        key={`${currentCategory.id}-${hadith.id}`}
                        hadith={hadith}
                        isExpanded={expandedHadith === hadith.id}
                        onToggle={() => handleToggleExpand(hadith.id)}
                        onCopy={() => handleCopyHadith(hadith.id, hadith.arabic)}
                        onShare={() => handleShareHadith(hadith.arabic, hadith.topic)}
                      />
                    ))
                  ) : (
                    /* Empty state */
                    <div className="hp-empty-state" role="status" aria-live="polite">
                      <span className="hp-empty-icon" aria-hidden="true">🔍</span>
                      <p className="hp-empty-text">لا توجد أحاديث تطابق بحثك</p>
                    </div>
                  )}
                </div>

                {/* Copy feedback toast */}
                {copyFeedback && (
                  <div
                    className="hp-toast"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span aria-hidden="true">✅</span>
                    تم نسخ الحديث
                  </div>
                )}
              </div>
            ) : (
              /* No category matches search */
              <div className="hp-panel hp-empty-state" role="status" aria-live="polite">
                <span className="hp-empty-icon" aria-hidden="true">🔍</span>
                <p className="hp-empty-text">لا توجد تصنيفات تطابق بحثك</p>
              </div>
            )}
          </section>

          {/* ── Categories Sidebar ── */}
          <aside
            className="hp-sidebar"
            aria-label="تصنيفات الأحاديث"
          >
            <div className="hp-sidebar-panel">
              <h2 className="hp-sidebar-title">التصنيفات</h2>
              <nav
                className="hp-categories-list"
                aria-label="قائمة التصنيفات"
                role="navigation"
              >
                {filteredCategories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    category={category}
                    isActive={selectedCategory === category.id}
                    onClick={() => handleCategorySelect(category.id)}
                  />
                ))}

                {filteredCategories.length === 0 && (
                  <p className="hp-sidebar-empty" role="status">
                    لا توجد تصنيفات
                  </p>
                )}
              </nav>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default HadithPage;
