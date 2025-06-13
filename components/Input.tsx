import { TextInput, TextInputProps } from "react-native";

const Input = ({ className, ...props }: TextInputProps & { className?: string }) => {
  return (
    <TextInput
      className={`
        m-2
        px-4 py-3
        text-base
        rounded-xl
        border
        text-black dark:text-white
        bg-white dark:bg-stone-900
        border-gray-300 dark:border-blue-400
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        ${className}
      `}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
};

export default Input;
