import { CgShoppingCart } from "react-icons/cg";

type NothingInCartProps = {
  title: string;
  description: string;
};

const NothingInCart = ({ description, title }: NothingInCartProps) => {
  return (
    <div className="w-[300px] md:w-[600px] mx-auto flex items-center justify-center flex-col">
      <div className="p-5 bg-[#F8F8F8] w-32 h-32 rounded-full flex items-center justify-center">
        <CgShoppingCart className="w-14 h-14 text-gray-300" />
      </div>
      <h2 className="mt-5 font-semibold text-xl text-wording">{title}</h2>

      <p className="mt-7 text-center text-gray-500">{description}</p>
    </div>
  );
};

export default NothingInCart;
