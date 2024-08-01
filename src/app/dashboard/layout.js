import Aside from "@/components/Dashboard/Aside";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="basis-52">
        <Aside />
      </div>
      <div className="flex-grow basis-52">{children}</div>
    </div>
  );
}
