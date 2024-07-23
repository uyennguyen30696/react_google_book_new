import { useState, useEffect } from 'react';
import API from '../utils/API';
import PieChart from '../components/PieChart/PieChart';
import BarChart from '../components/BarChart/BarChart';
import './styling/statistics.css';

const Statistics = () => {
    const [categoriesData, setCategoriesData] = useState({});
    const [authorsData, setAuthorsData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await API.getSavedBooks();
                const books = response.data;
                const categoriesCount = {};
                const authorsCount = {};

                // Count the number of books in each category
                books.forEach((book) => {
                    book.categories.forEach((category) => {
                        categoriesCount[category] = (categoriesCount[category] || 0) + 1;
                    });

                    // Count the number of books by each author (taking only the first author if multiple)
                    const firstAuthor = book.authors[0];
                    if (firstAuthor) {
                        authorsCount[firstAuthor] = (authorsCount[firstAuthor] || 0) + 1;
                    }
                });

                // Get top 10 categories
                const topCategories = Object.entries(categoriesCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10);

                // Get top 10 authors
                const topAuthors = Object.entries(authorsCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10);

                const colorPalette = [
                    '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', 
                    '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ac'
                ];

                setCategoriesData({
                    labels: topCategories.map(([category]) => category),
                    datasets: [
                        {
                            data: topCategories.map(([, count]) => count),
                            backgroundColor: colorPalette,
                        },
                    ],
                });

                setAuthorsData({
                    labels: topAuthors.map(([author]) => author),
                    datasets: [
                        {
                            data: topAuthors.map(([, count]) => count),
                            backgroundColor: colorPalette,
                        },
                    ],
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="statistics-container">
            <h2>Your Statistics</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="charts-row">
                    <div className="chart-column">
                        <PieChart data={categoriesData} title="Top 10 Book Categories" />
                        <BarChart data={categoriesData} title="Top 10 Book Categories" />
                    </div>
                    <div className="chart-column">
                        <PieChart data={authorsData} title="Top 10 Authors" />
                        <BarChart data={authorsData} title="Top 10 Authors" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;
