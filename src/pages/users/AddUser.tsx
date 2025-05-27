// pages/users/AddUserPage.tsx
import Sidebar from '../../components/common/Sidebar'
import Header from '../../components/common/Header'
import UserForm from '../../components/users/UserForm'


export default function AddUserPage() {
  

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-50 p-6">
        <Header />
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-xl bg-white border rounded-xl shadow px-8 py-10">
            <h2 className="text-xl font-semibold text-center mb-6">Add New User</h2>
            <UserForm/>
          </div>
        </div>
      </main>
    </div>
  )
}
