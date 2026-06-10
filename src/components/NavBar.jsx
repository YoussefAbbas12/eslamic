import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../images/logo.jpg';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
  <Navbar expand="lg" className="navbar custom-navbar" dir="rtl">
      <Container>
        {/* شعار الموقع */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block align-top rounded-circle"
            alt="شعار الموقع"
          />
        </Navbar.Brand>

        {/* زر القائمة عند الشاشات الصغيرة */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto gap-3">
            <Nav.Link as={Link} to="/">الرئيسية</Nav.Link>
            <Nav.Link as={Link} to="/today">اليوم</Nav.Link>
            <Nav.Link as={Link} to="/quran">القرآن الكريم</Nav.Link>
            <Nav.Link as={Link} to="/hadith">الأحاديث</Nav.Link>
            <Nav.Link as={Link} to="/adia">الأدعية</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
