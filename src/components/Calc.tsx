/**
 * I previously used Mathjs library to handle the simple math calculations
 * however the only reason behind that was that I was short on time and I thought
 * to myself this is a design problem more than logic.
 * So I decided to implement some simple logic for it.
 * I wouldve loved to do some unit testing but I don't want to exceed an hour on this task.
 */

import { useEffect, useState } from "react";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";

const operations = new Map([
  ["add", (a: number, b: number) => a + b],
  ["subtract", (a: number, b: number) => a - b],
  ["multiply", (a: number, b: number) => a * b],
  ["divide", (a: number, b: number) => a / b],
]);

const Calc = () => {
  const [result, setResult] = useState<string>("");
  const [lcdValue, setLcdValue] = useState<string>("");
  const [stack, setStack] = useState<string[]>([]);

  const handleUpdateExpression = (value: string) => {
    if (result !== "") {
      setLcdValue(value);
      setResult("");
      return;
    }
    setLcdValue((prev) => prev + value);
  };
  const handleOperatorPress = (operator: string, lcdVal: string) => {
    if (lcdValue === "") {
      if (operator === "equals") return; // No value on the screen and the user presses =, do nothing
      if (stack.length === 2) {
        // No value in the lcd and the user presses an operator, update operator
        setStack((prev) => {
          // update the operator in the stack
          const [a] = prev;
          return [a, operator];
        });
      }
    }

    if (stack.length === 2) {
      setStack((prev) => {
        const [a, op] = prev;

        const calculateOp = operations.get(op);
        if (!calculateOp) return prev;

        const result = calculateOp(Number(a), Number(lcdValue));
        setLcdValue(result.toString());
        setResult(result.toString());
        return operator === "equals"
          ? [result.toString()]
          : [result.toString(), operator];
      });
      return;
    }

    if (operator === "equals") return; // If there is no operator in the stack and the user presses equals, do nothing
    setStack([lcdValue, operator]); // If there is no operator in the stack and the user presses an operator, add the operator to the stack
    setLcdValue("");
  };

  const clear = () => {
    setLcdValue("");
    setStack([]);
    setResult("");
  };

  useEffect(() => console.log(stack), [stack]);

  const CALC = [
    { number: 7 },
    { number: 8 },
    { number: 9 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 0, large: true },
  ];
  return (
    <div className="flex flex-col gap-4 bg-stone-200 rounded-xl p-3">
      {/* Calculator Monitor or screen */}
      <div className="h-20 w-full bg-white rounded-lg p-2 flex justify-end items-end">
        <div className="text-cyan-600 text-5xl font-extrabold"> {lcdValue}</div>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2">
          {/* Calculator Numbers  */}
          <div className="grid grid-cols-3 grid-rows-3 gap-2">
          <OperatorButton className="col-span-3" onClick={() => clear()} operator="C" />
            {CALC.map((item, index) => (
              <NumberButton
                key={index}
                handleUpdateExpression={() =>
                  handleUpdateExpression(item.number.toString())
                }
                number={item.number}
                large={item.large}
              />
            ))}
            </div>
          </div>

          {/* Calc operators */}
          <div className="flex flex-col gap-y-2">
            <OperatorButton
              onClick={() => handleOperatorPress("divide", lcdValue)}
              operator="÷"
            />
            <OperatorButton
              onClick={() => handleOperatorPress("multiply", lcdValue)}
              operator="×"
            />
            <OperatorButton
              onClick={() => handleOperatorPress("subtract", lcdValue)}
              operator="-"
            />
            <OperatorButton
              onClick={() => handleOperatorPress("add", lcdValue)}
              operator="+"
            />
            <OperatorButton
              className="bg-orange-500"
              operator="="
              onClick={() => handleOperatorPress("equals", lcdValue)}
            />

        </div>
      </div>
    </div>
  );
};

export default Calc;
