import { useEffect, useMemo, useState } from "react";
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
  Modal,
  Upload,
} from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import swal from "sweetalert";

// @ts-check

function DisplayUser() {
  const id = getCookie("id");
  const [data, setData] = useState({});
  const [hostel, setHostel] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** @type - null | File */
  const [avatar, setAvatar] = useState(null);

  const avatarPreview = useMemo(() => {
    return avatar && URL.createObjectURL(new Blob([avatar]));
  }, [avatar]);

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

  const handleImageUpload = ({ file }) => {
    if (file) setAvatar(file.originFileObj);
  };

  const onFinish = (values) => {
    // const imageList = values?.fileList?.map((file) => file.url || file.thumbUrl);
    const finalValues = {
      displayName: values.name,
      gmail: values.gmail,
      phone: values.phone,
      avatar,
      id: id,
      password: "jhj",
    };
    const fetchApi = async () => {
      const result = await editUser(finalValues);
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
    console.log("Success:", finalValues);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(data);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      {data && (
        <>
          <button className="btn-display" onClick={showModal}>
            <UserOutlined />
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
                <h2>Thông tin cá nhân</h2>
              </div>
              <div className="hostel-modal-user">
                <Image
                  src={data.avatar}
                  width={200}
                  style={{ borderRadius: "50%" }}
                />
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
                    label="Tải ảnh (Tối đa 3 ảnh)"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      action=""
                      listType="picture-card"
                      maxCount={3}
                      onChange={handleImageUpload}
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Tải ảnh (Tối đa 3 ảnh)
                        </div>
                      </div>
                    </Upload>
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

export default DisplayUser;
