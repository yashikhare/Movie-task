import logo from "./logo.svg";
import "./App.css";
import Header from "./Shared/Header/Header";
import Movies from "./Components/Movies/Movie";

function App() {
  return (
    <div className="App">
      <Header />
      <Movies />
     </div>
  );
}

export default App;

