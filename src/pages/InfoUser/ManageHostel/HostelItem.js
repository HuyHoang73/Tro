import DeleteHostel from "./DeleteHostel";
import EditHostel from "./EditHostel";
import { Link } from "react-router-dom";
import "./ManageHostel.css";
import ColumnRoom from "../../../components/Charts/ColumnRoom";
import ColumnPrice from "../../../components/Charts/ColumnPrice";
import { Tabs, Collapse } from "antd";

function HostelItem(props) {
  const { item, onReload } = props;

  const itemsTab = [
    {
      key: "1",
      label: "Số phòng trọ cho thuê",
      children: <ColumnRoom dataChart={item} />,
    },
    {
      key: "2",
      label: "Giá phòng",
      children: <ColumnPrice dataChart={item} />,
    },
  ];

  const itemCollapse = [
    {
      key: "1",
      label: "Xem thống kê",
      children: <Tabs defaultActiveKey="1" items={itemsTab} />,
    },
  ];

  return (
    <>
      <div className="out-user-list-hostel-item">
        <li key={item.id} className="user-list-hostel-item">
          <Link className="inner-user-hostel-item">
            <div className="user-list-hostel-item-image">
              <img src={item.thumbnail} alt="" />
            </div>
            <div className="user-list-hostel-item-content">
              <div className="user-list-hostel-item-title">{item.title}</div>
              <div className="user-list-hostel-item-address">
                {item.address}
              </div>
              <span className="user-list-hostel-item-text">
                <span className="user-list-hostel-item-acreage">
                  <b>
                    {item.acreage} m<sup>2</sup>
                  </b>
                </span>
              </span>
              <div className="user-list-hostel-item-price">
                {item.price} triệu
              </div>
              <div className="user-list-hostel-item-date">{item.Day}</div>
              <div className="user-button">
                <EditHostel item={item} onReload={onReload} />
                <DeleteHostel item={item} onReload={onReload} />
              </div>
            </div>
          </Link>
        </li>
        <div className="chart-area">
          <div className="show-chart">
            <Collapse items={itemCollapse} accordion  defaultActiveKey={[]} style={{backgroundColor: "#00DEB6", textAlign:"center"}} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HostelItem;
