interface ButtonProps {
  text: string;
  size?: "full" | "lg" | "md" | "sm" | "";
  type: "button" | "submit";
  status?: "default" | "inactive" | "second";
  className?: string;
  onClick?: () => void;
}
const Button = ({
  text,
  size = "",
  type,
  status = "default",
  className
}: ButtonProps) => {
  const sizeClass: { [key in NonNullable<ButtonProps["size"]>]: string } = {
    full: "w-full h-12 text-base",
    lg: "h-12 px-8 text-base",
    md: "h-10 px-6 text-base",
    sm: "h-8 px-4 text-sm",
    "": ""
  };

  const statusClass: { [key in NonNullable<ButtonProps["status"]>]: string } = {
    default:
      "bg-main border border-main text-white-ffffff hover:bg-sub hover:text-main hover:border-main",
    inactive: "bg-gray-a4a1aa text-white-ffffff",
    second: "bg-sub text-main hover:border hover:border-main"
  };

  return (
    <button
      className={`${sizeClass[size]} ${statusClass[status]} rounded-md font-medium border border-transparent ${className}`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
