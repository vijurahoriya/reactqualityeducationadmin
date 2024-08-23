import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js'
const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{
            label: 'data-1',
            data: [12, 19, 3, 17, 28, 24, 7],
            backgroundColor: "rgba(255, 0, 0, 1)"
          }, {
            label: 'data-2',
            data: [30, 29, 5, 5, 20, 3, 10],
            backgroundColor: "rgba(0, 0, 255, 1)"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }, []);

  return (
    <>
    <canvas id="barChart" ref={chartRef}></canvas>
    </>
  );
}

export default BarChart;
