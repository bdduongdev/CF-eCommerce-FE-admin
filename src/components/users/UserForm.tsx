import { useForm } from 'react-hook-form';

type Props = {
  onSubmit: (form: UserFormData) => void;
};

export type UserFormData = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  address: string;
  role_id: string;
};

export default function UserForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      address: '',
      role_id: '',
    },
  });

  const onFormSubmit = (data: UserFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">Username</label>
        <input
          type="text"
          {...register('username', { 
            required: 'Username is required',
            maxLength: { value: 50, message: 'Username must not exceed 50 characters' }
          })}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">Password</label>
        <input
          type="password"
          {...register('password', { 
            required: 'Password is required',
            maxLength: { value: 255, message: 'Password must not exceed 255 characters' }
          })}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
            maxLength: { value: 100, message: 'Email must not exceed 100 characters' }
          })}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">Phone Number</label>
        <input
          type="text"
          {...register('phone_number', { 
            maxLength: { value: 15, message: 'Phone number must not exceed 15 characters' }
          })}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">Address</label>
        <input
          type="text"
          {...register('address', { 
            maxLength: { value: 255, message: 'Address must not exceed 255 characters' }
          })}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 text-left">Role</label>
        <select
          {...register('role_id', { required: 'Role is required' })}
          className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Role</option>
          <option value="1">Admin</option>
          <option value="2">Customer</option>
        </select>
        {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id.message}</p>}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm">
          Create User
        </button>
      </div>
    </form>
  );
}