// "use client"


// import Modal from '@/components/Modal';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';



// const Daftar = () => {

//   const [step, setStep] = useState("1");
//   const [loading, setLoading] = useState(false);
//   const [photo, setPhoto] = useState("");
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     numberStart: null,
//     team: '',
//     kis: '',
//     nik: '',
//     phone: '',
//     raceClass: [], // Mengubah menjadi array


//   });
//   const [takenNumbers, setTakenNumbers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const CLOUD_NAME = "inkara-id";
//   const UPLOAD_PRESET = "myBlog_project_nextjs";


//   useEffect(() => {
//     const fetchTakenNumbers = async () => {
//       const response = await fetch('/api/numberStart');
//       const data = await response.json();
//       setTakenNumbers(data);
//     };

//     fetchTakenNumbers();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   const handleFileChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };



//   const handleClassChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       raceClass: checked
//         ? [...prev.raceClass, value]
//         : prev.raceClass.filter((cls) => cls !== value),
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setStep("2"); // Lanjut ke modal Nomor Start
//     setIsModalOpen(true);
//   };

//   const handleNumberSelect = (num) => {
//     setFormData((prev) => ({
//       ...prev,
//       numberStart: num,
//     }));
//     setStep("3");
//   };

//   const handleSave = async () => {

//     const img = await uploadImage();

//     setFormData((prev) => ({
//       ...prev,
//       img: img,
//     }));

//     const res = await fetch('/api/daftar', {
//       method: 'POST',
//       body: JSON.stringify({
//         ...formData,
//         img,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },

//     });

//     setLoading(true);

//     if (res.ok) {
//       const timeoutId = setTimeout(() => {

//         setFormData({
//           name: '',
//           address: '',
//           numberStart: null,
//           team: '',
//           kis: '',
//           nik: '',
//           phone: '',
//           img: '',
//           raceClass: [],

//         });
//         router.push('/events');
//         setIsModalOpen(false);
//         setLoading(false);
//         // Handle success (e.g., show a success message or redirect)
//         toast.success('Berhasil mendaftar');

//       }, 3000);

//       const errorData = await res.json();
//       toast.error(errorData.message);

//       return () => clearTimeout(timeoutId);

//     } else {
//       console.error("Failed to save data");
//       toast.error("Internal Server Error");
//     }
//   };


//   const uploadImage = async () => {

//     const formData = new FormData();

//     formData.append("file", photo);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       console.log(res.ok ? "success" : null)
//       const data = await res.json();
//       const img = data["secure_url"];

//       return img;
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div className='w-full py-0 sm:py-14'>
//       {step === "1" && (
//         <div className='w-full px-2 sm:px-12 md:px-20 lg:px-28 2xl:px-32'>
//           <form className="bg-slate-50 px-2 py-4  sm:px-12 md:px-20 lg:px-28 shadow-md sm:py-14 flex flex-col space-y-6 rounded-md" onSubmit={handleSubmit}>
//             <h1 className="uppercase py-4 text-xl text-center ">Form Pendaftaran</h1>
//             <input className="border py-3 px-4" type="text" name="name" placeholder="Nama Lengkap" required onChange={handleChange} />
//             <input className="border py-3 px-4" type="text" name="address" placeholder="Alamat" required onChange={handleChange} />
//             <input className="border py-3 px-4" type="number" name="phone" placeholder="Nomor Handphone" required onChange={handleChange} />
//             <input className="border py-3 px-4" type="text" name="team" placeholder="Team" required onChange={handleChange} />
//             <input className="border py-3 px-4" type="number" name="kis" placeholder="Nomor KIS" required onChange={handleChange} />
//             <input className="border py-3 px-4" type="text" name="nik" placeholder="NIK KTP" required onChange={handleChange} />
//             <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Lanjut</button>
//           </form>
//         </div>

//       )}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         {step === "2" && (

