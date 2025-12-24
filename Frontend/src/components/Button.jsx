
const Button = ({ text, size = "medium", color = "blue", onClick, disabled, }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                font-semibold ease-in transition-all duration-200 active:scale-95
                ${color === "blue" && "bg-blue-500 text-white hover:bg-blue-600"}
                ${color === "orange" && "bg-orange-500 text-white hover:bg-orange-600"}
                ${color === "green" && "bg-emerald-600 text-white hover:bg-green-700"}

                ${size === "medium" && "px-3 py-2 rounded-md"}
                ${size === "small" && "px-3 py-2 rounded-sm text-sm"}
                ${size === "large" && "px-3 py-2 rounded-xl text-lg"}

                ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                `}>{text}</button>
    )
}

export default Button