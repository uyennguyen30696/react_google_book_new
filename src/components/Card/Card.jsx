import React, { useState } from 'react';
import './card.css';

const Card = ({ title, authors, categories, publishedDate, pageCount, link, description, image, Button }) => {
    const [expanded, setExpanded] = useState(false);

    // Set the number of characters to show before truncating
    const previewLength = 300;

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    // Shorten description based on preview length
    const truncatedDescription = description.length > previewLength 
        ? description.substring(0, previewLength) + "..." 
        : description;

    return (
        <div className="card">
            <div className="card-row">
                <div className="card-image">
                    <img alt={title} src={image} />
                </div>
                <div className="card-info">
                    <h4>{title}</h4>
                    <p>Authors: {authors}</p>
                    <p>Categories: {categories}</p>
                    <p>Published on: {publishedDate}</p>
                    <p>Page count: {pageCount}</p>
                    <a href={link} target="_blank" rel="noreferrer">
                        View on Google Books
                    </a>
                    <br></br>
                    <br></br>
                    <p className="card-description">
                        {expanded ? description : truncatedDescription}
                    </p>
                    <button className="toggle-btn" onClick={toggleDescription}>
                        {expanded ? 'Read Less' : 'Read More'}
                    </button>
                </div>
                <div className="card-button">
                    <Button />
                </div>
            </div>
        </div>
    );
};

export default Card;
