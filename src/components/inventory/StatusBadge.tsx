interface Props {
  status: 'Published' | 'Unpublished';
}

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${
        status === 'Published'
          ? 'bg-indigo-100 text-indigo-600'
          : 'bg-orange-100 text-orange-600'
      }`}
    >
      {status}
    </span>
  );
}
