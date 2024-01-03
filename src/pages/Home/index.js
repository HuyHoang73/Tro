import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { getHostel } from "../../services/hostelServices";
import { Flex, Col, Row } from "antd";

function Home() {
  const [data1, setData1] = useState([]);
  const [data3, setData3] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if (windowWidth > 1400) {
  //     setMaxTitleLength(95);
  //   } else if (windowWidth > 1140) {
  //     setMaxTitleLength(80);
  //   }
  //   if (windowWidth > 992) {
  //     setMaxTitleLength(60);
  //   } else {
  //     setMaxTitleLength(50);
  //   }
  // }, [windowWidth]);

  const handleHover = () => {
    if (isHovered === true) setIsHovered(false);
    else {
      setTimeout(() => {
        setIsHovered(true);
      }, 100);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getHostel();
      if (result) {
        const hostelValues = result.slice(0, 6);
        setData1(hostelValues);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <Flex gap="middle" wrap="wrap">
        <div className="home-header">
          <div className="home-header-title">An tâm chọn. An tâm mua</div>
        </div>
        <div className="area-1200">
          <Row style={{width: "100%"}}>
            <Col span={24}>
              <div className="home-content">

                <div className="home-section">
                  {data1.length > 0 && (
                    <>
                      <h3 className="list-title">
                        <b>Nhà trọ nổi bật</b>
                      </h3>
                      <ul className="list" style={{width: "100%"}}>
                        <Row gutter={24} style={{width: "100%"}}>
                          {data1.map((item) => (
                            <Col
                              className="gutter-row"
                              xl={{ span: 4 }}
                              lg={{ span: 6 }}
                              sm={{ span: 12 }}
                              xs={{ span: 24 }}
                            >
                              <li key={item.id} className="list-item">
                                <Link to={`/hostel/${item.id}`}>
                                  <div
                                    className="list-item-image"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleHover}
                                  >
                                    <img src={item.thumbnail} alt="" />
                                    {isHovered && (
                                      <div className="info">
                                        <div className="list-item-title">
                                          {item.title}
                                        </div>
                                        <div className="list-item-text">
                                          <span className="list-item-title">
                                            <b className="list-item-title">
                                              {item.acreage} m
                                              <sup className="list-item-title">
                                                2
                                              </sup>
                                            </b>
                                          </span>
                                          <span
                                            className="list-item-title"
                                            style={{
                                              marginTop: "3px",
                                              marginLeft: "7px",
                                            }}
                                          >
                                            <div className="list-item-functionroom">
                                              {item.functionroom.map(
                                                (room, index) => (
                                                  <span
                                                    key={index}
                                                    className="functionroom-item"
                                                  >
                                                    {room}
                                                    {index !== item.functionroom.length - 1 && ' '}
                                                  </span>
                                                )
                                              )}
                                            </div>
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="footer-list-item">
                                    <div className="list-item-address">
                                      {item.address[0]}
                                    </div>
                                    <div className="list-item-price">
                                      {item.price} triệu
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            </Col>
                          ))}
                        </Row>
                      </ul>
                    </>
                  )}
                </div>

                <div className="image-body">
                  <img
                    src="https://cdn.mogi.vn/banner/2023/6_596ecbb1-376e-4e16-add0-51d6fb7fe9e9.jpg"
                    alt=""
                  />
                </div>

                <div className="home-section">
                  {data1.length > 0 && (
                    <>
                      <h3 className="list-title">
                        <b>Nhà trọ cho sinh viên</b>
                      </h3>
                      <ul className="list" style={{width: "100%"}}>
                        <Row gutter={24} style={{width: "100%"}}>
                          {data1.map((item) => (
                            <Col
                              className="gutter-row"
                              xl={{ span: 4 }}
                              lg={{ span: 6 }}
                              sm={{ span: 12 }}
                              xs={{ span: 24 }}
                            >
                              <li key={item.id} className="list-item">
                                <Link to={`/hostel/${item.id}`}>
                                  <div
                                    className="list-item-image"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleHover}
                                  >
                                    <img src={item.thumbnail} alt="" />
                                    {isHovered && (
                                      <div className="info">
                                        <div className="list-item-title">
                                          {item.title}
                                        </div>
                                        <div className="list-item-text">
                                          <span className="list-item-title">
                                            <b className="list-item-title">
                                              {item.acreage} m
                                              <sup className="list-item-title">
                                                2
                                              </sup>
                                            </b>
                                          </span>
                                          <span
                                            className="list-item-title"
                                            style={{
                                              marginTop: "3px",
                                              marginLeft: "7px",
                                            }}
                                          >
                                            1PK 2PN 2WC
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="footer-list-item">
                                    <div className="list-item-address">
                                      {item.address[0]}
                                    </div>
                                    <div className="list-item-price">
                                      {item.price} triệu
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            </Col>
                          ))}
                        </Row>
                      </ul>
                    </>
                  )}
                </div>

                <div className="home-section">
                  {data3.length > 0 && (
                    <>
                      <h3 className="list-title">
                        <b>Nhà trọ gần khu vui chơi</b>
                      </h3>
                      <ul className="list">
                        <Row gutter={24}>
                          {data1.map((item) => (
                            <Col
                              className="gutter-row"
                              xl={{ span: 4 }}
                              lg={{ span: 6 }}
                              sm={{ span: 12 }}
                              xs={{ span: 24 }}
                            >
                              <li key={item.id} className="list-item">
                                <Link to={`/hostel/${item.id}`}>
                                  <div
                                    className="list-item-image"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleHover}
                                  >
                                    <img src={item.thumbnail} alt="" />
                                    {isHovered && (
                                      <div className="info">
                                        <div className="list-item-title">
                                          {item.title}
                                        </div>
                                        <div className="list-item-text">
                                          <span className="list-item-title">
                                            <b className="list-item-title">
                                              {item.acreage} m
                                              <sup className="list-item-title">
                                                2
                                              </sup>
                                            </b>
                                          </span>
                                          <span
                                            className="list-item-title"
                                            style={{
                                              marginTop: "3px",
                                              marginLeft: "7px",
                                            }}
                                          >
                                            1PK 2PN 2WC
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="footer-list-item">
                                    <div className="list-item-address">
                                      {item.address[0]}
                                    </div>
                                    <div className="list-item-price">
                                      {item.price} triệu
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            </Col>
                          ))}
                        </Row>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Flex>
    </>
  );
}

export default Home;
