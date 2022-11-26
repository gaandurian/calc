
interface OperatorButtonProps {
    operator: string,
    onClick?: any;
}

const OperatorButton: React.FC<OperatorButtonProps> = ({ operator, onClick }) => {
  return (
    <button onClick={onClick} className="rounded-lg h-16 w-16 bg-cyan-600 text-white font-extrabold text-5xl">
        {operator}
    </button>
  )
}

export default OperatorButton