
interface Option {
  value: string;
  label: string;
}

interface DropdownSelectorProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-purple-200">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;
