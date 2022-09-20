import React from 'react'
import { useState , useRef , useCallback } from 'react'
import Hangman from './Hangman'

import './style.css'
const App = () => {
    const colors = ['yellow' , 'orange' , 'black' , 'voilet' , 'purpel']
    const animal = ['elephant' , 'giraffe' , 'donkey' , 'rabbit' , 'leopard']
    var arr  = useRef(colors)
    const [start , setStart] = useState(false)


    const startGame = (ar)=>{
      if(ar===1) arr.current = colors
      else  arr.current = animal
      setStart(true)
    }

    const myFun = useCallback(()=>{
      setStart(false)
    },[])
    


  return (
    <div>
        {
            start===false ? 
            <div className='starter'>
                <h2>HangMan Game</h2>
                <p onClick={()=>startGame(1)}>Colors <span><i className="fa-solid fa-caret-right"></i></span></p>
                <p onClick={()=>startGame(2)}>Animals <span><i className="fa-solid fa-caret-right"></i></span></p>
            </div>
            :
            <div className='starter'>
              <Hangman arr = {arr.current} fun={myFun} />
            </div>
        }
    </div>
  )
}

export default App