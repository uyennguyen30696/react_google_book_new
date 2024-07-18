import { 
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import Home from './pages/Home'
import MyShelves from './pages/MyShelves'
import NotFound from './pages/NotFound'

function App() {

  return (
    <div className='App'>
      <Router basename='/'>

        <NavBar />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/my-shelves' element={<MyShelves />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />

      </Router>
    </div>
  )
}

export default App
