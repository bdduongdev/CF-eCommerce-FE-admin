import React from 'react'

type Props = {
  search: string
  setSearch: (val: string) => void
}

export default function DiscountToolbar({ search, setSearch }: Props) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by product name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded text-sm w-full max-w-xs"
      />
    </div>
  )
}