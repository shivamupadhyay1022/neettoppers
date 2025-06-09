
import Link from 'next/link';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  gradient?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  link, 
  gradient = "from-purple-600/20 to-amber-500/20" 
}) => {
  return (
    <Link href={link} className="group">
      <div className={`bg-gradient-to-br ${gradient} border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all transform group-hover:scale-105`}>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-purple-300">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
