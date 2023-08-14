type QuantityPurchasedProps = {
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  id: string;
  bookInCartQuantity: number;
};

const QuantityPurchased = ({
  onDecrease,
  onIncrease,
  bookInCartQuantity,
  id,
}: QuantityPurchasedProps) => {
  return (
    <div className="w-[120px] sm:w-[150px] flex items-center justify-between  border border-solid border-gray-200 rounded-md">
      <button
        onClick={() => onDecrease(id)}
        className="p-2 text-2xl  w-full font-medium"
      >
        -
      </button>
      <p className="text-gray-700 font-medium">{bookInCartQuantity}</p>
      <button
        onClick={() => onIncrease(id)}
        className="p-2 text-2xl  w-full font-medium"
      >
        +
      </button>
    </div>
  );
};

export default QuantityPurchased;
