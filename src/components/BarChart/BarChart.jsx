import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './barChart.css';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const BarChart = ({ data, title }) => {
    const options = {
        indexAxis: 'y',
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
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    autoSkip: false,
                },
            },
        },
        elements: {
            bar: {
                barThickness: 20, // Adjust this value to make the bars thicker
            },
        },
    };

    return (
        <div className="bar-chart-container" style={{ maxWidth: '800px', height: '500px', margin: '0 auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
