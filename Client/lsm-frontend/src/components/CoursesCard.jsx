import { useNavigate } from "react-router-dom";

const CoursesCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/courses/description")}
      className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all duration-300"
          src={data?.thumbnail?.secure_url}
          alt=" coursesImage"
        />
      </div>
      <div className="p-3 space-y-1 text-white">
        <h2 className=" text-lg font-bold text-yellow-500 line-clamp-2">
          {data?.title}
        </h2>

        <p className="line-clamp-2">{data?.description}</p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold ">Category:</span>
          {data?.category}
        </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold ">Total Lecture:</span>
          {data?.numberOfLectures}
        </p>
      </div>
    </div>
  );
};

export default CoursesCard;
