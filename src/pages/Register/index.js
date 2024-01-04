import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { createUser, getUser } from "../../services/userServices";
import { setCookie } from "../../helpers/cookies";
import swal from "sweetalert";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const gmail = e.target.elements.gmail.value;
    const password = e.target.elements.password.value;
    const phone = e.target.elements.phone.value;
    const token = "jkadjasd";

    try {
      const options = {
        name: name,
        gmail: gmail,
        password: password,
        phone: phone,
      };
  
      const result = await createUser(options);
      if (result.code === 2) {
        swal({
          position: "top-end",
          icon: "success",
          title: "Đã đăng ký thành công",
          showConfirmButton: false,
          timer: 2000,
        });
        const data = await getUser(gmail);
        const time = 1;
        setCookie("id", data.id, time);
        setCookie("idrole", 3, time);
        setCookie("gmail", gmail, time);
        setCookie("token", token, time);
        navigate("/");
        window.location.reload();
      } else {
        swal({
          position: "top-end",
          icon: "success",
          title: "Email đã tồn tại",
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(result)
      }
    } catch (error) {
      console.error("Đăng ký không thành công:", error);
      swal({
        title: "Đăng ký không thành công!",
        text: "Có lỗi xảy ra khi đăng ký người dùng.",
        icon: "error",
        button: "OK",
      });
    }

    // const checkExist = await getUser(gmail);

    // if (checkExist.length > 0) {
    //   swal({
    //     position: "top-end",
    //     icon: "error",
    //     title: "Email đã tồn tại",
    //     showConfirmButton: false,
    //     timer: 2000,
    //   });
    // } else {
    //   const result = await createUser(options);
    //   if (result) {
    //     const data = await getUser(gmail);
    //     const time = 1;
    //     setCookie("id", data.id, time);
    //     setCookie("idrole", 3, time);
    //     setCookie("gmail", gmail, time);
    //     setCookie("token", token, time);
    //     navigate("/");
    //     window.location.reload();
    //   }
    // }
  };

  return (
    <>
      <div className="register-page">
        <div className="inner-register">
          <h2 className="register-title">Chào mừng đến với StayHub!</h2>
          <h2 className="register-title text">Đăng ký</h2>
          <div className="register-page-content">
            <form className="register-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ tên"
                className="input"
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder="Só điện thoại"
                className="input"
                required
              />
              <input
                type="email"
                name="gmail"
                placeholder="Email"
                className="input"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className="input"
                required
              />

              <div className="button-form">
                <button className=" button button-register">Đăng ký</button>
              </div>
              <p>
                Bạn đã có tài khoản?{" "}
                <b>
                  <Link to="/register" className="link">
                    Đăng nhập
                  </Link>
                </b>
              </p>
            </form>

            <div className="register-image">
              <img
                src="https://cdnnews.mogi.vn/news/wp-content/uploads/2020/02/phong-tro-duoi-1-trieu-o-tphcm-5.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
