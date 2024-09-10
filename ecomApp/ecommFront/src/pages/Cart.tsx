import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { toast } from "react-hot-toast";
import { RootState } from "../redux/Store";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [order, setOrder] = useState(true);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  const orderplaced = () => {
    toast.success("Order Placed Successfully");
    setOrder(false);
  };

  const cancel = () => {
    toast.error("Order cancelled Successfully");
    setOrder(true);
  };

  return (
    <div>


<div className="bg-slate-900">
        <Navbar />
      </div>


      {cart.length > 0 ? (
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center">
          <div className="w-[100%] md:w-[60%] flex flex-col p-2 ">
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="w-[100%] md:w-[40%] mt-3 flex flex-col">
            <div className="flex flex-col p-5 gap-5 my-14 h-[100%] justify-between">
              <div className="flex flex-col gap-5">
                <div className="font-semibold text-xl text-green-800">Your Cart</div>
                <div className="font-semibold text-5xl text-green-700 -mt-5">Summary</div>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold text-xl">Total Items: {cart.length}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xl font-bold">
                <span className="text-gray-700 font-semibold">Total Amount:</span> ₹ {totalAmount*50}
              </p>

              {order ? (
                <button
                  onClick={orderplaced}
                  className="bg-green-700 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold p-3 text-xl"
                >
                  Place Order
                </button>
              ) : (
                <button
                  onClick={cancel}
                  className="hover:bg-purple-50 rounded-lg transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold text-green-700 p-3 text-xl"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">Your cart is empty!</h1>
          <Link to={"/"}>
            <button className="uppercase bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
