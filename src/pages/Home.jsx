import { InputGroup, FormControl, Button } from 'react-bootstrap'
import Jumbotron from '../components/Jumbotron/Jumbotron'
import Card from '../components/Card/Card'

import './styling/home.css'

const Home = () => {
    return (
        <div className='home'>

            <Jumbotron />

            <div className='search-container'>
                <form>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='Search books...'
                            aria-label='Search books'
                            aria-describedby='search-button'
                        />
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

            <Card />

        </div>
    );
};

export default Home;
