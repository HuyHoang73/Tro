import swal from "sweetalert";
import { deleteHostel } from "../../../services/hostelServices";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteHostel(props) {
  const { item, onReload } = props;

  const handleDelete = () => {
    swal({
      title: "Bạn muốn xóa phòng trọ?",
      text: "Nếu xóa sẽ không thể khôi phục",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const fetchApi = async () => {
          const result = await deleteHostel(item.id);
          if (result) {
            swal("Đã xóa thành công", {
              icon: "success",
            });
            onReload();
          }
        };
        fetchApi();
      } else {
        swal("Hủy");
      }
    });
    console.log(item.id);
  };

  return (
    <>
      <button className="icon-footer" style={{backgroundColor: "rgb(251, 73, 73)"}} onClick={handleDelete}><DeleteOutlined /></button>
    </>
  );
}

export default DeleteHostel;
