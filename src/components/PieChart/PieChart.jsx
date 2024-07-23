import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './pieChart.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data, title }) => {
    return (
        <div className="chart-container">
            <Doughnut 
                data={data} 
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                            font: {
                                size: 18,
                            },
                            padding: {
                                top: 10,
                                bottom: 20,
                            },
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                boxWidth: 10,
                            },
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    hover: {
                        mode: 'index',
                        intersect: false,
                        animationDuration: 400,
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                }}
            />
        </div>
    );
};

export default PieChart;
