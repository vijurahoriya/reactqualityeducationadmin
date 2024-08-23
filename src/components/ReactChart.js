import axios from "axios";
import React, { useEffect, useState } from "react";
import ApexCharts from 'react-apexcharts';
const ReactChart = () => {
  // https://datausa.io/api/data?drilldowns=Nation&measures=Population
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        console.log("response", response.data.data);
        setChartData(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
  };

  const options = {
    chart: {
      id: "population-chart",
      type: "donut",
    },
    xaxis: {
      categories: chartData.map((item) => item.Year),
    },
    yaxis: {
      title: {
        text: "Population",
      },
    },
    title: {
      text: 'Population Over Time',
      align: 'center'
    }
  };

  const series = [
    {
      name: "Population",
      data: chartData.map(item => item.Population),
    },
  ];
  return (
    <>
      <section className="main-sec">
        <h1>ReactChart</h1>
        <ApexCharts options={options} series={series} type="bar" width={1000} height={350} />
      </section>
    </>
  );
};

export default ReactChart;
