import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

interface CartItemProps {
  item: {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-center">
        <div className="w-[30%]">
          <img className="object-cover" src={item.image} alt="cart" />
        </div>
        <div className="self-start space-y-5 w-[100%] md:w-[70%]">
          <h1 className="text-xl text-slate-700 font-semibold">{item.title}</h1>
          <h1 className="text-base text-slate-700 font-medium">{item.description}</h1>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg text-green-600">₹ {item.price*50}</p>
            <div
              className="hover:bg-red-400 cursor-pointer rounded-full p-3 mr-3"
              onClick={removeFromCart}
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
