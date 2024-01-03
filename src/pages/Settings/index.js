import { Collapse } from "antd";
import "./Settings.css";

export default function Settings() {
  const handleChange = (e) => {
    console.log(e);
  };
  const itemCollapse = [
    {
      key: "1",
      label: "Thay đổi mật khẩu",
      children: (
        <>
          <form>
            <div className="box-pass">
              <label htmlFor="oldPass" className="label-pass">
                Nhập mật khẩu cũ:{" "}
              </label>
              <input
                type="text"
                name="oldPass"
                id="oldPass"
                onChange={handleChange}
                className="pass-input"
                required
              />
            </div>
            <div className="box-pass">
              <label htmlFor="newPass" className="label-pass">
                Nhập mật khẩu mới:{" "}
              </label>
              <input
                type="text"
                name="newPass"
                id="newPass"
                onChange={handleChange}
                className="pass-input"
                required
              />
            </div>
            <div className="box-pass">
              <label htmlFor="checkPass" className="label-pass">
                Xác nhận mật khẩu:{" "}
              </label>
              <input
                type="text"
                name="checkPass"
                id="checkPass"
                onChange={handleChange}
                className="pass-input"
                required
              />
            </div>
            <div className="up-pass-button box-pass">
              <button className="page-member-button btn1">Cập nhật</button>
            </div>
          </form>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="setting-page">
        <h1 className="setting-page-title">Cài đặt</h1>
        <div className="up-password">
          <Collapse
            items={itemCollapse}
            defaultActiveKey={["1"]}
            style={{ backgroundColor: "#00DEB6" }}
          />
        </div>
      </div>
    </>
  );
}
