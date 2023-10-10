import { Link, Outlet } from "react-router-dom";

function InfoUser() {
    return(
        <>
            <div>InfoUser</div>
            <div className="user-navbar">
                <ul>
                    <li><Link to="./">Thông tin cá nhân</Link></li>
                    <li><Link to="./up-hostel">Tạo phòng trọ</Link></li>
                    <li><Link to="./posts">Tạo bài đăng</Link></li>
                    <li><Link to="./manage-post">Quản lý bài đăng</Link></li>
                    <li><Link to="./member">Thành viên</Link></li>
                    <li><Link to="./pay">Thanh toán</Link></li>
                    <li><Link to="./update-user">Cập nhật thông tin cá nhân</Link></li>
                    <li><Link to="./up-pass">Thay đổi</Link></li>
                </ul>
            </div>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default InfoUser;