//           <div className="h-[60vh] sm:h-[70vh] sm:py-24 overflow-hidden antialiased">
//             <h2 className="text-md py-2 sm:text-xl mb-4">Pilih Nomor Start :</h2>
//             <div className="h-full pb-14 grid grid-cols-4 sm:grid-cols-5 gap-[1px] sm:gap-2 overflow-y-scroll">
//               {[...Array(300).keys()].map((num) => (
//                 <button
//                   key={num}
//                   onClick={() => handleNumberSelect(num + 1)}
//                   disabled={takenNumbers.includes(num + 1)}
//                   className={`p-4 border rounded ${takenNumbers.includes(num + 1) ? 'bg-red-600 cursor-not-allowed' : 'bg-green-400 hover:bg-green-500 cursor-pointer'}`}
//                 >
//                   {num + 1}
//                 </button>
//               ))}
//             </div>
//           </div>

//         )}
//         {step === "3" && (
//           <div className="p-4 antialiased">
//             <h2 className="text-md sm:text-xl mb-4">Pilih Kategori Kelas :</h2>
//             <div className="flex flex-wrap items-start gap-6">
//               <label>
//                 <input
//                   type="checkbox"
//                   value="Class A"
//                   checked={formData.raceClass.includes("Class A")}
//                   onChange={handleClassChange}
//                 />
//                 Class A
//               </label>
//               <label>
//                 <input
//                   type="checkbox"
//                   value="Class B"
//                   checked={formData.raceClass.includes("Class B")}
//                   onChange={handleClassChange}
//                 />
//                 Class B
//               </label>
//               <label>
//                 <input
//                   type="checkbox"
//                   value="Class C"
//                   checked={formData.raceClass.includes("Class C")}
//                   onChange={handleClassChange}
//                 />
//                 Class C
//               </label>
//               <label>
//                 <input
//                   type="checkbox"
//                   value="Class D"
//                   checked={formData.raceClass.includes("Class D")}
//                   onChange={handleClassChange}
//                 />
//                 Class D
//               </label>
//             </div>
//             <button onClick={() => setStep("4")} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Lanjut</button>
//           </div>
//         )}

//         {step === "4" && (
//           <div className="p-4">
//             <h2 className="text-xl mb-4">Upload Bukti Pembayaran</h2>
//             <input type="file" name={photo} onChange={handleFileChange} className="border p-2" />
//             <button onClick={() => setStep("5")} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Lanjut</button>
//           </div>
//         )}

//         {step === "5" && (
//           <div className="p-4">
//             <h2 className="text-xl mb-4">Informasi Pendaftar</h2>
//             <div className="flex flex-col space-y-2 antialiased">
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">Nama Lengkap :</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.name}
//                 </p>
//               </div>
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">Alamat:</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.address}
//                 </p>
//               </div>
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">No. Handphone:</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.phone}
//                 </p>
//               </div>
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">NIK:</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.nik}
//                 </p>
//               </div>
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">NO. KIS:</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.kis}
//                 </p>
//               </div>
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">TEAM:</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.team}
//                 </p>
//               </div>
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">Nomor Start:</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.numberStart}
//                 </p>
//               </div>
//               <div className="border border-gray-300 flex justify-between gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">Bukti Pembayaran:</h3>
//                 <Image src={formData.img} alt='bukti-pembayaran' width={32} height={32} className='object-cover w-8 h-8' />
//               </div>
//               <div className="border border-gray-300 flex gap-3 py-3 px-4 rounded">
//                 <h3 className="text-sm font-bold text-gray-600">Kelas:</h3>
//                 <p className='text-sm text-gray-600'>
//                   {formData.raceClass.join(', ')}
//                 </p>
//               </div>
//             </div>
//             <div className='flex w-full mt-3'>
//               <button onClick={handleSave} className="bg-green-500 w-full text-white py-2 px-4 rounded mt-4">
//                 {loading ? 'Loading...' : 'Submit'}
//               </button>
//               <button onClick={() => setIsModalOpen(false)} className="bg-red-400 w-full text-white py-2 px-4 rounded mt-4">Cancel</button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Daftar;



"use client"

