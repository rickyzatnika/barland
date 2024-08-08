"use client"

import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';

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
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/numberStart`);
      const response = await fetch(`/api/numberStart`);
      const data = await response.json();
      setTakenNumbers(data);
    };

    const fetchRaceClasses = async () => {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/raceClasses`);
      const response = await fetch(`/api/raceClasses`);
      const data = await response.json();
      setRaceClasses(data);
    };

    fetchRaceClasses();

    fetchTakenNumbers();
  }, []);


  useEffect(() => {
    const totalPrice = formData.raceClass.length > 0 ? formData.raceClass.reduce((total, selectedClass) => {
      return total + selectedClass.price;
    }, 0) : 0;

    setFormData(prev => ({ ...prev, totalPrice }));
  }, [formData.raceClass]);
  // useEffect(() => {
  //   const totalPrice = formData.raceClass.reduce((total, selectedClass) => {
  //     return total + selectedClass.price;
  //   }, 0);

  //   setFormData(prev => ({ ...prev, totalPrice }));
  // }, [formData.raceClass]);


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
    if (formData.kis.length < 4 || formData.kis.length > 4) {
      toast.error("NIS Invalid, pastikan tidak lebih atau kurang dari 4 digit");
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
    const img = img;

    if (img !== null || img !== "") {
      await uploadImage();
    }

    setFormData((prev) => ({
      ...prev,
      img: img,
    }));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar`, {
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
        router.push('/');
        setIsModalOpen(false);
        setLoading(false);
        toast.success('Data terkirim');
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
    <div className='w-full h-full py-8'>
      {step === "1" && (
        <div className='w-full pb-6 px-2 sm:px-12 md:px-20 lg:px-28 2xl:px-32'>
          <div className='w-full flex flex-col sm:flex-row items-start pb-4 border-b-2 border-gray-700 mb-6 justify-between'>
            <div className='pb-3 leading-relaxed pt-2'>
              <h1 className='text-2xl uppercase text-gray-900 dark:text-white'>Formulir Pendaftaran</h1>
              <p className='text-gray-600 text-sm dark:text-white'>Calon Peserta EVENT BALAP PILPRES 2024</p>
              <span className='text-xs text-red-500'>*Mohon diisi dan Lengkapi</span>
            </div>
            <Image src="/flag.png" alt='race-flag' width={100} height={100} style={{ width: "auto", height: "auto" }} priority={true} />
          </div>
          <form onSubmit={handleSubmit} className='px-3 md:px-6 py-8 rounded-md md:py-12 bg-slate-50 dark:bg-slate-800 shadow-lg shadow-gray-200 dark:shadow-slate-950'>
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
      <Modal isOpen={isModalOpen} handleCancel={handleCancel} setStep={setStep}>
        {step === "2" && (
          <div className="h-[95vh] w-full sm:h-[90vh] sm:pb-14 overflow-hidden antialiased">
            <h2 className="text-lg py-4 text-center sm:text-xl bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 text-gray-50 dark:text-white mb-4">Pilih Nomor Start 1 - 300:</h2>
            <div className='px-4 pb-4'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 bg-gradient-to-t from-lime-600/80 via-lime-500/80  to-lime-400/80' />
                <p className='font-medium text-sm'>Nomor Masih Tersedia</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 bg-red-600' />
                <p className='font-medium text-sm'>Nomor Sudah Terpilih</p>
              </div>
              <p className='text-xs italic text-red-500 mt-2 font-semibold'>Notes : 1 Nomor Start untuk 1 Pembalap di semua kelas yang diikuti</p>
            </div>
            <div className="h-full pt-3 pb-60 sm:pb-52 px-4 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 2xl:grid-cols-12  gap-[1px] sm:gap-2 no-scrollbar overflow-y-scroll">

              {[...Array(300).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberSelect(num + 1)}
                  disabled={takenNumbers.includes(num + 1)}
                  className={`p-4 border rounded ${takenNumbers.includes(num + 1) ? 'bg-red-600 cursor-not-allowed' : 'bg-gradient-to-t from-lime-600/80 via-lime-500/80  to-lime-400/80 shadow-md text-gray-50 hover:bg-gradient-to-t hover:from-lime-600 hover:via-lime-500 hover:to-lime-400 transition-all duration-200 ease-linear cursor-pointer'}`}
                >
                  {num + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === "3" && (
          <div className="pt-2 pb-12 px-2 overflow-y-auto w-full h-full">
            <h2 className="w-full mb-2 text-md md:text-xl bg-gradient-to-tr from-green-400 to-lime-500 text-center py-4 uppercase font-bold text-white">Pilih Kelas</h2>
            <div className='pb-6 px-4'>
              <p className='italic text-md'>Silahkan pilih satu atau beberapa kelas yang ingin diikuti</p>
            </div>
            <div className="pb-2 grid gap-0 sm:gap-3 mb-0 sm:mb-2 md:grid-cols-2 ">
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
                        className='mr-2 w-4 h-4 text-green-400 bg-white dark:bg-slate-950  rounded border-none outline-none ring-0 focus:ring-none focus:outline-none focus:ring-offset-0 focus:border-none'
                      />
                      <span className='uppercase dark:text-slate-900 font-medium'>{cls.name}</span>
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
                <ul className='p-4 text-md flex flex-col gap-2 leading-relaxed'>
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
                <p className='font-semibold'><span className='text-sm'>Total Pembayaran Anda sebesar</span> : {formData.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} </p>
              </div>
              <div className='pb-3'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file <span className='text-xs text-red-500 italic'>(optional)</span></label>
                <input onChange={handleFileChange} name="img" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
              </div>
              <button onClick={() => setStep("5")} className="w-full sm:w-max bg-gradient-to-tr from-green-400 to-lime-500 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500 hover:scale-95 text-sm text-white py-2 px-4 rounded mt-6">
                {photo === null || photo === "" ? "Bayar dilokasi" : "Lanjut"}
              </button>
            </div>
          </div>
        )}
        {step === "5" && (
          <div className="p-1 sm:p-4 h-[85vh] overflow-y-auto">
            <h2 className="text-xl bg-gradient-to-tr from-green-400 to-lime-500 text-center py-4 uppercase font-bold text-white">Informasi Pendaftar</h2>
            <p className='text-sm text-center py-3'>Periksa Kembali data Anda. Jika sudah benar klik tombol submit dibawah</p>
            <div className="flex flex-col space-y-1 antialiased">
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700  py-3 px-4">
                <h3 className="text-sm font-bold ">Nama Lengkap :</h3>
                <p className='text-sm '>{formData.name}</p>
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700  py-3 px-4">
                <h3 className="text-sm font-bold ">Alamat  :</h3>
                <p className='text-sm '>{formData.address}</p>
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700 py-3 px-4">
                <h3 className="text-sm font-bold ">No.Handphone  :</h3>
                <p className='text-sm '>{formData.phone}</p>
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700 py-3 px-4">
                <h3 className="text-sm font-bold ">No.Identitas/NIK :</h3>
                <p className='text-sm '>{formData.nik}</p>
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700 py-3 px-4">
                <h3 className="text-sm font-bold ">NO.KIS :</h3>
                <p className='text-sm'>{formData.kis}</p>
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700 py-3 px-4">
                <h3 className="text-sm font-bold ">TEAM :</h3>
                <p className='text-sm'>{formData.team}</p>
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700 py-3 px-4">
                <h3 className="text-sm font-bold ">Nomor Start :</h3>
                <p className='text-sm '>{formData.numberStart}</p>
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700 py-3 px-4">
                <h3 className="text-sm font-bold ">Pembayaran :</h3>
                {!photo ? <p className='text-sm '>Dilokasi</p> : <p className='text-sm text-gray-600'>Transfer</p>}
              </div>
              <div className=" flex gap-2 border-b border-gray-300 dark:border-slate-700 py-3 px-4">
                <h3 className="text-sm font-bold ">Kelas yang diikuti :</h3>
                <p className='text-sm '> {formData.raceClass.map(cls => `${cls.name}`).join(", ")}</p>
              </div>
            </div>
            <div className='flex gap-12 w-full mt-3'>
              <button onClick={handleSave} className="text-white bg-gradient-to-tr from-green-400 to-lime-500 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500 hover:scale-95 text-sm py-2 px-4 rounded mt-4 w-full">
                {loading ? <div className="flex gap-2 items-center justify-center">
                  <span className=" text-white">Loading... </span>
                  <span className="loader"></span>
                </div> : "Submit"}
              </button>
              <button onClick={handleCancel} className="bg-red-400 hover:bg-red-500 hover:scale-95 w-full text-sm text-white py-2 px-4 rounded mt-4">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Daftar;


