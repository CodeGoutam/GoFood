import React, { useState, useEffect, useRef } from "react";
import { useCartDispatch, useCartState } from "../ContextReducer";
const Card = (props) => {
  let sizeRef = useRef();
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  let dispatch = useCartDispatch();
  let state = useCartState();
  let option = Object.keys(props.options[0]);
  let options = props.options[0];
  let price = options[size] * qty;
  useEffect(() => {
    setSize(sizeRef.current.value);
  }, []);
  let addToCart = async () => {
    let flag = 0;
    for (let element of state) {
      if (element.id === props.foodItem._id && element.size == size) {
        console.log("update chla kya");
        flag = 1;
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          name: props.foodItem.name,
          img: props.foodItem.img,
          price: price,
          qty: qty,
          size: size,
        });

        break;
      }
    }
    if (flag != 1)
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        img: props.foodItem.img,
        price: price,
        qty: qty,
        size: size,
      });
    // console.log("state:", state);
  };
  return (
    <>
      <div
        className="card"
        style={{ alignItems: "center", width: "90%", padding: "1px" }}
      >
        <img
          className="p-1"
          src={props.foodItem.img}
          alt="..."
          style={{ height: "200px", width: "100%", objectFit: "fill" }}
        />
        <div className="card-body">
          <h6 className="card-title">{props.foodItem.name}</h6>
          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              className="form-select m-2 "
              style={{ width: "auto" }}
              onChange={(e) => setQty(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            Size:-
            <select
              className="form-select m-2"
              style={{ width: "auto" }}
              ref={sizeRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {option.map((data) => {
                return (
                  <>
                    <option value={data}>{data}</option>
                  </>
                );
              })}
            </select>
          </div>
          <h6>Total Price :-{price}</h6>
          <button className="btn btn-primary" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
};
export default Card;
