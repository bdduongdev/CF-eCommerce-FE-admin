

interface StatCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  subtitle?: string;
  subtitleClass?: string;
}

export default function StatCard({ icon, title, value, subtitle, subtitleClass }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <div className="bg-orange-100 p-2 rounded-full">{icon}</div>
      </div>
      <h2 className="text-xl font-bold">{value}</h2>
      {subtitle && (
        <span className={`text-sm ${subtitleClass}`}>{subtitle}</span>
      )}
    </div>
  );
}
