import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header>
        <h1>Portfolio v2</h1>
        <p>Test Deployment</p>
      </header>
      
      <main>
        <div className="card">
          <h2>Test Counter</h2>
          <button onClick={() => setCount(count + 1)}>
            Count is: {count}
          </button>
          <p>Click the button to test interactivity</p>
        </div>

        <div className="content-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="grid-item">
              <h3>Item {item}</h3>
              <p>This is a test item to verify the layout and styling</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
