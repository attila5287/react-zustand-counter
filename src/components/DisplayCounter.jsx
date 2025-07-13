import { useCounter } from "../store/useCounter";
export default function DisplayCounter() {
  const counter = useCounter((state) => state.counter);
  return (
    <p className="text-center border border-secondary rounded py-1 px-5 mb-0 mx-0 fs-1 w-50 mx-2">
      {counter}
    </p>
  );
};