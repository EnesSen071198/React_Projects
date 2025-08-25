import React from "react";
import { BsFillBasketFill } from "react-icons/bs";
import { useSelector } from "react-redux";

function Navbar() {
  // Hem quantity hem de total değerlerini Redux store'dan alıyoruz
  const { quantitiy, total } = useSelector((store) => store.cart);

  return (
    <nav>
      <div className='navbar'>
        <h2>Gurme Balıkçılık</h2>
        <div className='navDiv'>
          <h2>
            Toplam Tutar: <span>{total} TL</span>
          </h2>
          <BsFillBasketFill className='itemsIcon' />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
