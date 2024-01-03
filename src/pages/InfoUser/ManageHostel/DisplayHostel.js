import { EyeOutlined } from "@ant-design/icons";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Cascader,
  Upload,
  Tabs,
  Image,
} from "antd";
import "./Modal.css";
import { useState } from "react";
import { getCookie } from "../../../helpers/cookies";
import TextArea from "antd/es/input/TextArea";
import EditHostel1 from "./EditHostel1";
import DeleteHostel from "./DeleteHostel";
import { Card } from "antd";
import { Line } from "@ant-design/plots";

export default function DisplayHostel(props) {
  const id = getCookie("id");
  const iduser = parseInt(id);
  const { item, onReload } = props;
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
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const itemsSubTab =
    item?.statistical?.map((x, index) => ({
      key: index.toString(),
      label: x.year.toString(),
      children: (
        <>
          <Card style={{ width: "100%" }}>
            <Line
              {...{
                data: item.statistical.find((item) => item.year === x.year)
                  .option,
                xField: "month",
                yField: "price",
                color: "#00DEB6",
                label: {},
                point: {
                  size: 3,
                  shape: "circle",
                  style: {
                    fill: "white",
                    stroke: "#00DEB6",
                    lineWidth: 2,
                  },
                },
              }}
            />
          </Card>
        </>
      ),
    })) || [];

  const itemsSubTab2 =
    item?.statistical?.map((x, index) => ({
      key: index.toString(),
      label: x.year.toString(),
      children: (
        <>
          <Card style={{ width: "100%" }}>
            <Line
              {...{
                data: item.statistical.find((item) => item.year === x.year)
                  .option,
                xField: "month",
                yField: "vote",
                color: "#00DEB6",
                label: {},
                point: {
                  size: 3,
                  shape: "circle",
                  style: {
                    fill: "white",
                    stroke: "#00DEB6",
                    lineWidth: 2,
                  },
                },
              }}
            />
          </Card>
        </>
      ),
    })) || [];

  const itemsMainTab = [
    {
      key: "1",
      label: "Giá phòng",
      children: <Tabs defaultActiveKey="1" items={itemsSubTab} />,
    },
    {
      key: "2",
      label: "Số lượt thích",
      children: <Tabs defaultActiveKey="1" items={itemsSubTab2} />,
    } 
  ];

  const createResidences = [
    {
      value: item.address[0],
      label: item.address[0],
      children: [
        {
          value: item.address[1],
          label: item.address[1],
          children: [
            {
              value: item.address[2],
              label: item.address[2],
            },
          ],
        },
      ],
    },
  ];
  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };
  return (
    <>
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
        width={1000}
        footer={
          <>
            <div>
              <EditHostel1 item={item} onReload={onReload} />
              <DeleteHostel item={item} onReload={onReload} />
            </div>
          </>
        }
        style={{
          marginTop: "-50px",
          paddingTop: "-100px",
        }}
      >
        <div
          className="hostel-modal"
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "16px",
          }}
        >
          <div style={{ flex: 1, marginRight: "20px" }}>
            <div className="hostel-modal-title">
              <h2>Thông tin Phòng trọ</h2>
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
                disabled
              >
                {/* tên phòng trọ */}
                <Form.Item
                  label="Tên trọ"
                  name="hostelName"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên phòng trọ!",
                    },
                  ]}
                >
                  <Input defaultValue={item.title} style={{ color: "black" }} />
                </Form.Item>

                {/* Địa chỉ */}
                <Form.Item
                  name="hostelAddress1"
                  label="Thành phố / Quận / Xã"
                  rules={[
                    {
                      type: "array",
                      required: true,
                      message: "Hãy chọn thành phố!",
                    },
                  ]}
                >
                  <Cascader
                    options={createResidences}
                    defaultValue={item.address.slice(0, 3)}
                  />
                </Form.Item>

                {/* Địa chỉ 2 */}
                <Form.Item
                  label="Đường"
                  name="hostelAddress2"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên đường!",
                    },
                  ]}
                >
                  <Input
                    defaultValue={item.address[3]}
                    style={{ color: "black" }}
                  />
                </Form.Item>

                {/* giá + diện tích */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ flex: 1, marginRight: "8px" }}>
                    <Form.Item
                      label="Giá"
                      name="hostelPrice"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập diện tích phòng!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={500}
                        placeholder="triệu"
                        defaultValue={item.price}
                        style={{ color: "black" }}
                      />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      label="Diện tích"
                      name="hostelArcreage"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập diện tích phòng!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={500}
                        defaultValue={item.acreage}
                        style={{ color: "black" }}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Khách + ngủ + WC */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ flex: 1, marginRight: "8px" }}>
                    <Form.Item
                      label="Số phòng khách"
                      name="hostelLivingroom"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập số phòng khách!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={item.functionroom[0]}
                      />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      label="Số phòng ngủ"
                      name="hostelBedroom"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập số phòng ngủ!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={item.functionroom[1]}
                      />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      label="Số WC"
                      name="hostelWC"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập số WC!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={item.functionroom[2]}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* tổng phòng + phòng trống */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ flex: 1, marginRight: "8px" }}>
                    <Form.Item
                      label="Tổng số phòng"
                      name="hostelRoom"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập tổng số phòng!",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={200} defaultValue={item.room} />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      label="Số phòng trống"
                      name="hostelEmpty"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập số phòng trống!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={100}
                        defaultValue={item.emptyroom}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Mô tả */}
                <Form.Item
                  label="Mô tả"
                  name="description" // Đặt name để liên kết với quy tắc kiểm tra
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mô tả!",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    defaultValue={item.description}
                    style={{ color: "black" }}
                  />
                </Form.Item>

                {/* Ảnh */}
                {/* <Form.Item
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              </Form.Item> */}

                <Form.Item label="Ảnh phòng trọ">
                  <Form.Item name="preview" valuePropName="fileList" noStyle>
                    <Image.PreviewGroup>
                      {item.images.map((x) => (
                        <Image src={x} width={200} />
                      ))}
                    </Image.PreviewGroup>
                  </Form.Item>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <Tabs defaultActiveKey="1" items={itemsMainTab} />,
          </div>
        </div>
      </Modal>
    </>
  );
}
