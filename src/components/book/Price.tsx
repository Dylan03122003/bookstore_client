import React from "react";

type PriceProps = {
  price: number;
};

const Price = ({ price }: PriceProps) => {
  const splitedPrice = price.toString().split(".");
  const frontPrice = splitedPrice[0];

  const backPrice = splitedPrice.length > 1 ? splitedPrice[1] : "00";
  return (
    <div className="flex items-center justify-center">
      <p className="-translate-y-1 text-xs font-semibold">$</p>
      <p className="font-semibold">{frontPrice}</p>
      <p className="-translate-y-1 text-xs font-semibold">.{backPrice}</p>
    </div>
  );
};

export default Price;
