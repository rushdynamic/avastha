import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BasicExample from './basic-example/BasicExample.tsx'
import NestedStateExample from './nested-state-example/NestedStateExample.tsx'
import "./app.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BasicExample />
    <hr />
    <NestedStateExample />
  </StrictMode>,
)
