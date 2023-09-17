import { useState, useCallback, useEffect } from 'react'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const generatePassword = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numAllowed) str += "0123456789"
      if(charAllowed) str += "!@#$%^&*"
      
      for (let index = 1; index <= length; index++) {
        let passChar = Math.floor((Math.random() * str.length) + 1)
        pass += str.charAt(passChar)
      }
      setPassword(pass)
    },
    [length, numAllowed, charAllowed, setPassword],
  )

  useEffect(() => {
    generatePassword()
  }, [length, numAllowed, charAllowed, generatePassword])
  

  return (
    <>
      <div>
        <div>
          <input 
            type="text"
            value={password}
            placeholder='password'
            readOnly
          />
        </div>
        <button>Copy</button>
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      <div>
        <div>
          <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            onChange={(e)=> {setLength(e.target.value)}}
          />
          <label htmlFor="length">length : {length}</label>
        </div>
        <div>
          <input type="checkbox" defaultChecked={numAllowed} id="numberInput" onChange={() => {
            setNumAllowed((prev) => !prev)
          }} />
          <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={() => {
            setCharAllowed((prev) => !prev)
          }} />
        </div>
      </div>
    </>
  )
}

export default App
