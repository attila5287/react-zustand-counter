import { create } from "zustand";
import "./App.css";
import "bootswatch/dist/slate/bootstrap.min.css";

const useCounter = create((set) => {
  return {
    counter: 10,
    incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
    decrCounter: () => set((state) => ({ counter: state.counter - 1 })),
  };
});
const DisplayCounter = () => {
  const counter = useCounter((state) => state.counter);
  return (
    <p className="text-center border border-secondary rounded py-1 px-5 mb-0 mx-0 fs-1 w-50 mx-2">
      {counter}
    </p>
  );
};
const CounterControl = () => {
  const incrCounter = useCounter((state) => state.incrCounter);
  const decrCounter = useCounter((state) => state.decrCounter);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <button className="btn btn-lg btn-primary w-25" onClick={decrCounter}>
        <i className="fas fa-minus"></i>
      </button>
      <DisplayCounter />
      <button className="btn btn-lg btn-primary w-25" onClick={incrCounter}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};
const App = () => {
  return (
    <div className="mini-container mx-1">
      <h4>
        <a href="https://refine.dev/blog/zustand-react-state/#getting-started-with-zustand" target="_blank" rel="noopener noreferrer">
      Zustand Documentation Ex
        </a>
      </h4>
      <CounterControl />
    </div>
  );
};
export default App;
