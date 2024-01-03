import DeleteHostel from "./DeleteHostel";
import EditHostel from "./EditHostel";
import { Link } from "react-router-dom";
import "./ManageHostel.css";

function HostelItem(props) {
  const { item, onReload } = props;

  return (
    <>
      <li key={item.id} className="user-list-hostel-item">
        <Link className="inner-user-hostel-item">
          <div className="user-list-hostel-item-image">
            <img src={item.thumbnail} alt="" />
          </div>
          <div className="user-list-hostel-item-content">
            <div className="user-list-hostel-item-title">{item.title}</div>
            <div className="user-list-hostel-item-address">{item.address}</div>
            <span className="user-list-hostel-item-text">
              <span className="user-list-hostel-item-acreage">
                <b>
                  {item.acreage} m<sup>2</sup>
                </b>
              </span>
            </span>
            <div className="user-list-hostel-item-price">{item.price} triệu</div>
            <div className="user-list-hostel-item-date">{item.Day}</div>
            <div className="user-button">
              <EditHostel item={item} onReload={onReload} />
              <DeleteHostel item={item} onReload={onReload} />
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

export default HostelItem;
