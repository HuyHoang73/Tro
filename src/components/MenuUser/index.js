import { Link } from "react-router-dom";
import "./MenuUser.css";
import {
  BarChartOutlined,
  BarsOutlined,
  // DollarOutlined,
  HomeOutlined,
  SettingOutlined,
  // UsergroupAddOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Modal, Form, Input, Collapse, Switch, Button } from "antd";
import { getCookie } from "../../helpers/cookies";
import { editUser, getUser1 } from "../../services/userServices";
import swal from "sweetalert";
import VoteHistory from "../../pages/InfoUser/UserHome/PageFavorites";
import DisplayUser from "../../pages/InfoUser/UserHome/displayUser.js"

function MenuUser() {
  const id = getCookie("id");
  const [userpass, setUserpass] = useState({});
  const [display, setDisplay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addClass = () => {
    setDisplay(!display);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser1();
      if (result) {
        setUserpass(result.password);
      }
    };
    fetchApi();
  }, []);
  const onFinish = (values) => {
    if (values.oldPass === userpass && values.newPass === values.verifyPass) {
      const option = {
        password: values.newPass,
      };
      const fetchApi = async () => {
        const result = await editUser(id, option);
        if (result) {
          setIsModalOpen(false);
          swal({
            position: "top-end",
            icon: "success",
            title: "Đã sửa thành công",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      };
      fetchApi();
      console.log("Success:");
    } else if (values.oldPass !== userpass) {
      swal({
        position: "top-end",
        icon: "error",
        title: "Sai mật khẩu",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (values.newPass !== values.verifyPass) {
      swal({
        position: "top-end",
        icon: "error",
        title: "Xác nhận mật khẩu không khớp",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const itemCollapse = [
    {
      key: "1",
      label: "Thay đổi mật khẩu",
      children: (
        <>
          <Form
            name="basic"
            layout="horizontal"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Nhập mật khẩu cũ"
              name="oldPass"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu cũ!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nhập mật khẩu mới"
              name="newPass"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu mới!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="verifyPass"
              rules={[
                {
                  required: true,
                  message: "Hãy xác nhận mật khẩu!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                  span: 24,
                }}
                style={{ width: "100%", display:"flex", justifyContent:"center"}}
              >
                <Button type="primary" htmlType="submit" style={{backgroundColor: "#55E8CD"}}>
                  Cập nhật
                </Button>
              </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="menu-user">
        <ul className="menu-user-main">
          <li>
            <button className="btn-display" onClick={addClass}>
              <BarsOutlined />
            </button>
            <ul className={`menu-user-list ${display ? "show" : ""}`}>
              <li>
                <Link to="./">
                  <BarChartOutlined />
                </Link>
              </li>
              <li>
                <DisplayUser />
              </li>
              {/* <li>
                <VoteHistory />
              </li> */}
              {/* <li>
                <Link to="./member">
                  <UsergroupAddOutlined />
                </Link>
              </li>
              <li>
                <Link to="./pay">
                  <DollarOutlined />
                </Link>
              </li> */}
              <li>
                <button className="btn-display" onClick={showModal}>
                  <SettingOutlined />
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{
          marginTop: "-50px",
          paddingTop: "-100px",
        }}
        footer=""
      >
        <div className="hostel-modal">
          <div className="hostel-modal-title">
            <h2>Cài đặt</h2>
          </div>
          <div className="hostel-modal-form">
            <Collapse
              items={itemCollapse}
              defaultActiveKey={""}
              style={{ backgroundColor: "#00DEB6" }}
            />
            <div style={{ marginTop: "10px" }}>
              <span style={{ marginRight: "10px" }}>Giao diện : Tối</span>
              <Switch defaultChecked size="small" />{" "}
              <span style={{ marginLeft: "10px" }}>Sáng</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ marginRight: "10px" }}>Ngôn ngữ : Anh</span>
              <Switch defaultChecked size="small" />{" "}
              <span style={{ marginLeft: "10px" }}>Việt</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MenuUser;
