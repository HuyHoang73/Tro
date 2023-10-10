import { Link } from "react-router-dom"

function Header() {
    const token = undefined;

    return (
        <>
            <header className="header">
                <div className="header-logo">
                    <Link to="/">StayHub</Link>
                </div>
                <div className="header-menu">
                    <ul>
                        <li><Link to="/buy" className="link">Mua nhà</Link></li>
                        <li><Link to="/rent" className="link">Thuê nhà</Link></li>
                        <li><Link to="/hostel" className="link">Trọ tốt</Link></li>                      
                        <li><Link to="/project" className="link">Dự án</Link></li>
                        <li><Link to="/answer" className="link">Hỏi đáp</Link></li>
                    </ul>
                </div>
                <div className="header-account">
                    {token ? (
                    <>
                        <Link to="/infouser" className="link">User</Link>
                        <Link to="/notification" className="link">Thông báo</Link>
                    </>) : (
                    <>
                        <Link to="/login" className="link">Đăng ký</Link>
                        <Link to="/register" className="link">Đăng nhập</Link>
                    </>)}
                </div>
            </header>
        </>
    )
}
export default Header;