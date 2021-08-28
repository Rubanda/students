import './App.css';
import Header from './component/Header';
import Sider from './component/Sider';

function App() {
  return (
    <div className="grid-container">
      <Header />
      <Sider/>
      <main>
        <div>
          main
        </div>
      </main>
    </div>
  );
}

export default App;
