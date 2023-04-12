
interface OperatorButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    operator: string,
    onClick?: any;
    className?: string;
}

const OperatorButton: React.FC<OperatorButtonProps> = ({ operator, onClick, className, ...rest } ) => {
  return (
    <button onClick={onClick} className={`rounded-lg h-16 w-16 bg-cyan-600 text-white font-extrabold text-5xl ${className}`} {...rest}>
        {operator}
    </button>
  )
}

export default OperatorButton