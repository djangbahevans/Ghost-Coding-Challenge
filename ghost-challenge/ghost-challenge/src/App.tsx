import "./App.css";
import { Comments, Search } from './components';
import { SocketProvider } from './context';
const author = window.prompt('Please enter your name', 'Thor Odinson') ?? "Thor Odinson";

function App() {
  return (
    <SocketProvider>
      <div className='app'>
        <div className="discussion-title">
          <h1>Discussion</h1>
        </div>
        <Search user={author} />
        <Comments user={author} />
      </div>
    </SocketProvider>
  );
}

export default App;
