import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 py-12 items-center justify-center ">
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-2 items-start justify-center">
        <div className="w-full flex flex-col flex-1 gap-1 sm:gap-3 ">
          <div className="leading-relaxed text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl">
            <h1 className="font-medium">
              IKUTI{" "}
              <span className="font-extrabold">
                <span className="font-extrabold bg-gradient-to-tr from-green-400 to-lime-500 bg-clip-text text-transparent">
                  BALAP{" "}
                </span>
                NASIONAL
              </span>
            </h1>
            <h3 className="font-semibold">PIALA PRESIDEN 2024</h3>
          </div>
          <p className="text-md px-1 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            exercitationem totam aspernatur alias harum nesciunt!
          </p>
          <Link
            className="text-center w-max py-3 antialiased font-semibold text-md shadow-lg px-4 bg-gradient-to-tr from-green-400 to-lime-500 text-gray-50 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500 hover:text-white transition-all ease-linear duration-150 hover:scale-95 rounded-xl "
            href="/pendaftaran"
          >
            PENDAFTARAN
          </Link>
        </div>
        <div className="w-full h-full relative flex-1">
          <Image
            src="/event.jpg"
            alt=""
            sizes="100%"
            width={500}
            height={900}
            priority={true}
            className="object-right object-cover w-[500px] sm:w-full h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
