interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  highlight?: boolean;
}

const StatCard = ({ title, value, change = "+0.00%", highlight = false }: StatCardProps) => {
  return (
    <div className={`p-4 rounded-lg ${highlight ? "bg-blue-600 text-white" : "bg-white border"}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className={`text-xs ${highlight ? "" : "text-green-500"}`}>{change}</p>
    </div>
  );
};

export default StatCard;
