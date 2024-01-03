import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookies";
import { editUser, getUser1 } from "../../../services/userServices";
import "./Member.css";
import swal from "sweetalert";

function Member() {
  const id = getCookie("id");
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [style, setStyle] = useState({});

  const fetchApi = async () => {
    const result = await getUser1(id);
    if (result) {
      setUser(result);
      switch (result.idrole) {
        case 2:
          setText("Cao cấp");
          setStyle({
            color: "#EB8219",
          });
          break;
        case 3:
          setText("Tiêu chuẩn");
          setStyle({
            color: "#0499A8",
          });
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser1(id);
      if (result) {
        setUser(result);
        switch (result.idrole) {
          case 2:
            setText("Cao cấp");
            setStyle({
              color: "#EB8219",
            });
            break;
          case 3:
            setText("Tiêu chuẩn");
            setStyle({
              color: "#0499A8",
            });
            break;
          default:
            break;
        }
      }
    };
    fetchApi();
  }, [id]);

  const handleReload = () => {
    fetchApi();
  };

  const handleCheck1 = () => {
    swal({
      title: "Bạn muốn chuyển đổi sang thành viên tiêu chuẩn?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willTransfer) => {
      if (willTransfer) {
        if (user.idrole === 3) {
          swal("Bạn đang là thành viên tiêu chuẩn rồi!", "", "error");
        } else {
          const fetchApi = async () => {
            const result = await editUser(user.id, {
              idrole: 3,
            });
            if (result) {
              swal(
                "Chuyển đổi thành công!",
                "Bạn đã trở thành thành viên tiêu chuẩn",
                "success"
              );
              handleReload();
            }
          };
          fetchApi();
        }
      }
    });
  };

  const handleCheck2 = () => {
    swal({
      title: "Bạn muốn chuyển đổi sang thành viên cao cấp?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((willTransfer) => {
      if (willTransfer) {
        if (user.idrole === 2) {
          swal("Bạn đang là thành viên cao cấp rồi!", "", "error");
        } else if (user.money - 100000 >= 0) {
          const currentMoney = user.money - 100000;
          const fetchApi = async () => {
            const result = await editUser(user.id, {
              money: currentMoney,
              idrole: 2,
            });
            if (result) {
              swal(
                "Chuyển đổi thành công!",
                "Bạn đã trở thành thành viên cao cấp",
                "success"
              );
              handleReload();
            }
          };
          fetchApi();
        } else {
          swal("Tài khoản của bạn không đủ để chuyển đổi", "", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="page-member">
        <h2 className="page-member-title">Thành viên</h2>
        <div className="page-member-content">
          {user && (
            <>
              <div className="page-member-header">
                <div className="page-member-line">
                  <div className="page-member-text">
                    Bạn đang là thành viên:
                  </div>
                  <div className="page-member-role" style={style}>
                    {text}
                  </div>
                </div>

                <div className="page-member-line">
                  <div className="page-member-text">Số dư tài khoản:</div>
                  {user.money} VND
                </div>

                <button className="page-member-button btn1">Nạp tiền</button>
              </div>

              <div className="page-member-package">
                <div className="package-item">
                  <h3 className="package-item-1">Tiêu chuẩn</h3>
                  <p>Tối đa 50 tin</p>
                  <p>Làm mới 1 lần/tin/ngày</p>
                  <p>Miễn phí</p>
                  <button
                    className="page-member-button btn2"
                    onClick={handleCheck1}
                  >
                    Chuyển đổi
                  </button>
                </div>

                <div className="package-item">
                  <h3 className="package-item-2">Cao cấp</h3>
                  <p>Tối đa 100 tin</p>
                  <p>Làm mới 1 lần/tin/ngày</p>
                  <p>100000 VND/tháng</p>
                  <button
                    className="page-member-button btn3"
                    onClick={handleCheck2}
                  >
                    Chuyển đổi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Member;
