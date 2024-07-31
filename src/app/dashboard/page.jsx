
import TableRiders from "@/components/TableRiders";




async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar`, {
    method: "GET",
    cache: "no-store", // this will fresh data on every fetch request;
    // next: { revalidate: 10 }, // and this , will be refresh data every 10 seconds;
  });
  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res.json();

}




const DashboardPage = async () => {

  const riders = await getData();
  console.log(riders);


  return (

    <TableRiders riders={riders} />

  );
}

export default DashboardPage