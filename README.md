# Zustand + React + Vite
> Example from documentation : https://refine.dev/blog/zustand-react-state/#getting-started-with-zustand

```JS
import { create } from "zustand";
```
>   This function is called with a callback function and it returns a custom hook. The callback function passed to it is where we will define our state and the functions we can use to manipulate the state. The state and the functions are all in an object returned by this callback function.

```JS
const useCounter = create((set) => {
  return {
    counter: 0,
    incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
  };
});
```
>   See that the create function, passes a set function to the callback function. This set function is a function used to manipulate the state in the store. States in zustand can be primitives, objects, or functions. In our above example, we have two states in our store: counter, and incrCounter. The useCounter is a custom hook, we can use this hook in our components and we will be able to get the latest state in them. If we use the hook in components A, B, and C. Any change done to the state in B will be reflected in both A and C, and they will all re-render to reflect the new changes.

>   The custom hook returned by the create acts similarly to useAppSelector in React-Redux, it lets you select a slice of state from the store. You call the hook and pass it a callback function. This function is called by the hook internally and passes the current state to it. So we will then get this state and return the part of the state we want.

```JS
const counter = useCounter((state) => state.counter);
```
>   See that we called the useCounter hook and passed a callback function to it. Then, we expect a state from the hook and then return the counter part of the state.

We can then, display the counter:


```JS
const DisplayCounter = () => {
  const counter = useCounter((state) => state.counter);
  return <div>Counter: {counter}</div>;
};
```

>   Now, we want to create a component where we can increase the value of the counter state.

```JS
const CounterControl = () => {
  const incrCounter = useCounter((state) => state.incrCounter);

  return (
    <div>
      <button onClick={incrCounter}>Incr. Counter</button>
    </div>
  );
};
```
>   This is a separate component from where we increase the value of the counter state. See that we sliced out the incrState function from the state, and we set it to the onClick event of the button. This will increase the counter state when the button is clicked. See how the components are independent of each yet they can "see" the current state from the store. Whenever we click the Incr. Counter button in the CounterControl component, the DisplayComponent will re-render to display the newest counter state value.


```JS
const App = () => {
  return (
    <>
      <DisplayCounter />
      <CounterControl />
    </>
  );
};
```
>   They are independent of each other yet magically connected by zustand. This gives React-Redux a run for its money because trying to re-create this small state in Redux-React will take more code to set up:

* First, we will create a store.
* We will wrap either the App component or its children in a Content Provider and pass the store to the Context Provider via a store props.
* We will import useSelector, useDispatch in any component we wish to use in the store.
* To get a slice of the state we will call the useSelector with a callback function.
* To dispatch an action to the store, we will use the useDispatch hook.

>   It's quite lengthy, but with Zustand it's oversimplified.

>   Returning the whole state Now, when we call the custom hook returned by the create function without a callback function, the hook will return the whole state of the store.

```JS
const state = useCounter();
```
>   See that we called the useCounter hook with no callback function, so in this case, the function will return the whole state in the store.

>   The state holds the whole state in the useCounter store. We can get the counter state by doing this:

```JS
state.counter;
// 0
```
>   We can also, call the incrCounter state function:

```JS
state.counter;
// 0

state.incrCounter();
// 1
```

>   Memoization We can memoize our zustand store. Memoization is an optimization technique used to optimize the execution of functions by caching the results of expensive or time-consuming function calls. It involves storing the return value of a function associated with a specific set of input parameters so that if the function is called again with the same parameters, the cached result can be returned instead of re-evaluating the function. The goal of memoization is to improve performance and efficiency by avoiding redundant computations.

>   Now, zustand gives us the ability to add memoization to the custom hook it returns to us. It exports a shallow function that we can use to add memoization to our state picks.
```JS
import { shallow } from "zustand/shallow";
```

```JS
// DisplayComponent
const counter = useCounter((state) => state.counter);
```

```JS
const counter = useCounter((state) => state.counter, shallow);
```

```JS
(previousState, nextStateSlice) =>
```

```JS
(previousCounter, nextCounter) => previousCounter === nextCounter;
```

```JS
const counter = useCounter(
  (state) => state.counter,
  (previousCounter, nextCounter) => previousCounter === nextCounter,
);
```

```JS
const useCounter = create((set) => {
  return {
    counter: 0,
    incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
  };
});
```

```JS
set({
  counter: 9,
});
```

```JS
set({}, true);
```

```JS
const useCounter = create((set) => {
  return {
    counter: 0,
    incrCounter: async () => {
      const { data } = await axios.get("/counter");
      set({
        counter: data.counter,
      });
    },
  };
});
```


