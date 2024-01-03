import { Cascader, Input, Form, Row, Col } from "antd";
import "./SearchBar.css";
import { useEffect, useState } from "react";
import { getCity } from "../../services/cityServices";

export default function SearchBar(props) {
  const [city, setCity] = useState([]);

  const { onSearch } = props;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCity();
      if (result) {
        setCity(result);
      }
    };
    fetchApi();
  }, []);

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

  const optionMinPrice = [
    {
      value: 0,
      label: "Tất cả",
    },
    {
      value: 1,
      label: "1 triệu",
    },
    {
      value: 2,
      label: "2 triệu",
    },
    {
      value: 3,
      label: "3 triệu",
    },
    {
      value: 5,
      label: "5 triệu",
    },
    {
      value: 10,
      label: "10 triệu",
    },
    {
      value: 20,
      label: "20 triệu",
    },
    {
      value: 50,
      label: "50 triệu",
    },
    {
      value: 100,
      label: "100 triệu",
    },
    {
      value: 200,
      label: "200 triệu",
    },
    {
      value: 500,
      label: "500 triệu",
    },
    {
      value: 1000,
      label: "1 tỷ",
    },
  ];

  const optionMaxPrice = [
    {
      value: 1000000,
      label: "Tất cả",
    },
    {
      value: 2,
      label: "2 triệu",
    },
    {
      value: 5,
      label: "5 triệu",
    },
    {
      value: 10,
      label: "10 triệu",
    },
    {
      value: 20,
      label: "20 triệu",
    },
    {
      value: 50,
      label: "50 triệu",
    },
    {
      value: 100,
      label: "100 triệu",
    },
    {
      value: 500,
      label: "500 triệu",
    },
    {
      value: 1000,
      label: "1 tỷ",
    },
    {
      value: 5000,
      label: "5 tỷ",
    },
    {
      value: 10000,
      label: "10 tỷ",
    },
    {
      value: 30000,
      label: "30 tỷ",
    },
  ];

  //Hàm gửi data về component cha để tìm kiếm
  const handleFinish = (value) => {
    const searchTitleValues =
      value.searchName !== undefined ? value.searchName : "";
    const searchCityValues =
      value.searchCity !== undefined ? value.searchCity : "";
    const searchMinPriceValues =
      value.searchMinPrice !== undefined ? value.searchMinPrice : 0;
    const searchMaxPricevalues =
      value.searchMaxPrice !== undefined ? value.searchMaxPrice : 1000000;
    const values = {
      City: searchCityValues,
      MinPrice: searchMinPriceValues,
      MaxPrice: searchMaxPricevalues,
      Title: searchTitleValues,
    };
    onSearch(values);
  };
  return (
    <>
      <div className="box-search">
        <Form
          name="horizontal_login"
          layout="inline"
          style={{ width: "100%" }}
          onFinish={handleFinish}
        >
          <Row style={{ width: " 100%" }}>
            <Col
              xl={{ span: 10 }}
              lg={{ span: 10 }}
            >
              <Form.Item name="searchName">
                <Input
                  placeholder="Nhập tên nhà trọ, đường, quận, huyện..."
                  style={{ width: "100%" }}
                  size="large"
                  className="Input"
                />
              </Form.Item>
            </Col>

            <Col
              xl={{ span: 6 }}
              lg={{ span: 6 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Form.Item name="searchCity">
                <Cascader
                  options={residences}
                  placeholder="Thành phố"
                  style={{ width: "100%" }}
                  popupClassName="custom-popup-city"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col
              xl={{ span: 3 }}
              lg={{ span: 3 }}
            >
              <Form.Item name="searchMinPrice">
                <Cascader
                  options={optionMinPrice}
                  placeholder="Giá thấp nhất"
                  style={{ width: "100%" }}
                  popupClassName="custom-popup-price"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col
              xl={{ span: 3 }}
              lg={{ span: 3 }}
            >
              <Form.Item name="searchMaxPrice">
                <Cascader
                  options={optionMaxPrice}
                  placeholder="Giá cao nhất"
                  style={{ width: "100%" }}
                  popupClassName="custom-popup-price"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col
              xl={{ span: 2 }}
              lg={{ span: 2 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <Form.Item>
                <input
                  type="submit"
                  value="Tìm kiếm"
                  className="button-search btn-create"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
