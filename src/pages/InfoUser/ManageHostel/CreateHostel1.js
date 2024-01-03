import { useEffect, useState } from "react";
import swal from "sweetalert";
import { createHostel } from "../../../services/hostelServices";
import { getCookie } from "../../../helpers/cookies";
import { getCity } from "../../../services/cityServices";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Cascader,
  Upload,
} from "antd";
import "./Modal.css";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

function CreateHostel1(props) {
  const id = getCookie("id");
  console.log(id);
  const iduser = parseInt(id);
  const { onReload } = props;
  const [values, setValues] = useState({});
  const [city, setCity] = useState([]);
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
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCity();
      if (result) {
        setCity(result);
      }
    };
    fetchApi();
  }, []);

  const onFinish = (values) => {
    var arrFuncroom = [
      values.hostelLivingroom,
      values.hostelBedroom,
      values.hostelWC,
    ];
    const imageList = values.fileList.map((file) => file.url || file.thumbUrl);

    const finalValues = {
      title: values.hostelName,
      description: values.description,
      price: Number(values.hostelPrice),
      acreage: Number(values.hostelArcreage),
      address: values.hostelAddress1.concat(values.hostelAddress2),
      // address: values.hostelAddress1[2] + ", " + values.hostelAddress1[1] + ", " + values.hostelAddress1[0] + ", " + values.hostelAddress2,
      room: Number(values.hostelRoom),
      emptyroom: Number(values.hostelEmpty),
      functionroom: arrFuncroom,
      // thumbnail: values.linkImage,
      images: imageList,
      iduser: Number(id),
    };
    const fetchApi = async () => {
      const result = await createHostel(finalValues);
      if (result) {
        onReload();
        setValues({});
        setIsModalOpen(false);

        swal({
          position: "top-end",
          icon: "success",
          title: "Đã tạo thành công",
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
  const residences = city?.map((x, index) => ({
    value: x.name,
    label: x.name,
    children: x?.huyen?.map((y, index) => ({
      value: y.name,
      label: y.name,
      children: y?.xa?.map((z, index) => ({
        value: z.name,
        label: z.name,
      })),
    })),
  }));
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <button className="button2 btn-create" onClick={showModal}>
        Tạo mới
      </button>
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
            <h2>Tạo Phòng trọ</h2>
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
                <Input />
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
                <Cascader options={residences} />
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
                <Input />
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
                    <InputNumber min={1} max={500} placeholder="triệu" />
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
                    <InputNumber min={1} max={500} />
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
                    <InputNumber min={1} max={10} />
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
                    <InputNumber min={1} max={10} />
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
                    <InputNumber min={1} max={10} />
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
                    <InputNumber min={1} max={200} />
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
                    <InputNumber min={1} max={100} />
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
                <TextArea rows={4} />
              </Form.Item>

              {/* Ảnh */}
              <Form.Item
                label="Tải ảnh (Tối đa 3 ảnh)"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                  maxCount={3}
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

              {/* <Form.Item
                label="Link ảnh"
                name="linkImage"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập link!",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}

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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#55E8CD" }}
                >
                  Tạo phòng
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  style={{
                    backgroundColor: "rgb(251, 73, 73)",
                    marginLeft: "30px",
                  }}
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateHostel1;
