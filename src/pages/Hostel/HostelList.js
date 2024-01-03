import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { getHostel, postHostelSearch } from "../../services/hostelServices";
import { Flex, Col, Row } from "antd";
import "./Hostel.css";

function Hostelhostel() {
  const [data, setData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

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
        setData(result);
      }
    };
    fetchApi();
  }, []);

  const handleSearch = (formData) => {
    console.log(formData)
    const title = formData.Title[0];
    const city = formData.City[0];
    const minprice = Number(formData.MinPrice[0])
    const maxprice = Number(formData.MaxPrice[0])
    const option = {
      title: title,
      address: city,
      minprice: minprice,
      maxprice: maxprice
    }
    const fetchApi = async () => {
      const result = await postHostelSearch(option);
      if (result) {
        setData(result)
      }
    };
    fetchApi();
  };
  return (
    <>
      <Flex gap="middle" wrap="wrap">
        <div className="area-1200">
          <div className="inner-area-1200">
            <SearchBar onSearch={handleSearch} />
            <div className="hostelpage-title">
              <h2>Hệ thống nhà trọ uy tín, chất lượng</h2>
            </div>

            <Row>
              <Col span={24}>
                <div className="home-section">
                  {data.length > 0 && (
                    <>
                      <ul className="hostel">
                        <Row gutter={24}>
                          {data.map((item) => (
                            <Col
                              className="gutter-row"
                              xl={{ span: 6 }}
                              lg={{ span: 8 }}
                              sm={{ span: 12 }}
                              xs={{ span: 24 }}
                            >
                              <li key={item.id} className="hostel-item">
                                <Link to={`/hostel/${item.id}`}>
                                  <div
                                    className="hostel-item-image"
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleHover}
                                  >
                                    <img src={item.thumbnail} alt="" />
                                    {isHovered && (
                                      <div className="info">
                                        <div className="hostel-item-title">
                                          {item.title}
                                        </div>
                                        <div className="hostel-item-text">
                                          <span className="hostel-item-title">
                                            <b className="hostel-item-title">
                                              {item.acreage} m
                                              <sup className="hostel-item-title">
                                                2
                                              </sup>
                                            </b>
                                          </span>
                                          <span
                                            className="hostel-item-title"
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
                                  <div className="footer-hostel-item">
                                    <div className="hostel-item-address">
                                      {item.address[0]}
                                    </div>
                                    <div className="hostel-item-price">
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
              </Col>
            </Row>
          </div>
        </div>
      </Flex>
    </>
  );
}
export default Hostelhostel;
