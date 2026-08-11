
let login_url = "http:localhost:3000"

async function handle_click(){
  let clicked = await fetch(`${login_url}/api/auth`)

  return
}




function App() {
  return (
    <div style={{ padding: '1rem', width: '200px' }}>
      <h1 className="title">cleanslate</h1>
      <p className="lead_instruct">click the button to login</p>
      <button className="button" onClick={handle_click}>login with google</button>
    </div>
  )
}

export default App