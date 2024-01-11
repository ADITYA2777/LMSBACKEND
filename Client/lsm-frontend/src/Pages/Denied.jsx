import { useNavigate } from "react-router-dom"



const Denied = () => {
    const navigate = useNavigate()
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238}">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        403
      </h1>
      <div className="bg-black text-white px-2 text-sm rounded-sm items-center rotate-12 absolute">
        Access denied ..
      </div>

      <button className="mt-5">
        <a className="relative inline-block text-md font-medium text-[#FF6A3D] group active:text-yellow-400">
          <span
            onClick={() => navigate(-1)}
            className="relative block px-8 py-3 bg-[#1A2238] border-2 border-red-300"
          >
            {" "}
            Go Back 😉
          </span>
        </a>
      </button>
    </div>
  );
}

export default Denied