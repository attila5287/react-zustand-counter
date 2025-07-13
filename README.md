# Zustand + React Example from documentation
> https://refine.dev/blog/zustand-react-state/#getting-started-with-zustand

> See live demo: https://react-zustand-counter.vercel.app/

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

>   Memoization We can memoize our zustand store. Memoization is an optimization technique used to optimize the execution of functions by caching the results of expensive or time-consuming function calls. 

> It involves storing the return value of a function associated with a specific set of input parameters so that if the function is called again with the same parameters, the cached result can be returned instead of re-evaluating the function. The goal of memoization is to improve performance and efficiency by avoiding redundant computations.

>   Now, zustand gives us the ability to add memoization to the custom hook it returns to us. It exports a shallow function that we can use to add memoization to our state picks.
```JS
import { shallow } from "zustand/shallow";
```

> Still using our useCounter as an example, let's say we want to get the counter state from the store. We do this:
```JS
// DisplayComponent
const counter = useCounter((state) => state.counter);
```
> Now, let's say the initial state of the counter is 0, when the counter state is updated using the incrCounter, the DisplayComponent will be re-rendered. Now, if the updated value of the counter is 0 we will see that it is unnecessary to re-render the DisplayCounter component.

> How do we stop this unnecessary re-rendering from occurring when the previous state and the next state are equal? Zustand directs us to pass a comparator function as a second parameter to the custom hook. This comparator function will compare the previous slice state and the next slice state, if both are the same the component will not re-render, else the component will re-render.

> This is exactly what other React hooks do: useEffect, useMemo, and useCallback. The shallow function is a comparator function provided to us by Zustand. It shallowly compares the two-state slices using the == shallow equality operator.
```JS
const counter = useCounter((state) => state.counter, shallow);
```

> See we passed the shallow function as a second parameter to the useCounter hook. On each state change in the store, the shallow will determine if the component will re-render based on the previous and next value of the counter state. We can use our custom-made comparator if we don't trust the shallow function to do the job. The comparator function takes two parameters, the first parameter is the previous value of the state slice while the second parameter is the next value of the state slice.
```JS
(previousState, nextStateSlice) =>
```

> Inside this function is where we do our comparing and return the result. Returning true will make the hook skip the component from re-rendering while returning false will make the component re-render.

Let's create our comparator function for the counter state slice.
```JS
(previousCounter, nextCounter) => previousCounter === nextCounter;
```

> This uses the === equality operator to check if the two are the same. It returns a Boolean.

Let's plug it back into the useCounter hook:
```JS
const counter = useCounter(
  (state) => state.counter,
  (previousCounter, nextCounter) => previousCounter === nextCounter,
);
```

> Now, we have memoized our useCounter hook. With this, we have made our application a bit faster, with no more unnecessary re-renders.

> Updating the whole state We have only talked about getting the state from the store, but we have not delved into how to set the state. We only saw it briefly when we created the useCounter hook earlier on. Now, we will see how to update the state.

> We learned that zustand passes a function to the callback function passed to the create function. This function widely accepted to be referred to as set is used to update all or parts of the state.

> Let's look into the incrCounter state function:
```JS
const useCounter = create((set) => {
  return {
    counter: 0,
    incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
  };
});
```

> Here, we are passing a callback function to the set function. The set function will call this function and pass it the state as an argument, then use the result of the function to update the state. See that in the callback function, we are returning an object with a counter property. The set function uses the properties found in the object to know the properties in the state to update.

> We see that when we pass a function to the set function as an argument, the set function expects that we return an object.

> We can pass an object to the set function:
```JS
set({
  counter: 9,
});
```
> This will update the counter state value to 9.

Clear the entire state We can clear the state in a zustand store by passing an empty object to the set function.
```JS
set({}, true);
```
> This will clear the state and the actions.

What are actions? Actions are functions that are part of the state in a zustand store. They are like dispatch actions in React-Redux, they are used to effect changes in the store. For example, our incrCounter is an action, we call the set function inside it to update the counter state.

Using async actions Actions in zustand also support asynchronicity. In fact, according to Zustand docs, zustand does not care if your action is asynchronous or not. We can perform an asynchronous function in an action. For example, we can make an HTTP request to an endpoint from our action and update the state with the result from the HTTP call.
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
> See that in the incrCounter we made it an asynchronous function by using the async keyword. Inside the function, we made a call to an /counter endpoint and use the set function to update the value of the counter in the state.
```JS

```

> 
```JS

```

> 
```JS

```

> 
```JS

```

