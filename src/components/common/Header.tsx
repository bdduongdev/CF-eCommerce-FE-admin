import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        // <div>Header</div>
         <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold"></h1>
      <div className="flex items-center gap-3">
        <select className="px-2 py-1 border rounded">
          <option>Nanny's Shop</option>
        </select>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </header>
    )
}

export default Header