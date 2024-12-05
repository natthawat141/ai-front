'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompareStocksPage = () => {
  // Mock data for stock prices over 3 weeks (15 trading days)
  const dates = [
    'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5',
    'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10',
    'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15',
  ];

  const stockData = {
    TISCO: [91, 92, 93, 94, 92, 93, 94, 95, 96, 95, 94, 93, 92, 93, 94],
    KBANK: [150, 151, 152, 153, 154, 155, 154, 153, 152, 151, 152, 153, 154, 153, 152],
    SCB: [125, 126, 127, 128, 129, 128, 127, 126, 125, 126, 127, 128, 127, 126, 125],
  };

  // Prepare data for the graph
  const graphData = {
    labels: dates,
    datasets: [
      {
        label: 'TISCO.BK',
        data: stockData.TISCO,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'KBANK.BK',
        data: stockData.KBANK,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'SCB.BK',
        data: stockData.SCB,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: 'Stock Price Comparison Over 2 Weeks',
        color: '#fff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Stock Price Comparison</h1>
      <div className="bg-gray-800 p-4 rounded-lg h-[600px] w-[1200px]">
        <Line data={graphData} options={graphOptions} />
      </div>
    </div>
  );
};

export default CompareStocksPage;
