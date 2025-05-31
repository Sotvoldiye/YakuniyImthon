import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";
import style from "./sidebar/sidebar.module.css";

export default function ItemLIst({ info }) {
  const { setItems } = useAppStore();
  const [localItems, setLocalItems] = useState(
    info
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: "",
            quantity: 1,
            price: 0,
            get total() {
              return +this.price * +this.quantity;
            },
          },
        ]
  );
  useEffect(() => {
    setItems(localItems);
  }, [JSON.stringify(localItems)]);

  const handleChange = (e, id) => {
    const changedItem = localItems.find((el) => {
      return el.id == id;
    });
    changedItem[e.target.name] = e.target.value;
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

  function handleClick(type, id) {
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
  }

  return (
    <div className="flex flex-col">
      <h3 className="mb-2">Item List</h3>

      <div className={`flex items-center gap-[20px] px-2 ${style.label}`}>
        <span className="w-[210px]">Item name</span>
        <di className="flex items-center  px-2">
          <span className="w-[100px] text-start ">Qty</span>
          <span className="w-[100px] text-start ml-[19px]">Price</span>
          <span className="w-[100px] text-staer ml-[55px]">Total</span>
          <span className="w-[40px]"></span>
        </di>
      </div>

      <ul className="flex flex-col gap-5 mb-5">
        {localItems.map(({ name, quantity, price, total, id }, index) => {
          return (
            <li
              className={`flex gap-[24px]  items-center px-2 ${style.inputs}`}
              key={index}
            >
              <label className="hidden" htmlFor="name">
                Item Name
              </label>
              <Input
                onChange={(e) => handleChange(e, id)}
                defaultValue={name}
                className="w-[210px]"
                name="name"
                type="text"
                id="name"
                placeholder="Item Name"
              />
              <div className={`flex items-center  gap-[24px] ${style.malumot}`}>
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
                  defaultValue={parseFloat(price).toFixed(2)}
                />
                <span className="w-[100px] text-center">
                  {total.toFixed(2)}
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
              </div>
            </li>
          );
        })}
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
