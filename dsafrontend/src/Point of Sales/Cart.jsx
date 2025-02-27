import { IoTrashOutline } from "react-icons/io5";

import axios from "axios";
import { useState, useEffect } from "react";
import SuccessPopUp from "../components/SuccessPopUp";

export function Cart({ cart, setCart }) {
  const increaseQuantity = (id, stocks) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, newStocks: stocks - item.quantity } : item,
      ),
    );
  };

  const decreaseQuantity = (id, stocks) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, newStocks: stocks + 1 } : item,
      ),
    );
  };

  const removeItem = (id, stocks) => {
    setCart((prevcart) => prevcart.filter((item) => item.id !== id));
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, newStocks: stocks } : item,
      ),
    );
  };
  const [showSuccess, setshowSuccess] = useState(false);
  const handleCheckout = async (cart) => {
    console.log("Cart data being sent:", cart);
    try {
      const response = await axios.post("http://localhost:8000/api/salesAdd", {
        sales: cart,
      });

      if (response.status == 201) {
        setshowSuccess(true);
      }
    } catch (error) {
      console.error("There was an error", error.response.data);
    }
  };
  const [Total, setTotal] = useState(0);
  let totalcounter = 0;
  useEffect(() => {
    cart.map((item) => {
      totalcounter += parseInt(item.price) * item.quantity;
    });
    setTotal(totalcounter);
  }, [cart]);

  return (
    <div className="flex h-[90vh] flex-col justify-between text-left">
      {showSuccess && <SuccessPopUp setshowSuccess={setshowSuccess} />}
      <h1 className="pl-4 pt-8 text-[2vw] font-medium">Current Order</h1>
      <div className="ml-4 flex h-4/6 w-5/6 flex-col self-center overflow-y-scroll rounded-md">
        {cart.length == 0 ? (
          <h1 className="text-gray-300">Cart Empty...</h1>
        ) : (
          cart.map((item) => (
            <div className="mb-4 mr-4 flex" key={item.product_name}>
              <div className="h-16 w-[5rem] overflow-hidden rounded-lg">
                <img
                  className="h-full w-[4rem] object-cover object-center"
                  src={item.product_img_url}
                />
              </div>
              <div className="ml-2">
                <h1 className="whitespace-nowrap">{item.product_name}</h1>
                <h1>{item.price}</h1>
              </div>

              <div className="ml-auto mt-auto flex h-full flex-col">
                <div
                  onClick={() => removeItem(item.id, item.stocks)}
                  className="mb-4 ml-auto flex cursor-pointer opacity-70"
                >
                  <IoTrashOutline />
                </div>
                <div className="flex">
                  <button
                    disabled={item.quantity == 1 ? true : false}
                    onClick={() => decreaseQuantity(item.id, item.newStocks)}
                    // onClick={() => console.log(item.newStocks)}
                    className="rounded-lg border-2 border-gray-300 px-2"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      increaseQuantity(item.id, item.stocks, item.newStocks)
                    }
                    className="rounded-lg border-2 border-gray-300 px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mb-8 mt-auto flex w-5/6 flex-col items-center self-center">
        <div className="mb-4 flex w-full justify-between rounded-md bg-gray-100 p-4">
          <h1 className="text-[1.2vw]">Total:</h1>
          <h1 className="text-[1.2vw]">₱{Total}</h1>
        </div>
        <div>
          <button
            disabled={cart.length <= 0 ? true : false}
            onClick={() => handleCheckout(cart)}
            className="whitespace-nowrap rounded-lg bg-prof-blue px-12 py-2 text-white"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
