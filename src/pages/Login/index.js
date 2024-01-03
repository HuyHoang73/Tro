import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  // checkUser,
  // getMessageLogin,
  getUser,
} from "../../services/userServices";
import { setCookie } from "../../helpers/cookies";
import { useDispatch } from "react-redux";
import { authen } from "../../actions/authentication";
import Modal from "react-modal";
import { useState } from "react";
import swal from "sweetalert";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginTop: "50px",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "60vh",
    padding: "0",
    borderRadius: "10px",
  },
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const check = "user";
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const email = e.target.elements.gmail.value;
    const password = e.target.elements.password.value;
    const response = await getUser(email, password);
    if (response.length > 0) {
      const time = 1;
      setCookie("id", response[0].id, time);
      setCookie("idrole", response[0].idrole, time);
      setCookie("gmail", response[0].gmail, time);
      setCookie("token", response[0].token, time);
      dispatch(authen(true));
      navigate("/");
      window.location.reload();
    } else {
      swal({
        position: "top-end",
        icon: "error",
        title: "Email hoặc mật khẩu sai",
        showConfirmButton: false,
        timer: 2000,
      });
    }
//  const response = await getUser(email, password);
//     if (response.length > 0) {
//       const time = 1;
//       setCookie("id", response[0].id, time);
//       setCookie("idrole", response[0].idrole, time);
//       setCookie("gmail", response[0].gmail, time);
//       setCookie("token", response[0].token, time);
//       dispatch(authen(true));
//       navigate("/");
//       window.location.reload();
//     } else {
//       swal({
//         position: "top-end",
//         icon: "error",
//         title: "Email hoặc mật khẩu sai",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
    // switch(check) {
    //     case "admin":
    //         navigate("/home-admin");
    //         break;
    //     case "user":
    //         navigate("/");
    //         break;
    //     default:
    //         alert("Tài khoản hoặc mật khẩu sai");
    //         break;
    // }
  };
    // const data = await checkUser(email, password);
    // if (data) {
    //   const result = await getMessageLogin();
    //   switch (result.code) {
    //     case 0:
    //       swal({
    //         position: "top-end",
    //         icon: "error",
    //         title: "Email hoặc mật khẩu không chính xác",
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //       break;
    //     case 1:
    //       const time = 1;
    //       setCookie("id", result.id, time);
    //       setCookie("idrole", result.idrole, time);
    //       setCookie("token", result.token, time);
    //       dispatch(authen(true));
    //       if(result.idrole === 1) {
    //         navigate("/home-admin")
    //       } else {
    //         navigate("/")
    //       }
    //       window.location.reload();
    //       break;
    //     default:
    //       break;
    //   }
    // }
  return (
    <>
      <div className="login-page">
        <div className="inner-login">
          <h2 className="login-title">Chào mừng đến với StayHub!</h2>
          <h2 className="login-title text">Đăng nhập</h2>
          <div className="login-form">
            <form onSubmit={handleSubmit1}>
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
                <button className=" button button-login">Đăng nhập</button>
              </div>
            </form>
            <div className="after-login">
              <button className="forget-pass" onClick={openModal}>
                Quên mật khẩu?
              </button>
              <p className="final-text">
                Bạn chưa có tài khoản?{" "}
                <b>
                  <Link to="/login" className="link">
                    Đăng ký
                  </Link>
                </b>
              </p>
            </div>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <form className="first-step-pass">
              <div className="first-step-pass-content">
                <h5 className="first-step-pass-title">
                  Vui lòng nhập email của bạn.
                </h5>
                <input
                  type="email"
                  name="gmail"
                  placeholder="Email"
                  className="input-modal-login"
                  required
                />
                <div className="button-modal-login">
                  <button className="page-member-button btn1">Xác nhận</button>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Login;
