import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookies";
import { getUser1 } from "../../../services/userServices";
import { HistoryOutlined } from "@ant-design/icons";
import { Image, Modal, Table } from "antd";
import { getHostel } from "../../../services/hostelServices";
import { getCity } from "../../../services/cityServices";
import { Link } from "react-router-dom";

export default function VoteHistory() {
  const id = getCookie("id");
  const [user, setUser] = useState({});
  const [voteL, setVoteL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hostels, setHostels] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser1(id);
      if (result) {
        setUser(result);
        setVoteL(result.voteList.join(","));
      }
    };
    fetchApi();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //Lấy ds tro
  const fetchApi = async () => {
    const result = await getHostel();
    const filteredHostels = result.filter((hostel) =>
    user.voteList.includes(hostel.id)
  ); 
    setHostels(filteredHostels);
  };
  console.log(hostels)
  const fetchApi1 = async () => {
    const result = await getCity();
    setCity(result);
  };

  useEffect(() => {
    fetchApi();
    fetchApi1();
  }, []);
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

  const data = hostels.map((x, index) => ({
    key: `${x + 1}`,
    image: <Image src={x.thumbnail} width={100} />,
    name: x.title,
    address: x.address[2] + ", " + x.address[1] + ", " + x.address[0],
    price: x.price,
    acreage: x.acreage,
    room: x.room,
    like: x.vote,
    action: <Link to={`/hostel/${x.id}`} className="btn-group">Xem chi tiết</Link>,
  }));
  return (
    <>
      <button className="btn-display" onClick={showModal}>
        <HistoryOutlined />
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        style={{
          marginTop: "-50px",
          paddingTop: "-100px",
        }}
        footer=""
      >
        <div className="hostel-modal">
          <div className="hostel-modal-title">
            <h2>Lịch sử theo dõi</h2>
          </div>
          <div className="hostel-modal-form">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </Modal>
    </>
  );
}
