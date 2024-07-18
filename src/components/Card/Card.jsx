import './style.css'

const Card = () => {
    return (
        <div>
            <div className="card">
                <h4>Title</h4>
                <p>Authors</p>
                <a href='/' target="_blank" rel="noreferrer">
                    View
                </a>
                <br></br>
                <img alt='Title' src='Image' width="200" height="300"></img>
                <br></br>
                <p>Description</p>
                {/* <Button /> */}
            </div>
        </div>
    )
}

export default Card