import { InputGroup, FormControl, Button } from 'react-bootstrap'

const MyShelves = () => {
    return (
        <div className='my-shelves'>
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
        </div>
    )
}

export default MyShelves