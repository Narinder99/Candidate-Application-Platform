import './App.css';
import { Filters } from './components/Filters';
import { Jobs } from './components/Jobs';

function App() {
  return (
    <div className="App">
      <div className="rounded-xl text-black font-semibold text-xl pt-2">Candidate Application Platform</div>
      <Filters/>
      <Jobs/>
    </div>
  );
}

export default App;
