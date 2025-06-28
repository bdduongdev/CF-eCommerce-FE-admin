interface Props {
  status: 'active' | 'inactive' | 'Published' | 'Unpublished';
}

export default function StatusBadge({ status }: Props) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
      case 'Published':
        return {
          className: 'bg-green-100 text-green-800',
          text: status === 'active' ? 'Active' : 'Published'
        };
      case 'inactive':
      case 'Unpublished':
        return {
          className: 'bg-red-100 text-red-800',
          text: status === 'inactive' ? 'Inactive' : 'Unpublished'
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800',
          text: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${config.className}`}
    >
      {config.text}
    </span>
  );
}
