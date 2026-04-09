import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function Footer() {
  const footerStyle = {
    backgroundColor: 'var(--bg-dark)',
    color: 'var(--text-light)',
    padding: '1.5rem 0',
    marginTop: '3rem',
    transition: 'var(--transition-normal)'
  };

  const linkStyle = {
    color: 'var(--text-light)',
    textDecoration: 'none',
    transition: 'var(--transition-fast)'
  };

  const headingStyle = {
    color: 'var(--secondary-main)',
    marginBottom: '1rem',
    fontWeight: 'bold'
  };

  const hrStyle = {
    borderColor: 'var(--neutral-gray)',
    opacity: 0.3
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 style={headingStyle}>روابط سريعة</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/" 
                  style={linkStyle}
                >
                  الرئيسية
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/today" 
                  style={linkStyle}
                >
                  اليوم
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/quran" 
                  style={linkStyle}
                >
                  القرآن الكريم
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/hadith" 
                  style={linkStyle}
                >
                  الأحاديث
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/duas" 
                  style={linkStyle}
                >
                  الأدعية
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 style={headingStyle}>خدمات إضافية</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/tasbih" 
                  style={linkStyle}
                >
                  التسبيح
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/prayer-times" 
                  style={linkStyle}
                >
                  مواقيت الصلاة
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/qibla" 
                  style={linkStyle}
                >
                  اتجاه القبلة
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/zakat" 
                  style={linkStyle}
                >
                  حساب الزكاة
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/hijri" 
                  style={linkStyle}
                >
                  التقويم الهجري
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 style={headingStyle}>تواصل معنا</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="#" 
                  style={linkStyle}
                >
                  عن الموقع
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={linkStyle}
                >
                  سياسة الخصوصية
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={linkStyle}
                >
                  شروط الاستخدام
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={linkStyle}
                >
                  اتصل بنا
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#" 
                  style={linkStyle}
                >
                  اقتراحات
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr style={hrStyle} />
        <Row>
          <Col className="text-center">
            <p className="mb-0" style={{ color: 'var(--neutral-medium-gray)' }}>
              &copy; {new Date().getFullYear()} جميع الحقوق محفوظة - الموقع الإسلامي
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;