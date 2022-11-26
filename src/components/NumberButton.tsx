
interface NumberButtonProps {
    number: number
    large?: boolean
    handleUpdateExpression: () => void;
}

const NumberButton: React.FC<NumberButtonProps> = ({ number, large, handleUpdateExpression }) => {
  return (
    <button 
    onClick={handleUpdateExpression}
    className={`rounded-lg h-16 ${large ? 'col-span-2' : 'w-16'} bg-stone-700 text-white font-extrabold text-5xl`}>
        {number}
    </button>
  )
}

export default NumberButton