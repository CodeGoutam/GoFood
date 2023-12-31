import React, { createContext, useContext, useReducer } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          quantity: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "UPDATE": {
      let stateArr = [...state];
      for (let i = 0; i < stateArr.length; i++) {
        if (stateArr[i].id === action.id) {
          stateArr[i] = {
            ...stateArr[i],
            quantity: parseInt(action.qty) + stateArr[i].quantity,
            price: stateArr[i].price + action.price,
          };
          console.log("update chla");
        }
      }
      return stateArr;
    }

    case "CHECKOUT": {
      let chekout = [];
      return chekout;
    }
    case "REMOVE": {
      let arr = [...state];
     arr.splice(action.index,1)
      return arr;
    }
  }
};
export const ContextReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
