"use client"
import { CiViewBoard } from "react-icons/ci";




const HeaderInformation = () => {
  return (
    <div className='items-center justify-start flex gap-3'>
      <div className="max-w-64 flex  justify-items-end flex-col gap-3 w-full px-4 py-3 bg-gray-50">
        <div className="flex gap-4">
          <CiViewBoard size={24} />
          <div className="flex-col flex gap-3">
            <p className="text-sm text-gray-700">Total Riders</p>
            <p className="text-lg text-gray-500">Data</p>
            <p className="text-sm text-gray-500">Another Data</p>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="max-w-64 flex  justify-items-end flex-col gap-3 w-full px-4 py-3 bg-gray-50">
        <div className="flex gap-4">
          <CiViewBoard size={24} />
          <div className="flex-col flex gap-3">
            <p className="text-sm text-gray-700">Total User</p>
            <p className="text-lg text-gray-500">Data</p>
            <p className="text-sm text-gray-500">Another Data</p>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="max-w-64 flex  justify-items-end flex-col gap-3 w-full px-4 py-3 bg-gray-50">
        <div className="flex gap-4">
          <CiViewBoard size={24} />
          <div className="flex-col flex gap-3">
            <p className="text-sm text-gray-700">Total Class</p>
            <p className="text-lg text-gray-500">Data</p>
            <p className="text-sm text-gray-500">Another Data</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderInformation