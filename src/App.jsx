import { create } from "zustand";
import "./App.css";
import "bootswatch/dist/slate/bootstrap.min.css";

const useCounter = create((set) => {
  return {
    counter: 10,
    incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
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

function App() {
  return (
    <div className="mini-container mx-1">
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-lg btn-primary w-25" onClick={()=> console.log("minus")}>
          <i className="fas fa-minus"></i>
        </button>
        <DisplayCounter />
        <button className="btn btn-lg btn-primary w-25" onClick={()=> console.log("plus")}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
