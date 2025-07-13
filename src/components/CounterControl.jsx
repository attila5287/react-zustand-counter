import DisplayCounter from "./DisplayCounter";
import { useCounter } from "../store/useCounter";

export default function CounterControl() {
  const incrCounter = useCounter((state) => state.incrCounter);
  const decrCounter = useCounter((state) => state.decrCounter);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <button className="btn btn-lg btn-secondary w-25" onClick={decrCounter}>
        <i className="fas fa-minus"></i>
      </button>
      <DisplayCounter />
      <button className="btn btn-lg btn-secondary w-25 mx-2" onClick={incrCounter}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};