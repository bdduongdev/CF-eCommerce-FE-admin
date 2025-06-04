
import UserTable from '../../components/users/UserTable'
import StatCard from '../../components/orders/StartCard'
import { UsersIcon } from 'lucide-react'

export default function UsersPage() {
  return (
     <div className="flex">
     
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
    

        <div className="flex flex-col gap-4 mb-6">
   
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-center md:text-left">
              Users Management
            </h2>
            <a
              href="/users/add"
              className="mt-2 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
            >
              + Add New User
            </a>
          </div>

          {/* 2 Stat Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <StatCard
              title="Total Users"
              value="1,250"
              icon={<UsersIcon className="w-5 h-5 text-purple-600" />}
            />
            <StatCard
              title="Active Users"
              value="1,180"
              icon={<UsersIcon className="w-5 h-5 text-green-600" />}
            />
          </div>
        </div>

        <UserTable />
      </main>
    </div>
  
  )
}
