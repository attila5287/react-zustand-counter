import "./App.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import Header from "./components/Header";
import CounterControl from "./components/CounterControl";

const App = () => {
  return (
    <div className="mini-container mx-1 p-3">
      <Header/>
      <CounterControl />
    </div>
  );
};
export default App;
