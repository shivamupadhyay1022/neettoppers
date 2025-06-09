

interface StatBlockProps {
  label: string;
  value: string;
  icon: string;
}

const StatBlock: React.FC<StatBlockProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <p className="text-purple-300 text-sm">{label}</p>
    </div>
  );
};

export default StatBlock;
