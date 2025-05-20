interface StatusBadgeProps {
  status: 'Completed' | 'Pending' | 'In-Progress';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const map = {
    Completed: 'bg-green-100 text-green-600',
    Pending: 'bg-orange-100 text-orange-600',
    'In-Progress': 'bg-indigo-100 text-indigo-600',
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${map[status]}`}>
      {status}
    </span>
  );
}
