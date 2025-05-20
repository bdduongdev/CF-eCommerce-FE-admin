
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Sept 10', value: 80 },
  { name: 'Sept 11', value: 65 },
  { name: 'Sept 12', value: 40 },
  { name: 'Sept 13', value: 70 },
  { name: 'Sept 14', value: 30 },
  { name: 'Sept 15', value: 50 },
  { name: 'Sept 16', value: 90 },
];

export default function SummaryChart() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>Summary</span>
        <span>Last 7 Days</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

