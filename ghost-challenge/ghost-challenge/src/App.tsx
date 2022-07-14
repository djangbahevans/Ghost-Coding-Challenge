import "./App.css";
import { Comments, Search } from './components';
import { SocketProvider } from './context';

function App() {
  return (
    <SocketProvider>
      <div className='app'>
        <div className="discussion-title">
          <h1>Discussion</h1>
        </div>
        <Search />
        <Comments />
      </div>
    </SocketProvider>
  );
}

export default App;
