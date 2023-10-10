import { Link, useNavigate } from "react-router-dom";
import "./Register.css"

function Register() {
    const navigate = useNavigate();
    const check = "user";

    const handleSubmit = (e) => {
        e.preventDefault();
        const tel = e.target.elements.tel.value;
        const password = e.target.elements.password.value;
        console.log(tel);
        console.log(password);
        switch(check) {
            case "admin":
                navigate("/home-admin");
                break;
            case "user":
                navigate("/");
                break;
            default:
                alert("Tài khoản hoặc mật khẩu sai");
                break;
        }

    }
    return(
        <>
            <div className="register-page">
                <div className="inner-register">
                    <h2 className="register-title">Chào mừng đến với StayHub!</h2>
                    <h2 className="register-title text">Đăng nhập</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input type="tel" name="tel" placeholder="Số điện thoại"  className="input input2" required/>
                        <input type="password" name="password" placeholder="Mật khẩu"  className="input input2" required/>
                            <div className="button-form">
                                <button className=" button button-register">Đăng nhập</button>
                            </div>
                            {/* <div>
                                Quên mật khẩu?
                            </div> */}
                        <p>Bạn chưa có tài khoản? <b><Link to="/login" className="link">Đăng ký</Link></b></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;