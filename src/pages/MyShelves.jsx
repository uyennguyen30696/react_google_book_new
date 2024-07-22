import { useEffect, useState } from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Card from '../components/Card/Card';
import API from '../utils/API';

import { InputGroup, FormControl, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import './styling/myShelves.css';
import { FaTimes } from 'react-icons/fa';

const MyShelves = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('You have no saved book yet!');

    useEffect(() => {
        loadSavedBooks();
    }, []);

    const loadSavedBooks = () => {
        API.getSavedBooks()
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    };

    const handleBookDelete = (id) => {
        API.deleteBook(id)
            .then(() => {
                loadSavedBooks();
            })
            .catch(err => console.log(err));
    };

    const handleSearchInput = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const handleSearchTitle = (e) => {
        e.preventDefault();

        if (title) {
            API.getOneSavedBook({ title })
                .then(res => {
                    if (!res.data.length) {
                        setMessage('There is no book that matches your search!');
                    } else {
                        setBooks(res.data);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            handleSearchTitle(e);
        }
    };

    const handleClearInput = () => {
        setTitle(''); // Clear the input field
    };

    const handleRefresh = () => {
        window.location.reload(); // Reload the current page
    };

    const sortByTitle = (e) => {
        e.preventDefault();
        setBooks([...books].sort((a, b) => a.title.localeCompare(b.title)));
    };

    const sortByAuthor = (e) => {
        e.preventDefault();
        setBooks([...books].sort((a, b) => a.authors[0].localeCompare(b.authors[0])));
    };

    return (
        <div className='my-shelves'>
            <Jumbotron />
            <div className='search-container'>
                <InputGroup className='mb-3'>
                    <FormControl
                        className='input-with-white-right-border'
                        placeholder='Search in my list...'
                        aria-label='Search in my list'
                        aria-describedby='search-button'
                        onChange={handleSearchInput}
                        onKeyDown={handleEnterKey}
                        value={title}
                    />
                    {title && ( // Show clear button only if there's text in the input
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
                        onClick={handleSearchTitle}
                    >
                        Search
                    </Button>
                </InputGroup>
            </div>
            <div>
                {books.length ? (
                    <div>
                        <div className='button-container'>
                            <Dropdown as={ButtonGroup}>
                                <Button variant='success'>Sort By</Button>
                                <Dropdown.Toggle split variant='success' id='dropdown-split-basic' />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={sortByTitle}>Title</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={sortByAuthor}>Author</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button
                                className='refresh-btn'
                                variant='outline-secondary'
                                onClick={handleRefresh}
                            >
                                Refresh
                            </Button>
                        </div>
                        <div className='book-container'>
                            {books.map((result) => (
                                <Card
                                    key={result._id}
                                    title={result.title || 'No title'}
                                    authors={result.authors.join(', ') || 'Unknown author'}
                                    link={result.link || 'No link available'}
                                    description={result.description || 'No description available'}
                                    image={result.image || 'default-image-url'}
                                    Button={() => (
                                        <button
                                            className='btn delete-btn'
                                            type='button'
                                            onClick={() => handleBookDelete(result._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <h2 id='saved-message'>{message}</h2>
                )}
            </div>
        </div>
    );
};

export default MyShelves;
