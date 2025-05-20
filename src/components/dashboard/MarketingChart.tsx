
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Acquisition', value: 45 },
  { name: 'Purchase', value: 30 },
  { name: 'Retention', value: 25 },
];

const COLORS = ['#6366F1', '#FDBA74', '#FACC15'];

export default function MarketingChart() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="text-sm text-gray-500 mb-2">Marketing</div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={70}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-around text-xs text-gray-600 mt-2">
        <span>Acquisition</span>
        <span>Purchase</span>
        <span>Retention</span>
      </div>
    </div>
  );
}

