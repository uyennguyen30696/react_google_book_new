import { useState, useEffect } from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Card from '../components/Card/Card';
import API from '../utils/API';

import { InputGroup, FormControl, Button } from 'react-bootstrap';
import './styling/home.css';
import { FaTimes } from 'react-icons/fa';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('Search for books to begin!');
    const [searchTriggered, setSearchTriggered] = useState(false);  
    const [savedBooks, setSavedBooks] = useState([]); // Track saved books with addedDate

    // Fetch saved books when component mounts
    useEffect(() => {
        API.getSavedBooks()
            .then((res) => {
                setSavedBooks(res.data); // Set saved books including addedDate
            })
            .catch((err) => console.log(err));
    }, []);

    const search = () => {
        if (searchTriggered) return; // Prevent duplicate calls when hitting "Enter" button

        setSearchTriggered(true);
        API.getBooks(input)
            .then((res) => {
                console.log('API data', res.data.items);
                setBooks(res.data.items);
                setMessage(res.data.items.length === 0 ? 'No book matches your search!' : '');
            })
            .catch((err) => {
                console.log(err);
                setMessage('No book matches your search!');
                setBooks([]);
            })
            .finally(() => {
                setSearchTriggered(false); 
            });
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleClearInput = () => {
        setInput(''); // Clear the input field
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        search();
    };

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault(); // Prevent form submission on Enter key
            search();
        }
    };

    const handleBookSave = (id) => {
        const book = books.find((book) => book.id === id);
        const addedDate = new Date().toISOString(); // Get the current date and time in ISO format
        console.log('Date', addedDate);

        API.addBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            link: book.volumeInfo.infoLink,
            image: book.volumeInfo.imageLinks.thumbnail,
            description: book.volumeInfo.description,
            addedDate: addedDate // Include addedDate in the request payload
        })
            .then(() => {
                API.getSavedBooks()
                    .then((res) => setSavedBooks(res.data)) // Update savedBooks with addedDate
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='home'>
            <Jumbotron />

            <div className='search-container'>
                <form onSubmit={handleFormSubmit}>
                    <InputGroup className='mb-3'>
                        <FormControl
                            className='input-with-white-right-border'
                            placeholder='Search books...'
                            aria-label='Search books'
                            aria-describedby='search-button'
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKey}
                            value={input}
                        />
                        {input && ( // Show clear button only if there's text in the input
                        <Button
                            className='clear-btn'
                            variant='outline-secondary'
                            onClick={handleClearInput}
                        >
                            <FaTimes />
                        </Button>
                        )}
                        <Button
                            className='search-btn'
                            variant='outline-secondary'
                            type='submit'
                            aria-label='Search'
                            id='search-button'
                        >
                            Search
                        </Button>
                    </InputGroup>
                </form>
            </div>

            <div>
                {books.length ? (
                    <div className='book-container'>
                        {books.map((result) => (
                            <Card
                                key={result.id}
                                title={result.volumeInfo.title || 'No title'}  // Default to 'No title'
                                authors={(result.volumeInfo.authors || []).join(', ')}  // Default to empty array
                                categories={(result.volumeInfo.categories || []).join(', ')}  // Default empty array
                                publishedDate={result.volumeInfo.publishedDate || 'Not available'} // Default published date
                                pageCount={result.volumeInfo.pageCount || 'Not available'} // Default page count
                                link={result.volumeInfo.infoLink || 'No link available'}  // Default link text
                                description={result.volumeInfo.description || 'No description available'}  // Default description
                                image={result.volumeInfo.imageLinks?.thumbnail || 'default-image-url'}  // Fallback to default image if not available
                                Button={() => (
                                    <div>
                                        <Button
                                            className={`save-btn ${savedBooks.some(book => book.googleId === result.id) ? 'saved' : ''}`}
                                            type='button'
                                            onClick={() => !savedBooks.some(book => book.googleId === result.id) && handleBookSave(result.id)}
                                            disabled={savedBooks.some(book => book.googleId === result.id)}
                                        >
                                            {savedBooks.some(book => book.googleId === result.id) ? 'Saved' : 'Save'}
                                        </Button>
                                        {/* Display the added date if the book is saved */}
                                        {savedBooks.some(book => book.googleId === result.id) && (
                                            <p className='added-date'>
                                                Added {new Date(savedBooks.find(book => book.googleId === result.id).addedDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                ) : (
                    <h2 id='home-message'>{message}</h2>
                )}
            </div>
        </div>
    );
};

export default Home;
