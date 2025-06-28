import RestoreCategoryTable from "../../components/category/RestoreCategoryTable"

export default function RestoreCategoryPage() {
  return (
   
    <div className="flex">
    
          <main className="flex-1 p-6 bg-gray-50 min-h-screen">
    
            <h1 className="text-xl font-semibold mb-4">🗂️ Khôi phục danh mục đã xoá</h1>
           
         <RestoreCategoryTable />
            
          </main>
        </div>
  )
}