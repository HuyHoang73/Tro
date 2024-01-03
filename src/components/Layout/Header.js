import { Link } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";
import { Col, Row } from "antd";

function Header() {
  const token = getCookie("token");

  return (
    <>
      <Row>
        <header className="header">
          <Col span={10}>
            <div className="header-logo">
              <Link to="/">Home</Link>
            </div>
          </Col>
          <Col span={6} offset={5}>
            <div className="header-menu">
              <ul>
                <li>
                  <Link to="/hostel" className="link">
                    Thuê phòng
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

            <Col span={5}>
          <div className="header-account">
            {token ? (
              <>
                <Link to="/infouser" className="link">
                  User
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="link">
                  Đăng ký
                </Link>
                <Link to="/login" className="link">
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
          </Col>
        </header>
      </Row>
    </>
  );
}
export default Header;
