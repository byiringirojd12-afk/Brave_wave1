
export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      <h3 className="text-lg font-semibold text-gray-800">Admin Overview</h3>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-900">Offspace Admin</p>
          <p className="text-xs text-gray-500">Super Admin</p>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-[#B9FF66]" />
      </div>
    </header>
  );
}