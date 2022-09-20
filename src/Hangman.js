import React from 'react'
import { useEffect , useRef , useState ,useMemo} from 'react'
import { Fireworks } from '@fireworks-js/react'
const Hangman = (props) => {

  const [wrong , setWrong] = useState(0)
  const [right , setRight] = useState([])
  const [gameOver , setGameOver] = useState([false , false])

  const word = useMemo(()=>{
    let t = (Math.random()*(props.arr.length-1)).toFixed(0);
    return (props.arr[t]).toUpperCase().split("")
  },[props.arr])

  const buttons = useMemo(()=>{
      var btn = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
      btn = <>
              {
                btn.map((item , i)=> 
                  <button onClick={(event)=>btnHandler(event , item)}>{item}</button>
                )
              }
            </>

      return   btn
  },[])

  const btnHandler = (e , alphabet)=>{
    e.target.setAttribute("disabled" , true)
    if(word.includes(alphabet)){
      setRight(right=>[...right , alphabet])
    }
    else{
      setWrong(wrong => wrong+1)
    }
  }

  useEffect(()=>{
    if(Number(wrong)===7){
      setGameOver([true , false] )
    }
    
    let i = 0
    for(;i<word.length;i++){
      if(!right.includes(word[i]))  break
    }
    if(i===word.length) setGameOver([true , true])
    
  },[right , wrong])

  var style = {
    left : `-${Number(wrong)*100}px`
  }

  console.log(gameOver)

  return (
    <div className='hangMan'>
      
    {
      gameOver[0]===false ? 
      <>
        <div>
          {
            Array(7 - wrong).fill(0).map(()=>  <i class="fa-solid fa-heart"></i>)
          }
        </div>
        <div className='input-box'>
        {
          word.map((item,i)=>
            <div>{right.includes(item) ? item.toUpperCase() : "__"}</div>
          )
        }
        </div>
        <div className='img'>
          <img style={style} src = 'https://www.englishclub.com/images/esl-games/hangman.png' alt='#' />
        </div>
        <div className='btn-list'>
          {
            buttons
          }
        </div>
      </>
      :
      <div className='res'>
        <div className='input-box'>
          {
            word.map((item,i)=>
              <div>{item.toUpperCase() }</div>
            )
          }
        </div>
        {
          gameOver[1]===true ?
          <>
            <h3>Yehh! You Won</h3>
            <Fireworks
              options={{ opacity: 1 }}
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: 'transparent',
                zIndex : '-1'
              }}>
          </Fireworks>
          </> :
          <h3>oh! oh! ooh! You Loose</h3>
          
        }
        <button onClick={props.fun}>Play Again</button>
        
      </div>
    }  
      
    </div>
  )
}

export default Hangman