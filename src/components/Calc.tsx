import { useState } from "react"
import NumberButton from "./NumberButton"
import OperatorButton from "./OperatorButton"
import * as math from 'mathjs'

const Calc = () => {
 
  const [expression, setExpression] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const handleUpdateExpression = (value: string) => {
    setExpression(prev => prev.concat(value))
  }

  const handleCalculateResult = (expr: string) => {
    let result
    try {
      result = math.evaluate(expr)
    } catch (error) {
      console.log(error)
      return;
    }
      setResult(result)
  }

  const CALC = [
    {
      number: 7,
    },
    {
      number: 8,
    },
    {
      number: 9,
    },
    {
      number: 4,
    },
    {
      number: 5,
    },
    {
      number: 6,
    },
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
    {
      number: 0,
      large: true
    },


  ]
  return (
    <div className="flex flex-col gap-4 bg-stone-200 rounded-lg p-3">

      {/* Calculator Monitor or screen */}
      <div className="h-20 w-full bg-white rounded-lg font-extrabold text-3xl p-2">
        {expression}
        <div className="text-cyan-600 flex justify-end">{result}</div>
      </div>


      <div className="flex gap-2">   
        {/* Calculator Numbers  */}
      <div className="grid grid-cols-3 gap-2">
        {CALC.map((item, index) => <NumberButton 
        key={index}
        handleUpdateExpression={() => handleUpdateExpression(item.number.toString())} 
        number={item.number} 
        large={item.large} />)}
      </div>

      {/* Calc operators */}
     <div className="flex flex-col gap-y-2">
       <OperatorButton onClick={() => handleUpdateExpression('/')} operator="÷" /> 
       <OperatorButton onClick={() => handleUpdateExpression('*')} operator="×" /> 
       <OperatorButton onClick={() => handleUpdateExpression('+')} operator="+" />
       <OperatorButton onClick={() => handleCalculateResult(expression)}  operator="=" />
     </div>

    </div>
    </div>
  )
}

export default Calc