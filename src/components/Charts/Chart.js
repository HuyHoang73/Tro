import { Line } from "@ant-design/plots";

export default function Chart(props) {
    const { dataChart } = props;

    const COLOR_PLATE_10 = [
        '#5B8FF9',
        '#5AD8A6',
        '#5D7092',
        '#F6BD16',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#269A99',
        '#FF99C3',
      ];
      const container = document.getElementById('container');
      const config = {
        dataChart,
        xField: 'Th',
        yField: 'value',
        seriesField: 'category',
        yAxis: {
          label: {
            // 数值格式化为千分位
            formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
          },
        },
        color: COLOR_PLATE_10,
        point: {
          shape: ({ category }) => {
            return category === 'Gas fuel' ? 'square' : 'circle';
          },
          style: ({ year }) => {
            return {
              r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
            };
          },
        },
      };
    
      return <Line {...config} />;
}