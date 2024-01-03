import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookies";
import { getHostel } from "../../../services/hostelServices";
import "./UserHome.css";
import Logout from "../../Logout";
import { getUser1 } from "../../../services/userServices";
import {
  Flex,
  Col,
  Row,
  Image,
  Cascader,
  Input,
  Form,
  Button,
  Modal,
} from "antd";
import { EyeOutlined, HomeOutlined, LikeOutlined } from "@ant-design/icons";
import UpdateUser from "./updateUser";

function UserHome() {
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
          <Flex gap="middle" wrap="wrap">
            <div className="area-1200">
              <div className="inner-area-1200">
                <div className="hostelpage-title" style={{ textAlign: "left" }}>
                  <h2>Tổng quan</h2>
                </div>
                <Row>
                  <Col span={24}>
                    <div className="home-section">
                      {hostel.length > 0 && (
                        <>
                          <ul className="hostel" style={{ width: "100%" }}>
                            <Row gutter={0} style={{ width: "100%" }}>
                              <Col
                                className="gutter-row"
                                xl={{ span: 4 }}
                                lg={{ span: 6 }}
                                sm={{ span: 12 }}
                                xs={{ span: 24 }}
                              >
                                <div className="box-dashboard">
                                  <div className="box-dashboard-left">
                                    <div className="text-box-dashboard">
                                      {hostel.length}
                                    </div>
                                    <div className="text-box-dashboard1">
                                      Số nhà trọ
                                    </div>
                                  </div>
                                  <div className="box-dashboard-right">
                                    <HomeOutlined
                                      style={{ fontSize: "30px" }}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col
                                className="gutter-row"
                                xl={{ span: 4, offset: 1 }}
                                lg={{ span: 6 }}
                                sm={{ span: 12 }}
                                xs={{ span: 24 }}
                              >
                                <div
                                  className="box-dashboard"
                                  style={{
                                    backgroundColor: "rgb(146, 234, 245)",
                                  }}
                                >
                                  <div className="box-dashboard-left">
                                    <div className="text-box-dashboard">
                                      {totalVote}
                                    </div>
                                    <div className="text-box-dashboard1">
                                      Tổng số lượt thích
                                    </div>
                                  </div>
                                  <div className="box-dashboard-right">
                                    <LikeOutlined
                                      style={{ fontSize: "30px" }}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </ul>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>

                <div className="hostelpage-title" style={{ textAlign: "left" }}>
                  <h2>Thông tin cá nhân</h2>
                </div>
                <span className="box-info-user" style={{ marginTop: "20px" }}>
                  <button
                    className="icon-footer"
                    style={{ backgroundColor: "rgb(40, 143, 252)" }}
                    onClick={showModal}
                  >
                    <EyeOutlined />
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
                  <UpdateUser />
                </span>
              </div>
            </div>
          </Flex>
          <div className="box-logout">
            <Logout />
          </div>
        </>
      )}
    </>
  );
}

export default UserHome;
{
  /* <Form
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
                      marginTop: "35px",
                    }}
                    initialValues={{
                      username: data.name,
                      gmail: data.gmail,
                      phone: data.phone,
                      remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    disabled
                  >
                    <Form.Item label="Ảnh đại diện">
                      <Form.Item
                        name="preview"
                        valuePropName="fileList"
                        noStyle
                      >
                        <Image.PreviewGroup>
                          <Image src={data.avatar} width={200} />
                        </Image.PreviewGroup>
                      </Form.Item>
                    </Form.Item>

                    <Form.Item
                      label="Họ và tên"
                      name="username"
                      initialValue={data.name}
                    >
                      <Input style={{ color: "black" }} />
                    </Form.Item>

                    <Form.Item
                      label="Họ và tên"
                      name="gmail"
                      initialValue={data.gmail}
                    >
                      <Input style={{ color: "black" }} />
                    </Form.Item>

                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      initialValue={data.phone}
                    >
                      <Input style={{ color: "black" }} />
                    </Form.Item>
                  </Form> */
}
