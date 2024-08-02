import Aside from "@/components/Dashboard/Aside";

export default function DashboardLayout({ children }) {
  return (
    <div className="w-full h-full flex ">
      <div className="basis-52 border-r-2 h-screen">
        <Aside />
      </div>
      <div className="relative flex-grow w-full h-full px-4 py-2">
        {children}
      </div>
    </div>
  );
}
