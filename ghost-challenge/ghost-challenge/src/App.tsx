import "./App.css";
import { Comments, Search } from './components';
import { SocketProvider } from './context';

const author = window.prompt('Please enter your name', 'Thor Odinson') ?? "Thor Odinson";
const image = window.prompt('Enter URL of image you want to use (Otherwise leave as "/thor.jpg")', '/thor.jpg') ?? "/thor.jpg";

function App() {
  return (
    <SocketProvider>
      <div className='app'>
        <div className="discussion-title">
          <h1>Discussion</h1>
        </div>
        <Search user={author} image={image} />
        <Comments user={author} image={image} />
      </div>
    </SocketProvider>
  );
}

export default App;
