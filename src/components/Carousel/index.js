import { useEffect, useState } from "react";
import { Carousel } from 'antd';
import "./Carosel.css";
import { getImage } from "../../services/postServices";

export default function Carousela(props) {
  const { id, type } = props;
  const [images, setimages] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getImage(type, id);
      if (result) {
        setimages(result.images)
      }
    };
    fetchApi();
  }, [type, id]);
  
  return (
    <>
      {Array.isArray(images) && images.length > 0 && (
        <>
          <Carousel autoplay>
            {images.map((item, index) => (
                <div className="box-img">
                  <div className="caro-img">
                    <img src={item} alt="" />
                  </div>
                </div>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
}
