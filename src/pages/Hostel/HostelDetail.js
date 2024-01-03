import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousela from "../../components/Carousel";
import "../../PageDetail.css";
import { editHostel, getHostel, postHostelVote } from "../../services/hostelServices";
import { getUser1 } from "../../services/userServices";
import { Col, Flex, Row, Modal } from "antd";
import ThuePhong from "../ThuePhong";
import { LikeTwoTone } from "@ant-design/icons";
import { getCookie } from "../../helpers/cookies";
import SimpleMap from "../rentaler/map/MyMapComponent";
import { geocodeByAddress } from "react-google-places-autocomplete";
import swal from "sweetalert";

export default function HostelDetail() {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.id;
  const iduser = getCookie("id");
  const type = "hostel";
  const [user, setUser] = useState({});
  const [user1, setUser1] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voteList, setvoteList] = useState(false);
  const [coords, setCoords] = useState(null);
  const [dc, Setdc] = useState("");

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(({coords: {longitude, latitude}}) => {
    //   setCoords({lat: latitude, lng: longitude});
    // })
    const getCoords = async () => {
      try {
        const reversedAddress = Array.isArray(data?.address)
          ? data.address.reverse().join(", ")
          : "";
        const results = await geocodeByAddress(reversedAddress);
        if (results && results.length > 0) {
          const { geometry } = results[0];
          const { location } = geometry;
          const { lat, lng } = location;
          console.log("Latitude:", lat());
          console.log("Longitude:", lng());
          setCoords({ lat: lat(), lng: lng() });
          // Đây là nơi để bạn xử lý dữ liệu vị trí nếu cần
        } else {
          console.log("Không tìm thấy thông tin vị trí.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin vị trí:", error);
      }
    };
    data && getCoords();
  }, [data]);
  // console.log(coords)

  const dynamicStyle = {
    backgroundColor: voteList ? "white" : "#0866FF",
    color: voteList ? "#0866FF" : "white",
    padding: "10px",
    borderRadius: "7px",
    border: "1px solid #0866FF",
    marginLeft: "15px",
  };
  console.log(data);
  var voteTemp = data.vote;

  //Lấy tt trọ
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getHostel(id);
      if (result) {
        setData(result);
        const reversedAddress = Array.isArray(data?.address)
          ? data.address.reverse().join(", ")
          : "";
        Setdc(reversedAddress);
      }
    };
    fetchApi();
  }, [id]);

  //Lấy tt chủ trọ
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser1(data.iduser);
      if (result) {
        setUser(result);
      }
    };
    fetchApi();
  }, [data.iduser]);

  //Lấy tt thằng đang thao tác
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser1(iduser);
      if (result) {
        setUser1(result);
        const array = result.voteList;
        array.forEach((element) => {
          if (element === id) {
            setvoteList(true);
            return true;
          }
          return false;
        });
      }
    };
    fetchApi();
  }, [iduser]);

  const voteListClick = () => {
    setvoteList((prevValue) => !prevValue);
    const  option = {
      idtro: id,
      vote: voteList
    }
      const fetchApi = async () => {
        const result = await postHostelVote(data.id, option);
        if (result) {
          if(voteList == false) {
            swal({
              position: "top-end",
              icon: "success",
              title: "Đã hủy theo dõi",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            swal({
              position: "top-end",
              icon: "success",
              title: "Đã theo dõi",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      };
      fetchApi();
    }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex gap="middle" wrap="wrap">
        <Row>
          <Col span={24}>
            {data && (
              <>
                <section className="page-header">
                  <Row>
                    <Col
                      className="gutter-row"
                      lg={{ span: 17 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                    >
                      <div className="main-content">
                        <div>
                          <div className="main-content-header">
                            <Carousela id={params.id} type={type} />
                            <div className="main-content-title">
                              {data.title}
                            </div>
                            <div className="main-content-address">{dc}</div>
                            <div className="main-content-price">
                              {data.price} triệu đồng
                            </div>
                          </div>

                          <div className="main-content-body">
                            <h2 className="main-content-body-title">
                              Thông tin chính
                            </h2>
                            <div className="box-list-infor">
                              <ul className="list-infor">
                                <li>
                                  <div className="list-infor-title">
                                    - Diện tích sử dụng:
                                  </div>
                                  {data.acreage}m<sup>2</sup>
                                </li>
                                <li>
                                  <div className="list-infor-title">
                                    - Cấu trúc phòng:
                                  </div>
                                  {data?.functionroom &&
                                    data.functionroom.length > 0 && (
                                      <p>
                                        {data.functionroom[0]} phòng khách -{" "}
                                        {data.functionroom[1]} phòng ngủ -{" "}
                                        {data.functionroom[2]} WC
                                      </p>
                                    )}
                                </li>
                                <li>
                                  <div className="list-infor-title">
                                    - Số phòng trống:
                                  </div>
                                  {data.emptyroom}
                                </li>
                              </ul>
                            </div>
                            <h2 className="main-content-body-title">
                              Giới thiệu
                            </h2>
                            <div className="main-content-description">
                              <div>{data.description}</div>
                            </div>
                            <br />
                            <h2>Vị trí</h2>
                            <SimpleMap coords={coords} />
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col
                      span={6}
                      className="gutter-row"
                      lg={{ span: 6, offset: 1 }}
                      sm={{ span: 0 }}
                      xs={{ span: 0 }}
                    >
                      <div className="right-content">
                        <div className="side-bar">
                          <div className="side-bar-header">
                            <div className="side-bar-image">
                              <img
                                src="https://mogi.vn/content/images/avatar.png"
                                alt=""
                              />
                            </div>
                            <div className="side-bar-username">{user.name}</div>
                          </div>

                          <div className="side-bar-body">
                            <div className="side-bar-body-content">
                              <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/003/720/476/small/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg"
                                alt=""
                              />
                              <span className="text-in-button">
                                {user.phone}
                              </span>
                            </div>
                            <div className="side-bar-body-content">
                              <img
                                src="https://media.istockphoto.com/id/1172082917/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-phong-b%C3%AC-m%C3%A0u-%C4%91en-v%C3%A0-tr%E1%BA%AFng-vector-h%C3%ACnh-%E1%BA%A3nh-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-phong-b%C3%AC-%C4%91%C6%A1n-gi%E1%BA%A3n-%C4%91%E1%BB%83-in-web.jpg?s=612x612&w=is&k=20&c=HACAtPEJZ2dHDuc58hZw-HeX0k5WeC0qN94VgrcTjM8="
                                alt=""
                              />
                              <span className="text-in-button">
                                Gửi tin nhắn
                              </span>
                            </div>
                            <div
                              className="side-bar-body-content"
                              style={{ border: "none", cursor: "auto" }}
                            >
                              <button
                                className="thuephongSubmit"
                                onClick={showModal}
                              >
                                Thuê phòng
                              </button>

                              <button
                                className="btn-like"
                                style={dynamicStyle}
                                onClick={voteListClick}
                              >
                                Thích <LikeTwoTone />
                              </button>

                              <Modal
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                style={{
                                  marginTop: "-50px",
                                  paddingTop: "-100px",
                                }}
                              >
                                <ThuePhong id={id} />
                              </Modal>
                            </div>
                          </div>
                        </div>
                        <div></div>

                        <div className="banner-detail">
                          <img
                            src="https://cdn.mogi.vn/banner/2023/7_a141dae1-1800-4c15-8f0b-7c5bb6f4c31f.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </section>
              </>
            )}
          </Col>
        </Row>
      </Flex>
    </>
  );
}
