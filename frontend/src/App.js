import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ClassScreen from './screen/ClassScreen';
import StudentScreen from './screen/StudentScreen';
import CourseScreen from './screen/CourseScreen';
import Header from './component/Header';
import Sider from './component/Sider';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <Sider/>
        <main>
          <div>
            <Route path='/class' component={ClassScreen}></Route>
            <Route path='/student' component={StudentScreen}></Route>
            <Route path='/course' component={CourseScreen}></Route>

          </div>
        </main>
      </div>
    </BrowserRouter>  
  );
}

export default App;
