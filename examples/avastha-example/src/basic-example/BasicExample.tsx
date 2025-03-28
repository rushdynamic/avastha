import useCounterStore from "./CounterStore"

function App() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const incrementMutable = useCounterStore((state) => state.incrementMutable);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <>
      <h1>Basic Example</h1>
      <p>
        <b>Current count: </b>
        {count}
      </p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementMutable}>Increment by mutating</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

export default App
