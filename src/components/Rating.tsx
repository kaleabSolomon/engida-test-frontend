import { IoMdArrowDropup } from "react-icons/io";
import productHuntLogo from "../../public/assets/productHunt.svg";

const Rating: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="flex items-center">
        <img
          src={productHuntLogo}
          alt="Product Hunt"
          className="w-5 h-5 mr-2"
        />{" "}
        <span className="text-sm font-medium text-white">
          Trending on Product Hunt
        </span>
      </div>
      <span className="flex items-center bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        <IoMdArrowDropup size={24} /> 1,245 Upvotes
      </span>
    </div>
  );
};

export default Rating;
