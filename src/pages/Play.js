import React from "react"
import {getRandomPokeNum, getPokeUrl} from "../helpers"

export default function Play(props) {

    const [currentPoke, setCurrentPoke] = React.useState({})
    const [revealPoke, setRevealPoke] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
  
    const [streak, setStreak] = React.useState(0)
  
    // on page render, fetch a new poke
    React.useEffect( () => {
      fetch(getPokeUrl(getRandomPokeNum()))
      .then(res => res.json())
      .then(data => setCurrentPoke(data))
    }, [])
  
    const onChange = (e) => {
      const val = e.target.value
      setInputValue(val);
      
      if (val == currentPoke.name) {
        setRevealPoke(true)
        setStreak(streak + 1)
      }
    };
  
    const nextPoke = () => {
      setRevealPoke(false)
      setInputValue("")
  
      fetch(getPokeUrl(getRandomPokeNum()))
      .then(res => res.json())
      .then(data => setCurrentPoke(data))
    }
  
    const giveUp = () => {
      console.log('click')
      setRevealPoke(true)
  
    }

    return (
        <>
        <h1>Who's that pokemon?</h1>

      {currentPoke.name && <img className={revealPoke ? "" : "shaded"} src={currentPoke.sprites.front_default} ></img>}
      
      <div>
        <input autoFocus type="text" value={inputValue} onChange={onChange} disabled={revealPoke}></input>
      </div>

      {revealPoke && (
      <>
        <h2>That's right! It's {currentPoke.name}!</h2>
        <button onClick={nextPoke}>Next pokemon</button>
      </>
      )}

        <div>
          {!revealPoke && <button onClick={giveUp}>IDK, who is it?!</button>}
        </div>
      <div>streak: {streak}</div>
      </>
    )
}