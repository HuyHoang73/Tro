import { Card } from "antd";
import { Line } from "@ant-design/plots";

export default function LinePrice(props) {
  const { dataChart } = props;


  const config = {
    data: dataChart,
    xField: "date",
    yField: "price",
    color: "#00DEB6",
    label: {},
    point: {
      size: 3,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#00DEB6',
        lineWidth: 2,
      },
    }
  };
  return (
    <>
      <Card title="Giá phòng" style={{ width: "100%" }}>
        <Line {...config} />
      </Card>
    </>
  );
}
