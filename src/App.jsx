import { useEffect } from "react";
import "./App.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import Header from "./components/Header";
import CounterControl from "./components/CounterControl";
import DisplayChar from "./components/DisplayChar";
import { useCounter } from "./store/useCounter";
  
const App = () => {
  const loadInitialData = useCounter((state) => state.loadInitialData);
  
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);
  
  return (
    <>
      <Header />
      <div className="mini-container mx-1 p-3">
        <CounterControl />
        <DisplayChar />
      </div>
    </>
  );
};
export default App;
