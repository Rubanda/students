import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <Sidebar/>
        <main>
          <div>
            <Switch>
              <Route path='/' component={Dashboard}></Route>
            </Switch>
          </div>
        </main>
      </div>
    </BrowserRouter>  
  );
}

export default App;
