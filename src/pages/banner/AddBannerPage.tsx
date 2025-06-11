
import BannerForm from "../../components/banner/BannerForm"

export default function AddBannerPage() {
  const handleSubmit = (data: any) => {
    console.log('Banner created:', data)
    // TODO: call API to submit banner
  }

  return (
    <div className="flex">
     
      <main className="flex-1 min-h-screen bg-gray-50 p-6">
        
        <div className="mx-auto w-full max-w-6xl bg-white border rounded-xl shadow px-12 py-12">
          <h1 className="text-xl font-semibold mb-4">Add New Banner</h1>
          <BannerForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  )
}
