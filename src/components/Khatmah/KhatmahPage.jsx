import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './KhatmahPage.css';

function KhatmahPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [khatmahs, setKhatmahs] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKhatmah, setNewKhatmah] = useState({
    name: '',
    deceasedName: '',
    description: ''
  });
  const [selectedKhatmah, setSelectedKhatmah] = useState(null);

  const juzList = Array.from({ length: 30 }, (_, i) => ({
    number: i + 1,
    completedBy: null
  }));

  useEffect(() => {
    let allKhatmahs = [];
    const storedKhatmahs = localStorage.getItem('khatmahs');
    if (storedKhatmahs) {
      allKhatmahs = JSON.parse(storedKhatmahs);
    }
    
    const khatmahData = searchParams.get('data');
    const khatmahId = searchParams.get('id');
    
    if (khatmahData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(atob(khatmahData)));
        
        const { shareLink: _, ...khatmahForEncoding } = decodedData;
        const encodedData = btoa(encodeURIComponent(JSON.stringify(khatmahForEncoding)));
        decodedData.shareLink = `${window.location.origin}/khatmah?data=${encodeURIComponent(encodedData)}`;
        
        const existingIndex = allKhatmahs.findIndex(k => k.id === decodedData.id);
        
        if (existingIndex >= 0) {
          allKhatmahs[existingIndex] = decodedData;
        } else {
          allKhatmahs.push(decodedData);
        }
        
        localStorage.setItem('khatmahs', JSON.stringify(allKhatmahs));
        setKhatmahs(allKhatmahs);
        setSelectedKhatmah(decodedData);
      } catch (err) {
        console.error('خطأ في فك تشفير بيانات الختمة:', err);
      }
    } else {
      setKhatmahs(allKhatmahs);
      
      if (khatmahId) {
        const khatmah = allKhatmahs.find(k => k.id === khatmahId);
        if (khatmah) {
          setSelectedKhatmah(khatmah);
        }
      }
    }
  }, [searchParams]);

  const saveKhatmahs = (updatedKhatmahs) => {
    localStorage.setItem('khatmahs', JSON.stringify(updatedKhatmahs));
    setKhatmahs(updatedKhatmahs);
    
    if (selectedKhatmah) {
      const updatedSelected = updatedKhatmahs.find(k => k.id === selectedKhatmah.id);
      if (updatedSelected) {
        setSelectedKhatmah(updatedSelected);
      }
    }
  };

  const createKhatmah = () => {
    if (!newKhatmah.name || !newKhatmah.deceasedName) {
      alert('الرجاء إدخال جميع الحقول المطلوبة');
      return;
    }

    const khatmahId = `khatmah_${Date.now()}`;
    const khatmah = {
      id: khatmahId,
      ...newKhatmah,
      juzList: juzList.map(j => ({ ...j })),
      createdAt: new Date().toISOString()
    };
    
    const { shareLink: _, ...khatmahForEncoding } = khatmah;
    const encodedData = btoa(encodeURIComponent(JSON.stringify(khatmahForEncoding)));
    khatmah.shareLink = `${window.location.origin}/khatmah?data=${encodeURIComponent(encodedData)}`;

    const updatedKhatmahs = [...khatmahs, khatmah];
    saveKhatmahs(updatedKhatmahs);
    setShowCreateForm(false);
    setNewKhatmah({ name: '', deceasedName: '', description: '' });
  };

  const markJuzComplete = (khatmahId, juzNumber, readerName) => {
    if (!readerName || readerName.trim() === '') {
      alert('الرجاء إدخال اسمك');
      return;
    }

    const updatedKhatmahs = khatmahs.map(k => {
      if (k.id === khatmahId) {
        const updatedJuzList = k.juzList.map(j => {
          if (j.number === juzNumber) {
            return { ...j, completedBy: readerName };
          }
          return j;
        });
        const updatedKhatmah = { ...k, juzList: updatedJuzList };
        const { shareLink: _, ...khatmahForEncoding } = updatedKhatmah;
        const encodedData = btoa(encodeURIComponent(JSON.stringify(khatmahForEncoding)));
        updatedKhatmah.shareLink = `${window.location.origin}/khatmah?data=${encodeURIComponent(encodedData)}`;
        return updatedKhatmah;
      }
      return k;
    });

    saveKhatmahs(updatedKhatmahs);
    if (selectedKhatmah?.id === khatmahId) {
      setSelectedKhatmah(updatedKhatmahs.find(k => k.id === khatmahId));
    }
  };

  const copyShareLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('تم نسخ الرابط! يمكنك مشاركته الآن');
  };

  const deleteKhatmah = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الختمة؟')) {
      const updatedKhatmahs = khatmahs.filter(k => k.id !== id);
      saveKhatmahs(updatedKhatmahs);
      if (selectedKhatmah?.id === id) {
        setSelectedKhatmah(null);
      }
    }
  };

  const getCompletionPercentage = (khatmah) => {
    const completedJuz = khatmah.juzList.filter(j => j.completedBy).length;
    return Math.round((completedJuz / 30) * 100);
  };

  if (selectedKhatmah) {
    const completedJuz = selectedKhatmah.juzList.filter(j => j.completedBy).length;

    return (
      <div className="khatmah-page">
        <div className="container">
          <button className="back-btn" onClick={() => {
            setSelectedKhatmah(null);
            navigate('/khatmah');
          }}>
            ← رجوع
          </button>

          <div className="khatmah-header-card">
            <h1>📿 ختمة قرآنية</h1>
            <div className="khatmah-info">
              <h2>{selectedKhatmah.name}</h2>
              <p className="deceased-name">للمتوفى/ـة: {selectedKhatmah.deceasedName}</p>
              {selectedKhatmah.description && (
                <p className="description">{selectedKhatmah.description}</p>
              )}
            </div>
            <div className="progress-info">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getCompletionPercentage(selectedKhatmah)}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {completedJuz} / 30 جزء ({getCompletionPercentage(selectedKhatmah)}%)
              </p>
            </div>
            <button 
              className="share-btn" 
              onClick={() => copyShareLink(selectedKhatmah.shareLink)}
            >
              🔗 مشاركة الختمة
            </button>
          </div>

          <div className="duas-section">
            <h3>🤲 أدعية للمتوفى</h3>
            <div className="dua-card">
              <p className="dua-text">
                اللهم اغفر له وارحمه، وعافه واعف عنه، وأكرم نزله، ووسع مدخله،
                واغسله بالماء والثلج والبرد، ونقه من الخطايا كما ينقى الثوب الأبيض من الدنس
              </p>
            </div>
            <div className="dua-card">
              <p className="dua-text">
                اللهم اجعل قبره روضة من رياض الجنة، ولا تجعله حفرة من حفر النار
              </p>
            </div>
          </div>

          <div className="juz-grid">
            {selectedKhatmah.juzList.map((juz) => (
              <div key={juz.number} className={`juz-card ${juz.completedBy ? 'completed' : ''}`}>
                <div className="juz-number">الجزء {juz.number}</div>
                {juz.completedBy ? (
                  <div className="completed-info">
                    <span className="check-icon">✓</span>
                    <span className="reader-name">{juz.completedBy}</span>
                  </div>
                ) : (
                  <div className="juz-actions">
                    <input
                      type="text"
                      placeholder="اسمك"
                      className="reader-input"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          markJuzComplete(selectedKhatmah.id, juz.number, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      className="complete-btn"
                      onClick={(e) => {
                        const input = e.target.parentElement.querySelector('.reader-input');
                        markJuzComplete(selectedKhatmah.id, juz.number, input.value);
                        input.value = '';
                      }}
                    >
                      تسجيل
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="khatmah-page">
      <div className="container">
        <div className="page-header">
          <h1>🎯 الختمة الجماعية</h1>
          <p className="page-description">
            أنشئ ختمة قرآنية جماعية للمتوفى وشارك الرابط مع الأهل والأصدقاء
          </p>
        </div>

        <button className="create-btn" onClick={() => setShowCreateForm(true)}>
          ➕ إنشاء ختمة جديدة
        </button>

        {showCreateForm && (
          <div className="create-form-modal">
            <div className="create-form">
              <h2>إنشاء ختمة جديدة</h2>
              <input
                type="text"
                placeholder="اسم الختمة (مثال: ختمة الوالد)"
                value={newKhatmah.name}
                onChange={(e) => setNewKhatmah({ ...newKhatmah, name: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="اسم المتوفى/ـة"
                value={newKhatmah.deceasedName}
                onChange={(e) => setNewKhatmah({ ...newKhatmah, deceasedName: e.target.value })}
                className="form-input"
              />
              <textarea
                placeholder="وصف إضافي (اختياري)"
                value={newKhatmah.description}
                onChange={(e) => setNewKhatmah({ ...newKhatmah, description: e.target.value })}
                className="form-textarea"
              ></textarea>
              <div className="form-actions">
                <button className="btn-submit" onClick={createKhatmah}>
                  إنشاء
                </button>
                <button 
                  className="btn-cancel" 
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewKhatmah({ name: '', deceasedName: '', description: '' });
                  }}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="khatmahs-list">
          {khatmahs.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📖</span>
              <p>لا توجد ختمات حالياً</p>
              <p className="empty-subtitle">أنشئ ختمة جديدة للبدء</p>
            </div>
          ) : (
            khatmahs.map((khatmah) => {
              const completedJuz = khatmah.juzList.filter(j => j.completedBy).length;
              return (
                <div key={khatmah.id} className="khatmah-item">
                  <div className="khatmah-item-header">
                    <h3>{khatmah.name}</h3>
                    <p>للمتوفى/ـة: {khatmah.deceasedName}</p>
                  </div>
                  <div className="khatmah-item-progress">
                    <div className="progress-bar small">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${getCompletionPercentage(khatmah)}%` }}
                      ></div>
                    </div>
                    <span>{completedJuz} / 30 جزء</span>
                  </div>
                  <div className="khatmah-item-actions">
                    <button onClick={() => setSelectedKhatmah(khatmah)}>
                      فتح الختمة
                    </button>
                    <button onClick={() => copyShareLink(khatmah.shareLink)}>
                      🔗 مشاركة
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteKhatmah(khatmah.id)}
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default KhatmahPage;
