import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/hostel")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);
  console.log(data);

  return (
    <>
        <div className="home-header">
            Home
        </div>
        <div className="area-1200">
            {data.length > 0 && (
                <>
                    <h2 className="list-title"><b>Nhà trọ nổi bật</b></h2>
                    <ul className="list">
                        {data.map(item => (
                            <li key={item.id} className="list-item">
                                <Link>
                                <div className="list-item-image"><img src={item.thumbnail} alt="" /></div>
                                <div className="list-item-title">{item.title}</div>
                                <div className="list-item-address">{item.address}</div>
                                <span className="list-item-text">
                                    <span className="list-item-acreage"><b>{item.acreage} m<sup>2</sup></b></span>
                                    <span className="list-item-rating">{item.rating}/5</span>
                                </span>
                                <div className="list-item-price">{item.price}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    </>
  )
}

export default Home;
