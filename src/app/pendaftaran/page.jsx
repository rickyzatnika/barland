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
import ReCAPTCHA from 'react-google-recaptcha';

const Daftar = () => {
  const [step, setStep] = useState("1");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  const router = useRouter();
  const [takenNumbers, setTakenNumbers] = useState([]);
  const [raceClasses, setRaceClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const CLOUD_NAME = "inkara-id";
  const UPLOAD_PRESET = "myBlog_project_nextjs";

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
    recaptchaToken,
  });


  useEffect(() => {
    const fetchTakenNumbers = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/numberStart`);
      // const response = await fetch(`/api/numberStart`);
      const data = await response.json();
      setTakenNumbers(data);
    };

    const fetchRaceClasses = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/raceClasses`);
      // const response = await fetch(`/api/raceClasses`);
      const data = await response.json();
      setRaceClasses(data);
    };

    fetchRaceClasses();

    fetchTakenNumbers();
  }, []);


  useEffect(() => {
    const totalPrice = formData.raceClass.reduce((total, selectedClass) => {
      return total + selectedClass.price;
    }, 0);

    setFormData(prev => ({ ...prev, totalPrice }));
  }, [formData.raceClass]);


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




  const handleClassChange = (event) => {
    const { value, checked } = event.target;
    const [className, classPrice] = value.split(',');

    setFormData(prevData => {
      const updatedClasses = checked
        ? [...(prevData.raceClass || []), { name: className, price: Number(classPrice) }]
        : (prevData.raceClass || []).filter(selectedClass => selectedClass.name !== className);

      return { ...prevData, raceClass: updatedClasses };
    });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.nik.length !== 16) {
      toast.error("NIK Invalid, pastikan tidak lebih dari 16 digit");
      return;
    }
    if (formData.kis.length !== 8) {
      toast.error("NIS Invalid, pastikan tidak lebih dari 8 digit");
      return;
    }

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }

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

  const handleNextStep = () => {
    if (formData.raceClass.length === 0) {
      toast.error("Silahkan pilih setidaknya satu kelas.");
      return;
    }
    setStep("4");
  };


  const handleSave = async () => {

    setLoading(true);
    const img = await uploadImage();

    setFormData((prev) => ({
      ...prev,
      img: img,
    }));

    const res = await fetch('/api/daftar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, img, recaptchaToken }),

    });

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

      const data = await res.json();
      const img = data["secure_url"];
      return img;
    } catch (error) {
      console.log(error);
    }
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    setStep("1");
  }



  return (
    <div className='w-full h-full py-0 sm:py-14'>
      {step === "1" && (
        <div className='w-full pb-6 px-2 sm:px-12 md:px-20 lg:px-28 2xl:px-32'>
          <div className='pb-3 leading-relaxed border-lime-600 border-b-2 pt-2'>
            <h1 className='text-2xl uppercase text-gray-900 dark:text-white'>Formulir Pendaftaran</h1>
            <p className='text-gray-600 text-sm dark:text-white'>Calon Peserta EVENT BALAP PILPRES 2024</p>
            <span className='text-xs text-red-500'>*Mohon diisi dan Lengkapi</span>
          </div>
          <form onSubmit={handleSubmit} className='px-3 md:px-6 py-8 md:py-12 bg-green-900/5 shadow-md'>
            <div className="grid gap-3 md:gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap :</label>
                <input onChange={handleChange} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat :</label>
                <input onChange={handleChange} type="text" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Handphone :</label>
                <input onChange={handleChange} type="tel" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="nik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No.Identitas/NIK :</label>
                <input onChange={handleChange} type="number" name="nik" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="kis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. KIS :</label>
                <input onChange={handleChange} type="number" name="kis" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="team" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Team :</label>
                <input onChange={handleChange} type="text" name="team" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-400 focus:border-lime-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
            </div>
            <div className='my-3 flex flex-col gap-4'>
              <ReCAPTCHA
                sitekey="6Lf7CR4qAAAAAJ7hgQnouK4fA0c58Z1fxEm_6d5a"
                onChange={handleRecaptchaChange}
              />
              <button className="w-max h-max bg-gradient-to-tr from-green-400 to-lime-500 text-sm text-white py-2 px-4 rounded" type="submit">Lanjut</button>
            </div>
          </form>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {step === "2" && (
          <div className="h-[95vh] w-full sm:h-[90vh] sm:pb-14 overflow-hidden antialiased">
            <h2 className="text-lg py-4 text-center sm:text-xl bg-gradient-to-tr from-green-400 to-lime-500 text-gray-50 dark:text-white mb-4">Pilih Nomor Start 1 - 300:</h2>
            <div className='px-4 pb-4'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 bg-green-400' />
                <p className='text-gray-600 text-md dark:text-gray-300'>Nomor Masih Tersedia</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 bg-red-600' />
                <p className='text-gray-600 text-md dark:text-gray-300'>Nomor Sudah Terpilih</p>
              </div>
              <p className='text-xs italic text-red-500 mt-2 font-semibold'>Notes : 1 Nomor Start untuk 1 Pembalap di semua kelas yang diikuti</p>
            </div>
            <div className="h-full pt-3 pb-60 sm:pb-52 px-4 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 2xl:grid-cols-12  gap-[1px] sm:gap-2 no-scrollbar overflow-y-scroll">

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
          <div className="p-2 overflow-y-auto w-full h-full">
            <h2 className="w-full mb-2 text-md md:text-xl bg-gradient-to-tr from-green-400 to-lime-500 text-center py-4 uppercase font-bold text-white">Pilih Kelas</h2>
            <div className='pb-6 px-4'>
              <p className='text-gray-500 italic text-md'>Silahkan pilih satu atau beberapa kelas yang ingin diikuti</p>
            </div>
            <div className="bg-white pb-6 grid gap-0 sm:gap-3 mb-0 sm:mb-2 md:grid-cols-2 ">
              {raceClasses.map((raceClass) => (
                <div key={raceClass.title} className="w-full bg-orange-100 mb-4">
                  <h3 className="text-md bg-orange-400 py-2 px-3 uppercase font-semibold mb-2">{raceClass.title}</h3>
                  {raceClass.classes.map((cls) => (
                    <label key={cls.name} className="block mb-3 text-sm px-3 ">
                      <input

                        type="checkbox"
                        id="green-checkbox"
                        value={`${cls.name},${cls.price}`}
                        checked={formData.raceClass.some(selectedClass => selectedClass.name === cls.name)}
                        onChange={handleClassChange}
                        className='mr-2 w-4 h-4 text-green-400 bg-gray-100 border-gray-300 rounded focus:ring-green-400 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <span className='uppercase'>{cls.name}</span>
                      <span className='hidden'>{cls.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <button onClick={handleNextStep} className="w-full sm:w-max bg-gradient-to-tr from-green-400 to-lime-500 text-sm text-white py-2 px-4 rounded">Lanjut</button>
          </div>
        )}
        {step === "4" && (
          <div className="overflow-y-auto w-full h-full">
            <h1 className='text-xl text-center bg-gradient-to-tr from-green-400 to-lime-500 py-4 font-bold text-white/90'>INFORMASI PEMBAYARAN</h1>
            <div className='flex flex-col gap-4 pb-12 sm:pb-4'>
              <div className='border rounded-b-md border-gray-400 px-4 pt-2 pb-4'>
                <ul className='p-4 text-md flex flex-col gap-2 text-gray-600'>
                  <li className='list-decimal'>Pembayaran dapat melalui Transfer Bank atau langsung dilokasi kepada panitia penyelenggara.</li>
                  <li className='list-decimal'>
                    Untuk pembayaran melalui Transfer Bank, kirim ke No.REK berikut :
                    <ul className='p-2'>

                      <li className='list-inside list-disc'>No Rekening: XXXXXXXXXX</li>
                      <li className='list-inside list-disc'>Atas Nama: XXXXXX</li>
                      <li className='list-inside list-disc'>Bank: XXXX</li>
                      <li className='list-inside list-disc'>Kode Bank: XXXX</li>

                    </ul>
                  </li>
                  <li className='list-decimal'>Upload dan simpan bukti pembayaran :</li>
                  <li className='list-decimal'>Transfer selain kepada No.REK yang tertera diatas, tidak sah!</li>

                </ul>
                <p className='text-gray-700 font-semibold'><span className='text-gray-500 text-sm'>Total Pembayaran Anda sebesar</span> : {formData.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </p>
              </div>
              <div className='pb-3'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file <span className='text-xs text-red-500 italic'>(optional)</span></label>
                <input onChange={handleFileChange} name="img" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
              </div>
              <button onClick={() => setStep("5")} className="w-full sm:w-max bg-gradient-to-tr from-green-400 to-lime-500 text-sm text-white py-2 px-4 rounded mt-6">Lanjut</button>
            </div>
          </div>
        )}
        {step === "5" && (
          <div className="p-1 sm:p-4 h-[85vh] overflow-y-auto">
            <h2 className="text-xl bg-gradient-to-tr from-green-400 to-lime-500 text-center py-4 uppercase font-bold text-white/90">Informasi Pendaftar</h2>
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
                {!photo ? <p className='text-sm text-gray-600'>Dilokasi</p> : <p className='text-sm text-gray-600'>Transfer</p>}
              </div>
              <div className=" flex gap-4 border border-gray-300 py-3 px-4 rounded">
                <h3 className="text-sm font-bold text-gray-600">Kelas yang diikuti:</h3>
                <p className='text-sm text-gray-600'> {formData.raceClass.map(cls => `${cls.name}`).join(", ")}</p>
              </div>
            </div>
            <div className='flex w-full mt-3'>
              <button onClick={handleSave} className="bg-gradient-to-tr from-green-400 to-lime-500 text-md text-white py-2 px-4 rounded mt-4 w-full">
                {loading ? 'Loading...' : 'Submit'}
              </button>
              <button onClick={handleCancel} className="bg-red-400 w-full text-md text-white py-2 px-4 rounded mt-4">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Daftar;


