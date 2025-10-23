import React, { useState } from 'react';
import './IslamicRulingsPage.css';

function IslamicRulingsPage() {
  const [selectedCategory, setSelectedCategory] = useState('inheritance');
  const [searchQuery, setSearchQuery] = useState('');
  const [zakatInputs, setZakatInputs] = useState({
    gold: '',
    silver: '',
    money: '',
    trade: ''
  });
  const [zakatResult, setZakatResult] = useState(null);

  const [inheritanceInputs, setInheritanceInputs] = useState({
    wealth: '',
    sons: 0,
    daughters: 0,
    wife: false,
    husband: false,
    father: false,
    mother: false
  });
  const [inheritanceResult, setInheritanceResult] = useState(null);

  const rulings = {
    salah: [
      {
        title: 'أوقات الصلاة',
        content: 'الصلوات الخمس المفروضة: الفجر، الظهر، العصر، المغرب، والعشاء. لكل صلاة وقت محدد يبدأ وينتهي.',
        evidence: 'قال تعالى: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا" (النساء: 103)',
        references: ['سورة النساء: 103', 'صحيح البخاري: 527']
      },
      {
        title: 'شروط صحة الصلاة',
        content: 'يشترط للصلاة: الطهارة، ستر العورة، استقبال القبلة، دخول الوقت، والنية.',
        evidence: 'قال رسول الله ﷺ: "لا يَقْبَلُ اللَّهُ صَلاةً بغيرِ طُهُورٍ" (رواه مسلم)',
        references: ['صحيح مسلم: 224']
      },
      {
        title: 'أركان الصلاة',
        content: 'أركان الصلاة أربعة عشر ركناً منها: القيام مع القدرة، تكبيرة الإحرام، قراءة الفاتحة، الركوع، السجود، والتشهد الأخير.',
        evidence: 'حديث المسيء في صلاته الذي علمه النبي ﷺ كيفية الصلاة (متفق عليه)',
        references: ['صحيح البخاري: 757', 'صحيح مسلم: 397']
      }
    ],
    zakat: [
      {
        title: 'نصاب الزكاة',
        content: 'نصاب الذهب 85 جراماً، والفضة 595 جراماً، والنقود والعروض التجارية تقدر بالذهب أو الفضة.',
        evidence: 'قال رسول الله ﷺ: "ليس فيما دون خمس أواقٍ صدقة" (متفق عليه)',
        references: ['صحيح البخاري: 1459', 'صحيح مسلم: 979']
      },
      {
        title: 'مقدار الزكاة',
        content: 'الزكاة ربع العشر (2.5%) من المال إذا بلغ النصاب وحال عليه الحول.',
        evidence: 'أمر النبي ﷺ معاذاً أن يأخذ من كل أربعين ديناراً ديناراً (رواه أبو داود)',
        references: ['سنن أبي داود: 1573']
      },
      {
        title: 'مصارف الزكاة',
        content: 'الزكاة للفقراء والمساكين والعاملين عليها والمؤلفة قلوبهم وفي الرقاب والغارمين وفي سبيل الله وابن السبيل.',
        evidence: 'قال تعالى: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ..." (التوبة: 60)',
        references: ['سورة التوبة: 60']
      }
    ],
    sawm: [
      {
        title: 'فرضية صيام رمضان',
        content: 'صيام شهر رمضان فريضة على كل مسلم بالغ عاقل قادر.',
        evidence: 'قال تعالى: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ..." (البقرة: 183)',
        references: ['سورة البقرة: 183-185']
      },
      {
        title: 'مفسدات الصوم',
        content: 'من مفسدات الصوم: الأكل والشرب عمداً، والجماع، والقيء عمداً، والحيض والنفاس.',
        evidence: 'قال تعالى: "فَالْآنَ بَاشِرُوهُنَّ وَابْتَغُوا مَا كَتَبَ اللَّهُ لَكُمْ وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ مِنَ الْخَيْطِ الْأَسْوَدِ مِنَ الْفَجْرِ ۖ ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ" (البقرة: 187)',
        references: ['سورة البقرة: 187']
      }
    ],
    inheritance: [
      {
        title: 'الورثة من الرجال',
        content: 'الورثة من الرجال خمسة عشر: الابن، ابن الابن وإن نزل، الأب، الجد وإن علا، الأخ الشقيق، الأخ لأب، الأخ لأم، ابن الأخ الشقيق، ابن الأخ لأب، العم الشقيق، العم لأب، ابن العم الشقيق، ابن العم لأب، الزوج، المعتِق.',
        evidence: 'قال تعالى: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ..." (النساء: 11)',
        references: ['سورة النساء: 11-12']
      },
      {
        title: 'الورثة من النساء',
        content: 'الورثات من النساء عشر: البنت، بنت الابن وإن نزل أبوها، الأم، الجدة، الأخت الشقيقة، الأخت لأب، الأخت لأم، الزوجة، المعتِقة.',
        evidence: 'قال تعالى: "وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِن لَّمْ يَكُن لَّكُمْ وَلَدٌ..." (النساء: 12)',
        references: ['سورة النساء: 11-12']
      },
      {
        title: 'أصحاب الفروض',
        content: 'الفروض المقدرة في الميراث ستة: النصف، الربع، الثمن، الثلثان، الثلث، السدس.',
        evidence: 'حددت آيات المواريث في سورة النساء هذه الفروض بالتفصيل',
        references: ['سورة النساء: 11-12، 176']
      }
    ],
    marriage: [
      {
        title: 'شروط النكاح',
        content: 'يشترط لصحة النكاح: تعيين الزوجين، رضا الزوجين، الولي للمرأة، الشهود، وانتفاء الموانع.',
        evidence: 'قال رسول الله ﷺ: "لا نكاح إلا بولي" (رواه أحمد وأبو داود)',
        references: ['سنن أبي داود: 2085', 'مسند أحمد: 19098']
      },
      {
        title: 'المحرمات في النكاح',
        content: 'يحرم الزواج من الأمهات والبنات والأخوات والعمات والخالات وبنات الأخ وبنات الأخت والأمهات من الرضاع.',
        evidence: 'قال تعالى: "حُرِّمَتْ عَلَيْكُمْ أُمَّهَاتُكُمْ وَبَنَاتُكُمْ..." (النساء: 23)',
        references: ['سورة النساء: 22-24']
      }
    ],
    purification: [
      {
        title: 'أنواع المياه',
        content: 'الماء الطهور: وهو الباقي على أصل خلقته، يرفع الحدث ويزيل النجس.',
        evidence: 'قال تعالى: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً طَهُورًا" (الفرقان: 48)',
        references: ['سورة الفرقان: 48']
      },
      {
        title: 'الوضوء',
        content: 'فرائض الوضوء: غسل الوجه، غسل اليدين إلى المرفقين، مسح الرأس، غسل الرجلين إلى الكعبين، والترتيب والموالاة.',
        evidence: 'قال تعالى: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ..." (المائدة: 6)',
        references: ['سورة المائدة: 6']
      }
    ]
  };

  const categories = [
    { id: 'salah', name: 'الصلاة', icon: '🕌' },
    { id: 'zakat', name: 'الزكاة', icon: '💰' },
    { id: 'sawm', name: 'الصيام', icon: '🌙' },
    { id: 'inheritance', name: 'المواريث', icon: '📊' },
    { id: 'marriage', name: 'النكاح', icon: '💍' },
    { id: 'purification', name: 'الطهارة', icon: '💧' }
  ];

  const calculateZakat = () => {
    const goldNisab = 85; // grams
    const silverNisab = 595; // grams
    const zakatRate = 0.025; // 2.5%

    const totalGoldValue = parseFloat(zakatInputs.gold) || 0;
    const totalSilverValue = parseFloat(zakatInputs.silver) || 0;
    const totalMoney = parseFloat(zakatInputs.money) || 0;
    const totalTrade = parseFloat(zakatInputs.trade) || 0;

    const totalWealth = totalGoldValue + totalSilverValue + totalMoney + totalTrade;
    const zakatAmount = totalWealth * zakatRate;

    setZakatResult({
      totalWealth: totalWealth.toFixed(2),
      zakatAmount: zakatAmount.toFixed(2),
      nisabReached: totalWealth > 0
    });
  };

  const calculateInheritance = () => {
    const wealth = parseFloat(inheritanceInputs.wealth) || 0;
    const shares = {};
    let remainingWealth = wealth;

    // Simplified calculation (actual Islamic inheritance is complex)
    if (inheritanceInputs.husband) {
      shares.husband = inheritanceInputs.sons > 0 || inheritanceInputs.daughters > 0 ? wealth * 0.25 : wealth * 0.5;
      remainingWealth -= shares.husband;
    }

    if (inheritanceInputs.wife) {
      shares.wife = inheritanceInputs.sons > 0 || inheritanceInputs.daughters > 0 ? wealth * 0.125 : wealth * 0.25;
      remainingWealth -= shares.wife;
    }

    if (inheritanceInputs.mother && remainingWealth > 0) {
      shares.mother = wealth * (1/6);
      remainingWealth -= shares.mother;
    }

    if (inheritanceInputs.father && remainingWealth > 0) {
      shares.father = wealth * (1/6);
      remainingWealth -= shares.father;
    }

    const totalChildren = inheritanceInputs.sons + inheritanceInputs.daughters;
    if (totalChildren > 0 && remainingWealth > 0) {
      const maleShares = inheritanceInputs.sons * 2;
      const femaleShares = inheritanceInputs.daughters * 1;
      const totalShares = maleShares + femaleShares;
      
      const shareValue = remainingWealth / totalShares;
      shares.sonShare = shareValue * 2;
      shares.daughterShare = shareValue;
    }

    setInheritanceResult(shares);
  };

  const filteredRulings = rulings[selectedCategory]?.filter(ruling =>
    ruling.title.includes(searchQuery) || ruling.content.includes(searchQuery)
  ) || [];

  return (
    <div className="islamic-rulings-page">
      <div className="container">
        <div className="page-header">
          <h1>⚖️ الأحكام الشرعية</h1>
          <p className="page-description">
            دليلك الشامل للأحكام الفقهية مع الأدلة من القرآن والسنة
          </p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="ابحث عن حكم شرعي..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ruling-search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {selectedCategory === 'zakat' && (
          <div className="calculator-section">
            <h2>💰 حاسبة الزكاة</h2>
            <div className="calculator-inputs">
              <div className="input-group">
                <label>قيمة الذهب (بالعملة المحلية):</label>
                <input
                  type="number"
                  value={zakatInputs.gold}
                  onChange={(e) => setZakatInputs({...zakatInputs, gold: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="input-group">
                <label>قيمة الفضة (بالعملة المحلية):</label>
                <input
                  type="number"
                  value={zakatInputs.silver}
                  onChange={(e) => setZakatInputs({...zakatInputs, silver: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="input-group">
                <label>النقود والأموال:</label>
                <input
                  type="number"
                  value={zakatInputs.money}
                  onChange={(e) => setZakatInputs({...zakatInputs, money: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="input-group">
                <label>عروض التجارة:</label>
                <input
                  type="number"
                  value={zakatInputs.trade}
                  onChange={(e) => setZakatInputs({...zakatInputs, trade: e.target.value})}
                  placeholder="0"
                />
              </div>
            </div>
            <button className="calculate-btn" onClick={calculateZakat}>
              احسب الزكاة
            </button>
            {zakatResult && (
              <div className="result-card">
                <h3>نتيجة الحساب:</h3>
                <p><strong>إجمالي المال:</strong> {zakatResult.totalWealth} وحدة نقدية</p>
                <p><strong>مقدار الزكاة (2.5%):</strong> {zakatResult.zakatAmount} وحدة نقدية</p>
                <p className="note">💡 تذكر: يجب أن يحول الحول على المال (سنة هجرية كاملة)</p>
              </div>
            )}
          </div>
        )}

        {selectedCategory === 'inheritance' && (
          <div className="calculator-section">
            <h2>📊 حاسبة المواريث (مبسطة)</h2>
            <p className="warning-note">⚠️ هذه حاسبة مبسطة. للحالات المعقدة، استشر عالماً شرعياً متخصصاً.</p>
            <div className="calculator-inputs">
              <div className="input-group">
                <label>إجمالي التركة:</label>
                <input
                  type="number"
                  value={inheritanceInputs.wealth}
                  onChange={(e) => setInheritanceInputs({...inheritanceInputs, wealth: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={inheritanceInputs.wife}
                    onChange={(e) => setInheritanceInputs({...inheritanceInputs, wife: e.target.checked})}
                  />
                  زوجة
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={inheritanceInputs.husband}
                    onChange={(e) => setInheritanceInputs({...inheritanceInputs, husband: e.target.checked})}
                  />
                  زوج
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={inheritanceInputs.father}
                    onChange={(e) => setInheritanceInputs({...inheritanceInputs, father: e.target.checked})}
                  />
                  أب
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={inheritanceInputs.mother}
                    onChange={(e) => setInheritanceInputs({...inheritanceInputs, mother: e.target.checked})}
                  />
                  أم
                </label>
              </div>
              <div className="input-group">
                <label>عدد الأبناء الذكور:</label>
                <input
                  type="number"
                  min="0"
                  value={inheritanceInputs.sons}
                  onChange={(e) => setInheritanceInputs({...inheritanceInputs, sons: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="input-group">
                <label>عدد البنات:</label>
                <input
                  type="number"
                  min="0"
                  value={inheritanceInputs.daughters}
                  onChange={(e) => setInheritanceInputs({...inheritanceInputs, daughters: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <button className="calculate-btn" onClick={calculateInheritance}>
              احسب التوزيع
            </button>
            {inheritanceResult && (
              <div className="result-card">
                <h3>توزيع التركة:</h3>
                {Object.entries(inheritanceResult).map(([heir, amount]) => (
                  <p key={heir}>
                    <strong>
                      {heir === 'husband' ? 'الزوج' : 
                       heir === 'wife' ? 'الزوجة' : 
                       heir === 'father' ? 'الأب' : 
                       heir === 'mother' ? 'الأم' :
                       heir === 'sonShare' ? 'نصيب كل ابن' :
                       heir === 'daughterShare' ? 'نصيب كل بنت' : heir}:
                    </strong> {amount.toFixed(2)} وحدة نقدية
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="rulings-list">
          {filteredRulings.map((ruling, index) => (
            <div key={index} className="ruling-card">
              <h3 className="ruling-title">{ruling.title}</h3>
              <p className="ruling-content">{ruling.content}</p>
              <div className="ruling-evidence">
                <strong>📖 الدليل:</strong>
                <p>{ruling.evidence}</p>
              </div>
              <div className="ruling-references">
                <strong>🔖 المراجع:</strong>
                <ul>
                  {ruling.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {filteredRulings.length === 0 && searchQuery && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>لم يتم العثور على أحكام تطابق بحثك</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IslamicRulingsPage;
