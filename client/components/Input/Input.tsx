interface InputProps {
  type: "text" | "number";
  className?: string | undefined;
  placeholder: string;
  value: number | string | undefined;
  onChange: (value: number | string) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  className,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default Input;
