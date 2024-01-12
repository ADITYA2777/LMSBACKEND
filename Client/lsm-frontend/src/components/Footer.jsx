import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";
const Footer = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  return (
    <footer className="relative  left-0 bottom-0 flex flex-col h-[10vh] sm:flex-row py-5 items-center justify-between text-white bg-gray-800 ">
      <section className="text-lg ">
        Copyright {year} | All rights reserved
      </section>
      <section className="flex items-center gap-5 justify-center text-2xl text-white">
        <a className="hover:text-yellow-500 transition-all  ease-in-out duration-300">
          <BsFacebook />
        </a>
        <a className="hover:text-yellow-500 transition-all  ease-in-out duration-300">
          <BsInstagram />
        </a>
        <a className="hover:text-yellow-500 transition-all  ease-in-out duration-300">
          <BsLinkedin />
        </a>
        <a className="hover:text-yellow-500 transition-all  ease-in-out duration-300">
          <BsTwitterX />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
