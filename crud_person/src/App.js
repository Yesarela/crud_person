import logo from './logo.svg';
import './App.css';
import Persons from './person';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicación de Personas</h1>
        <Persons />
      </header>
    </div>
  );
}

export default App;
