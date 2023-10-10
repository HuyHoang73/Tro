import { Link, useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
    const navigate = useNavigate();
    const check = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        const tel = e.target.elements.tel.value;
        const password = e.target.elements.password.value;
        console.log(tel);
        console.log(password);
        if(check) {
            navigate("/");
        } else {
            alert("Đã tồn tại số điện thoại");
        }

    }
    return(
        <>
            <div className="login-page">
                <div className="inner-login">
                    <h2 className="login-title">Chào mừng đến với StayHub!</h2>
                    <h2 className="login-title text">Đăng ký</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="text" name="fname" placeholder="Họ" className="input input1" required/>
                        <input type="text" name="lname" placeholder="Tên" className="input input1" required/>
                        <input type="tel" name="tel" placeholder="Số điện thoại"  className="input input2" required/>
                        <input type="password" name="password" placeholder="Mật khẩu"  className="input input2" required/>
                        {/* <div>
                            <div>Bạn là chủ bất động sản?</div>
                            <div className="radio-group">
                                <label className="radio">
                                    <input type="radio" name="check"value="yes" />
                                    Có <span></span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="check"value="no" defaultChecked />
                                    Không <span></span> <br/>
                                </label>
                            </div>
                        </div> */}
                        <div className="button-form">
                            <button className=" button button-login">Đăng ký</button>
                        </div>
                        <p>Bạn đã có tài khoản? <b><Link to="/register" className="link">Đăng nhập</Link></b></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;