import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Daftar = () => {
  const [step, setStep] = useState("1");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    numberStart: null,
    team: '',
    kis: '',
    nik: '',
    phone: '',
    raceClass: [], // Array of objects
    totalPrice: 0,
  });
  const [takenNumbers, setTakenNumbers] = useState([]);
  const [raceClasses, setRaceClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CLOUD_NAME = "inkara-id";
  const UPLOAD_PRESET = "myBlog_project_nextjs";

  useEffect(() => {
    const fetchTakenNumbers = async () => {
      const response = await fetch('/api/numberStart');
      const data = await response.json();
      setTakenNumbers(data);
    };

    const fetchRaceClasses = async () => {
      const response = await fetch('/api/raceClasses');
      const data = await response.json();
      setRaceClasses(data);
    };

    fetchRaceClasses();

    fetchTakenNumbers();
  }, []);


  useEffect(() => {
    const totalPrice = formData.raceClass.reduce((total, selectedClass) => {
      const raceClass = raceClasses.find(cls => cls.name === selectedClass);
      return total + (raceClass ? raceClass.price : 0);
    }, 0);

    setFormData(prev => ({ ...prev, totalPrice }));
  }, [formData.raceClass, raceClasses]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleClassChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      raceClass: checked
        ? [...prev.raceClass, value]
        : prev.raceClass.filter((cls) => cls !== value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStep("2");
    setIsModalOpen(true);
  };

  const handleNumberSelect = (num) => {
    setFormData((prev) => ({
      ...prev,
      numberStart: num,
    }));
    setStep("3");
  };

  const handleSave = async () => {
    const img = await uploadImage();

    setFormData((prev) => ({
      ...prev,
      img: img,
    }));

    const res = await fetch('/api/daftar', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setLoading(true);

    if (res.ok) {
      const timeoutId = setTimeout(() => {
        setFormData({
          name: '',
          address: '',
          numberStart: null,
          team: '',
          kis: '',
          nik: '',
          phone: '',
          img: '',
          raceClass: [],
          totalPrice: 0, // Reset total price
        });
        router.push('/events');
        setIsModalOpen(false);
        setLoading(false);
        toast.success('Berhasil mendaftar');
      }, 3000);

      const errorData = await res.json();
      toast.error(errorData.message);

      return () => clearTimeout(timeoutId);
    } else {
      console.error("Failed to save data");
      toast.error("Internal Server Error");
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(res.ok ? "success" : null)
      const data = await res.json();
      const img = data["secure_url"];
      return img;
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className='w-full h-[calc(100vh-80px)] py-0 sm:py-14'>
      {step === "1" && (
        <div className='w-full px-2 sm:px-12 md:px-20 lg:px-28 2xl:px-32'>
          <form className="bg-slate-50 px-2 py-4  sm:px-12 md:px-20 lg:px-28 shadow-md sm:py-14 flex flex-col space-y-6 rounded-md" onSubmit={handleSubmit}>
            <h1 className="uppercase py-4 text-xl text-center ">Form Pendaftaran</h1>
            <input className="border py-3 px-4" type="text" name="name" placeholder="Nama Lengkap" required onChange={handleChange} />
            <input className="border py-3 px-4" type="text" name="address" placeholder="Alamat" required onChange={handleChange} />
            <input className="border py-3 px-4" type="number" name="phone" placeholder="Nomor Handphone" required onChange={handleChange} />
            <input className="border py-3 px-4" type="text" name="team" placeholder="Team" required onChange={handleChange} />
            <input className="border py-3 px-4" type="number" name="kis" placeholder="Nomor KIS" required onChange={handleChange} />
            <input className="border py-3 px-4" type="text" name="nik" placeholder="NIK KTP" required onChange={handleChange} />
            <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Lanjut</button>
          </form>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {step === "2" && (
          <div className="h-[85vh] w-full sm:h-[90vh] sm:pb-14 overflow-hidden antialiased">
            <h2 className="text-md py-2 sm:text-xl mb-4">Pilih Nomor Start 1 - 300:</h2>
            <div className="h-full pb-14 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 2xl:grid-cols-12  gap-[1px] sm:gap-2 no-scrollbar overflow-y-scroll">
              {[...Array(300).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberSelect(num + 1)}
                  disabled={takenNumbers.includes(num + 1)}
                  className={`p-4 border rounded ${takenNumbers.includes(num + 1) ? 'bg-red-600 cursor-not-allowed' : 'bg-green-400 hover:bg-green-500 cursor-pointer'}`}
                >
                  {num + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === "3" && (
          <div className="">
            <h2 className="w-full mb-6 text-xl bg-gradient-to-tr from-green-400 to-lime-500 text-center py-4 uppercase font-bold text-gray-600">Pilih Kelas :</h2>
            <div className="flex flex-wrap items-start gap-6">
              {raceClasses.map((raceClass) => (
                <label key={raceClass.name}>
                  <input
                    type="checkbox"
                    value={raceClass.name}
                    checked={formData.raceClass.includes(raceClass.name)}
                    onChange={handleClassChange}
                    className='mr-2 active:bg-black cursor-pointer'
                  />
                  {raceClass.name} - {raceClass.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </label>
              ))}
            </div>
            <button onClick={() => setStep("4")} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Lanjut</button>
          </div>
        )}

        {step === "4" && (
          <div className="">
            <h1 className='text-xl text-center bg-gradient-to-tr from-green-400 to-lime-500 py-4 font-bold text-gray-600'>INFORMASI PEMBAYARAN</h1>
            <div className='flex flex-col md:flex-row gap-10'>
              <div className='border rounded-b-md border-gray-400 px-4 py-4'>
                <ul className='p-4'>
                  <li className='list-decimal'>Pembayaran biaya pendaftaran dapat melalui Transfer Bank atau langsung dilokasi kepada penyelenggara.</li>
                  <li className='list-decimal'>
                    Untuk pembayaran melalui Transfer Bank, kirim ke No.REK berikut :
                    <ul className='px-2'>

                      <li className='list-inside list-disc'>No Rekening: XXXXXXXXXX</li>
                      <li className='list-inside list-disc'>Atas Nama: XXXXXX</li>
                      <li className='list-inside list-disc'>Bank: XXXX</li>

                    </ul>
                  </li>
                  <li className='list-decimal'>Upload dan simpan bukti pembayaran.</li>
                  <li className='list-decimal'>Transfer dana selain kepada No.REK yang tertera diatas, tidak sah.</li>
                </ul>
                <p>Total Pembayaran Anda sebesar : {formData.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </p>
              </div>
              <div className=''>
                <h2 className="text-xl mb-4">Upload Bukti Pembayaran</h2>
                <input type="file" onChange={handleFileChange} className="border p-2" />
                <button onClick={() => setStep("5")} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Lanjut</button>
              </div>
            </div>
          </div>
        )}
        {step === "5" && (
          <div className="p-1 sm:p-4 h-[85vh] overflow-y-auto">
            <h2 className="text-xl bg-gradient-to-tr from-green-400 to-lime-500 text-center py-4 uppercase font-bold text-gray-600">Informasi Pendaftar</h2>
            <div className="flex flex-col space-y-1 antialiased">
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">Nama Lengkap :</h3>
                <p className='text-sm text-gray-600'>{formData.name}</p>
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">Alamat:</h3>
                <p className='text-sm text-gray-600'>{formData.address}</p>
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">No. Handphone:</h3>
                <p className='text-sm text-gray-600'>{formData.phone}</p>
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">NIK:</h3>
                <p className='text-sm text-gray-600'>{formData.nik}</p>
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">NO. KIS:</h3>
                <p className='text-sm text-gray-600'>{formData.kis}</p>
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">TEAM:</h3>
                <p className='text-sm text-gray-600'>{formData.team}</p>
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">Nomor Start:</h3>
                <p className='text-sm text-gray-600'>{formData.numberStart}</p>
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">Pembayaran:</h3>
                {formData.img === "" ? <p className='text-sm text-red-500'>Belum Upload</p> : <p className='text-sm text-gray-600'>Dalam proses pengecekan</p>}
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">Kelas yang diikuti:</h3>
                <p className='text-sm text-gray-600'>{formData.raceClass.join(" - ")}</p>
              </div>
              {/* <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">Total Harga:</h3>
                <p className='text-sm text-gray-600'>{formData.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
              </div> */}
            </div>
            <div className='flex w-full mt-3'>
              <button onClick={handleSave} className="bg-green-500 w-full text-white py-2 px-4 rounded mt-4">
                {loading ? 'Loading...' : 'Submit'}
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-red-400 w-full text-white py-2 px-4 rounded mt-4">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Daftar;