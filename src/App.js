import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Portal_Stepone from './Components/Portal_Stepone';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal_Stepone/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
