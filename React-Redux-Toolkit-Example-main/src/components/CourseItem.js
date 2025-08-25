import React from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeItem, increase, decrease } from "../control/cartSlice";

function CourseItem({ id, title, description, price, img, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className='cartItem'>
      <img src={img} alt='' />
      <div className='cartInfo'>
        <h4>{title}</h4>
        <h4>{description}</h4>
        <h4>{price}TL</h4>
        <div className='buttons'>
          <button
            className='cartQuantityButton'
            id='up'
            onClick={() => {
              dispatch(increase(id));
            }}>
            <BsChevronUp />
          </button>
          <p className='cartQuantity'>{quantity}</p>
          <button
            className='cartQuantityButton'
            id='down'
            onClick={() => {
              dispatch(decrease(id));
            }}>
            <BsChevronDown />
          </button>
        </div>
        <button
          className='cartDeleteButton'
          onClick={() => {
            dispatch(removeItem(id));
          }}>
          Sil
        </button>
      </div>
    </div>
  );
}

export default CourseItem;
