export default function ImageUploader() {
  return (
    <div className="border rounded-lg p-4 text-center flex flex-col items-center justify-center bg-gray-50">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
        <span className="text-2xl">📷</span>
      </div>
      <p className="text-sm font-medium text-gray-700">Upload Product Image</p>
      <input type="file" className="mt-2 text-sm" />
    </div>
  );
}
