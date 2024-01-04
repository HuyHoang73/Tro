import { useEffect, useState } from "react";
import CreateHostel1 from "./CreateHostel1";
// import HostelItem from "./HostelItem";
import { getCookie } from "../../../helpers/cookies";
import { getHostel } from "../../../services/hostelServices";
import { Link } from "react-router-dom";
import { Flex, Col, Row, Table, Image } from "antd";
import "./ManageHostel.css";
import "./Modal.css"
import { HomeOutlined, LikeOutlined } from "@ant-design/icons";
import DisplayHostel from "./DisplayHostel";
import EditHostel1 from "./EditHostel1";
import DeleteHostel from "./DeleteHostel";
import { getCity } from "../../../services/cityServices";

function ManageHostel() {
  const [hostels, setHostels] = useState([]);
  const idrole = parseInt(getCookie("idrole"));
  const [city, setCity] = useState([]);
  var role = {};
  if (idrole === 2) {
    role = { idrole: 2 };
  } else {
    role = undefined;
  }
  const totalVote = hostels.reduce((total, current) => total + current.vote, 0);
  //Lấy dstro
  const fetchApi = async () => {
    const iduser = parseInt(getCookie("id"));
    const result = await getHostel();
    const finalResult = result.filter((item) => item.iduser === iduser);
    setHostels(finalResult.reverse());
  };
  const fetchApi1 = async () => {
    const result = await getCity();
    setCity(result);
  };

  useEffect(() => {
    fetchApi();
    fetchApi1();
  }, []);

  const handleReload = () => {
    fetchApi();
  };
  const filterCity = city.map((city) => ({
    text: city.name,
    value: city.name,
  }));

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Tên trọ",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      filters: filterCity,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Giá phòng",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      align: "center",
    },
    {
      title: "Diện tích",
      dataIndex: "acreage",
      sorter: (a, b) => a.acreage - b.acreage,
      align: "center",
    },
    {
      title: "Số phòng",
      dataIndex: "room",
      sorter: (a, b) => a.room - b.room,
      align: "center",
    },
    {
      title: "Số lượt thích",
      dataIndex: "like",
      sorter: (a, b) => a.like - b.like,
      align: "center",
    },
    {
      title: "Quản lý",
      dataIndex: "action",
      align: "center",
    },
  ];

  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];
  const data = hostels.map((x, index) => ({
    key: `${x + 1}`,
    image: <Image src={x.thumbnail} width={100} />,
    name: x.title,
    address: x.address[2] + ", " + x.address[1] + ", " + x.address[0],
    price: x.price,
    acreage: x.acreage,
    room: x.room,
    like: x.vote,
    action: (
      <div className="btn-group">
        <DisplayHostel item={x} onReload={handleReload} />
        <EditHostel1 item={x} onReload={handleReload} />
        <DeleteHostel item={x} onReload={handleReload} />
      </div>
    ),
  }));
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Flex gap="middle" wrap="wrap">
        <div className="area-1200">
          <div className="inner-area-1200">
            <div className="hostelpage-title">
              <h2>Phòng trọ của tôi</h2>
            </div>
            <Row>
              <Col span={24}>
                <div className="home-section">
                  {hostels.length > 0 && (
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
                            <div className="box-dashboard"
                            style={{
                              backgroundColor: "rgb(231, 248, 158)",
                            }}>
                              <div className="box-dashboard-left">
                                <div className="text-box-dashboard">
                                  {hostels.length}
                                </div>
                                <div className="text-box-dashboard1">
                                  Số nhà trọ
                                </div>
                              </div>
                              <div className="box-dashboard-right">
                                <HomeOutlined style={{ fontSize: "30px" }} />
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
                                <LikeOutlined style={{ fontSize: "30px" }} />
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
            <div className="hostelpage-title">
              <h2>Danh sách phòng trọ</h2>
            </div>
            <CreateHostel1 onReload={handleReload} />
            <div style={{ clear: "both" }}></div>
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </Flex>
    </>
  );
}

export default ManageHostel;
