import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Result from './components/Result'
import "./index.css" 



const App = () =>(
  
  <>
  <Routes>
    <Route path="/" Component={Home}/>
    <Route path="/result" Component={Result}/>
  </Routes>
  </>
)

export default App