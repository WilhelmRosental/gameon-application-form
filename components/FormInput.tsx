interface FormInputProps {
  id: string;
  label: string;
  type: string;
  errorMsg: string;
  min?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  label,
  type,
  errorMsg,
  min,
  onChange,
}: FormInputProps) {
  return (
    <div className="formData">
      <label htmlFor={id}>{label}</label>
      <input
        className={`text-control ${errorMsg ? "error" : ""}`}
        type={type}
        id={id}
        name={id}
        min={min}
        onChange={onChange}
      />
      <span className="error-msg">{errorMsg}</span>
    </div>
  );
}
