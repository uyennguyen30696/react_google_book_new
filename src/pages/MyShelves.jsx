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
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        loadSavedBooks(); // Load books initially
    }, []); 

    const loadSavedBooks = (status = 'all') => {
        API.getSavedBooks()
            .then(res => {
                const filteredBooks = status === 'all' ? res.data : res.data.filter(book => book.status === status);
                setBooks(filteredBooks);
            })
            .catch(err => console.log(err));
    };

    const handleBookDelete = (id) => {
        API.deleteBook(id)
            .then(() => {
                loadSavedBooks(statusFilter); // Reload books after delete with current status filter
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
        setTitle('');
    };

    const handleRefresh = () => {
        loadSavedBooks(statusFilter); // Refresh with current status filter
    };

    const sortByTitle = (e) => {
        e.preventDefault();
        setBooks([...books].sort((a, b) => a.title.localeCompare(b.title)));
    };

    const sortByAuthor = (e) => {
        e.preventDefault();
        setBooks([...books].sort((a, b) => a.authors[0].localeCompare(b.authors[0])));
    };

    const sortByAddedDate = (e) => {
        e.preventDefault();
        setBooks([...books].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate)));
    };

    const handleStatusChange = (id, newStatus) => {
        API.updateBookStatus(id, newStatus)
            .then(() => {
                loadSavedBooks(statusFilter); // Reload books after status change with current filter
            })
            .catch(err => console.log(err));
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        loadSavedBooks(status); // Load books with selected status
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
                    {title && (
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
            <div className='dropdown-container'>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Status: {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleStatusFilter('all')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusFilter('not started')}>Not Started</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusFilter('in progress')}>In Progress</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusFilter('finished')}>Finished</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown as={ButtonGroup}>
                    <Button variant='success'>Sort By</Button>
                    <Dropdown.Toggle split variant='success' id='dropdown-split-basic' />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={sortByTitle}>Title</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={sortByAuthor}>Author</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={sortByAddedDate}>Added Time</Dropdown.Item>
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
            <div>
                {books.length ? (
                    <div className='book-container'>
                        {books.map((result) => (
                            <Card
                                key={result._id}
                                title={result.title || 'No title'}
                                authors={result.authors.join(', ') || 'Unknown author'}
                                publishedDate={result.publishedDate || 'Not available'}
                                pageCount={result.pageCount || 'Not available'}
                                categories={result.categories.join(', ') || 'Not available'}
                                link={result.link || 'No link available'}
                                description={result.description || 'No description available'}
                                image={result.image || 'default-image-url'}
                                Button={() => (
                                    <div className='card-actions'>
                                        <button
                                            className='btn delete-btn'
                                            type='button'
                                            onClick={() => handleBookDelete(result._id)}
                                        >
                                            Delete
                                        </button>
                                        <div className='added-date'>
                                            {result.addedDate ? `Added ${new Date(result.addedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                                        </div>
                                        <button
                                            className={`btn status-btn ${result.status === 'not started' ? 'not-started-btn' : 'neutral-btn'}`}
                                            type='button'
                                            onClick={() => handleStatusChange(result._id, 'not started')}
                                        >
                                            Not Started
                                        </button>
                                        <button
                                            className={`btn status-btn ${result.status === 'in progress' ? 'in-progress-btn' : 'neutral-btn'}`}
                                            type='button'
                                            onClick={() => handleStatusChange(result._id, 'in progress')}
                                        >
                                            In Progress
                                        </button>
                                        <button
                                            className={`btn status-btn ${result.status === 'finished' ? 'finished-btn' : 'neutral-btn'}`}
                                            type='button'
                                            onClick={() => handleStatusChange(result._id, 'finished')}
                                        >
                                            Finished
                                        </button>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                ) : (
                    <h2>{message}</h2>
                )}
            </div>
        </div>
    );
};

export default MyShelves;
