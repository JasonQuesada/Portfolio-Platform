import appConfig from '@/config/app.config'

function App() {
  return (
    <main>
      <h1>{appConfig.name}</h1>
      <p>Project initialized successfully.</p>
    </main>
  )
}

export default App