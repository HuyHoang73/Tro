import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookies";
import { getHostel } from "../../../services/hostelServices";
import "./UserHome.css";
import Logout from "../../Logout";
import { editUser, getUser1 } from "../../../services/userServices";
import {
  Flex,
  Col,
  Row,
  Image,
  Input,
  Form,
  Button,
  Upload,
  Modal,
} from "antd";
import {
  EditOutlined,
} from "@ant-design/icons";
import swal from "sweetalert";

function UpdateUser() {
  const id = getCookie("id");
  const [data, setData] = useState({});
  const [hostel, setHostel] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Lấy tt thg đang thao tác
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser1(id);
      if (result) {
        setData(result);
      }
    };
    fetchApi();
  }, [id]);

  //Lấy ds trọ của thg đang thao tác
  const fetchApi = async () => {
    const iduser = parseInt(getCookie("id"));
    const result = await getHostel();
    const finalResult = result.filter((item) => item.iduser === iduser);
    setHostel(finalResult);
  };
  console.log(hostel);

  useEffect(() => {
    fetchApi();
  }, []);
  const onFinish = (values) => {
    const finalValues = {
        name: values.name,
        gmail: values.gmail,
        phone: values.phone
      };
      const fetchApi = async () => {
        const result = await editUser(data.id, finalValues);
        if (result) {
            const fetchApi = async () => {
                const result = await getUser1(id, finalValues);
                if (result) {
                  setData(result);
                }
              };
              fetchApi();
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
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(data);
  const totalVote = hostel.reduce((total, current) => total + current.vote, 0);
  return (
    <>
      {data && (
        <>
          <button
            className="icon-footer"
            style={{ backgroundColor: "rgb(40, 143, 252)" }}
            onClick={showModal}
          >
            <EditOutlined />
          </button>

          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={<></>}
            style={{
              marginTop: "-50px",
              paddingTop: "-100px",
            }}
          >
            <div className="hostel-modal">
              <div className="hostel-modal-title">
                <h2>Cập nhật thông tin cá nhân</h2>
              </div>
              <div className="hostel-modal-form">
                <Form
                  name="basic"
                  layout="vertical"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
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
                  {/* tên phòng trọ */}
                  <Form.Item label="Họ và tên" name="name">
                    <Form.Item
                      name="name"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập họ và tên!",
                        },
                      ]}
                      initialValue={data.name}
                    >
                      <Input
                        defaultValue={data.name}
                        style={{ color: "black" }}
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item label="Gmail" name="gmail">
                    <Form.Item
                      name="gmail"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập gmail!",
                        },
                      ]}
                      initialValue={data.gmail}
                    >
                      <Input
                        defaultValue={data.gmail}
                        style={{ color: "black" }}
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item label="Số điện thoại" name="phone">
                    <Form.Item
                      name="phone"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập Số điện thoại!",
                        },
                      ]}
                      initialValue={data.phone}
                    >
                      <Input
                        defaultValue={data.phone}
                        style={{ color: "black" }}
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      span: 24,
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default UpdateUser;
