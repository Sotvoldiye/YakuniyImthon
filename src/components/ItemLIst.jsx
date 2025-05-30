import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

export default function ItemLIst({ info }) {
  const {setItems} = useAppStore()
  const [localItems, setLocalItems] = useState(
    info
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: "Banner Design",
            quantity: 1,
            price: 156,
            get total() {
              return +this.price * +this.quantity;
            },
          },
        ]
  );
  useEffect(() => {
    setItems(localItems)
  }, [JSON.stringify(localItems)]);

  const handleChange = (e, id) => {
    const changedItem = localItems.find((el) => {
      return el.id === id;
    });
    changedItem[e.target.name] = Number(e.target.value);
    setLocalItems((prev) => {
      const mapped = prev.map((el) => {
        if (el.id === changedItem.id) {
          return changedItem;
        } else {
          return el;
        }
      });
      return mapped;
    });
  };

  const handleClick = (type, id) => {
    if (type === "add") {
      if (localItems.at(-1).name.trim() !== "") {
        setLocalItems((prev) => {
          return [
            ...prev,
            {
              id,
              name: "",
              quantity: 1,
              price: 0,
              get total() {
                return this.price * this.quantity;
              },
            },
          ];
        });
      } else {
        toast.info("o'xirgi main ni kiriting");
      }
    } else if (type === "delete") {
      if (localItems.length === 1) {
        toast.info("ENg kamida bitta element bo'lishi kerak");
      } else {
        const filtred = localItems.filter((el) => el.id !== id);
        setLocalItems(filtred);
      }
    }
  };

  return (
    <div className="flex flex-col">
    <h3 className="mb-2">Item List</h3>
  
    <div className="flex items-center justify-between px-2">
      <span className="w-[210px]">Item name</span>
      <span className="w-[100px] text-start">Qty</span>
      <span className="w-[100px] text-start">Price</span>
      <span className="w-[100px] text-staer">Total</span>
      <span className="w-[40px]"></span> 
    </div>
  
    <ul className="flex flex-col gap-5 mb-5">
      {localItems.map(({ name, quantity, price, total, id }) => (
        <li className="flex items-center justify-between px-2" key={id}>
          <Input
            onChange={(e) => handleChange(e, id)}
            defaultValue={name}
            className="w-[210px]"
            name="name"
            type="text"
            placeholder="Item Name"
          />
          <Input
            onChange={(e) => handleChange(e, id)}
            defaultValue={quantity}
            className="w-[100px]"
            type="number"
            name="quantity"
            placeholder="Qty"
          />
          <Input
            onChange={(e) => handleChange(e, id)}
            className="w-[100px]"
            type="number"
            name="price"
            placeholder="Price"
            defaultValue={price}
          />
          <span className="w-[100px] text-center">  
              {total.toFixed(2) }
          </span>
          <Button
            type="button"
            onClick={() => handleClick("delete", id)}
            variant="destructive"
            size="icon"
            className="w-[40px]"
          >
            <Trash2 />
          </Button>
        </li>
      ))}
    </ul>
  
    <Button
      type="button"
      onClick={() => handleClick("add", crypto.randomUUID())}
      className="w-full"
      variant="secondary"
    >
      <Plus />
      Add New Item
    </Button>
  </div>
  
  );
}
