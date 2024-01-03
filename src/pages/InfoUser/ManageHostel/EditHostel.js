import { useState, useEffect } from "react";
import Modal from "react-modal";
import swal from "sweetalert";
import { editHostel } from "../../../services/hostelServices";
import { getCity } from "../../../services/cityServices";


const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginTop: "50px",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "80vh",
    padding: "0",
    borderRadius: "10px",
  },
};

function EditHostel(props) {
  const { item, onReload } = props;
  const [values, setValues] = useState(item);
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState([]);

  function tryParseFloat(value) {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      return parsedValue;
    }
    return value;
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const parsedValue = tryParseFloat(value);
    setValues((values) => ({
      ...values,
      [name]: parsedValue,
    }));
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCity();
      if (result) {
        setCity(result);
      }
    };
    fetchApi();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      const result = await editHostel(item.id, values);
      console.log(result)
      if (result) {
        onReload();
        setIsOpen(false);

        swal({
          position: "top-end",
          icon: "success",
          title: "Đã cập nhật",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };
    fetchApi();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button className="button2 btn-edit" onClick={openModal}>
        Chỉnh sửa
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-head">
          <h3>Thông tin bài đăng</h3>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <table className="modal-table">
            <tbody>
              <tr>
                <td className="left-column">
                  <label htmlFor="title">Tiêu đề</label>
                </td>
                <td className="right-column">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    value={values.title || ""}
                    className="modal-input"
                    required
                  />
                </td>
              </tr>

              {city.length > 0 && (
                <tr>
                  <td className="left-column">
                    <label htmlFor="address">Địa chỉ</label>
                  </td>
                  <td className="right-column">
                    <select
                      name="address"
                      id="address"
                      onChange={handleChange}
                      value={values.address}
                      className="modal-select"
                      required
                    >
                      <option value="">Chọn Quận Huyện</option>
                      {city.map((item, index) => (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )}

              <tr>
                <td className="left-column">
                  <label htmlFor="acreage">Diện tích</label>
                </td>
                <td className="right-column">
                  <input
                    type="number"
                    name="acreage"
                    id="acreage"
                    onChange={handleChange}
                    value={values.acreage || ""}
                    className="modal-input"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="left-column">
                  <label htmlFor="price">Giá</label>
                </td>
                <td className="right-column">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    onChange={handleChange}
                    className="modal-input"
                    value={values.price || ""}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="left-column">
                  <label htmlFor="room">Số phòng</label>
                </td>
                <td className="right-column">
                  <input
                    type="number"
                    name="room"
                    id="room"
                    onChange={handleChange}
                    value={values.room || ""}
                    className="modal-input"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="left-column">
                  <label htmlFor="emptyroom">Số phòng trống</label>
                </td>
                <td className="right-column">
                  <input
                    type="number"
                    name="emptyroom"
                    id="emptyroom"
                    onChange={handleChange}
                    value={values.emptyroom || ""}
                    className="modal-input"
                    required
                  />
                </td>
              </tr>

              {/* <tr>
                <td className="left-column">
                  <label htmlFor="juridical">Pháp lý</label>
                </td>
                <td className="right-column">
                  <select
                    name="juridical"
                    id="juridical"
                    onChange={handleChange}
                    value={values.juridical}
                    className="modal-select"
                    required
                  >
                    <option value="Không xác định">Không xác định</option>
                    <option value="sổ đỏ">Sổ đỏ</option>
                    <option value="sổ hồng">Sổ hồng</option>
                  </select>
                </td>
              </tr> */}

              <tr>
                <td className="left-column">
                  <label htmlFor="thumbnail">Ảnh</label>
                </td>
                <td className="right-column">
                  <input
                    type="text"
                    name="thumbnail"
                    id="thumbnail"
                    className="modal-input"
                    onChange={handleChange}
                    value={values.thumbnail || ""}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="left-column">
                  <label htmlFor="description">Mô tả</label>
                </td>
                <td className="right-column">
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    className="modal-input"
                    value={values.description || ""}
                    rows={5}
                    required
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td className="left-column"></td>
                <td className="modal-button">
                  <input className="button2 btn-create" type="submit" value="Cập nhật" onClick={handleSubmit}/>
                  <button className="button2 btn-delete" onClick={closeModal}>Hủy</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}

export default EditHostel;
