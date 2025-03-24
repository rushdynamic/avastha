import useCounterStore from "./Store"

function App() {

  const count = useCounterStore((state: any) => state.count);
  const increment = useCounterStore((state: any) => state.increment);
  const decrement = useCounterStore((state: any) => state.decrement);

  return (
    <>
      <span>sqrrl example: {count}</span>
      <br />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

export default App
