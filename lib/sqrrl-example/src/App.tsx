import foo from "sqrrl";

function App() {

  const res = foo();
  return (
    <>
      <span>sqrrl example: {res}</span>
    </>
  )
}

export default App
