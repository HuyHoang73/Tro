import { Card } from "antd";
import { Column } from "@ant-design/plots";

export default function ColumnRoom(props) {
  const { dataChart } = props;
  const paletteSemanticRed = "#F4664A";
  const brandColor = "#00DEB6";

  const config = {
    data: dataChart.statistical,
    xField: "date",
    yField: "room",
    color: ({ date }) => {
      if (date === "08-2023" || date === "02-2023") {
        return paletteSemanticRed;
      }
      return brandColor;
    },
  };
  return (
    <>
      <Card title="Số phòng đã cho thuê" style={{ width: "100%" }}>
        <Column {...config} />
      </Card>
    </>
  );
}
