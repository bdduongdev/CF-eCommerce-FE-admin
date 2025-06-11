// pages/users/AddUserPage.tsx

import UserForm from '../../components/users/UserForm'


export default function AddUserPage() {
  

  return (
    
 
         <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Add New User</h2>
        <UserForm />
      </div>
    </div>
   
  )
}
