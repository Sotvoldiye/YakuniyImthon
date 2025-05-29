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
            quantitiy: 1,
            price: 156,
            get total() {
              return +this.price * +this.quantitiy;
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

  const handleClick = (type, id) => {
    if (type === "add") {
      if (localItems.at(-1).name.trim() !== "") {
        setLocalItems((prev) => {
          return [
            ...prev,
            {
              id,
              name: "",
              quantitiy: 1,
              price: 0,
              get total() {
                return this.price * this.quantitiy;
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
    <div>
      <h3>Item List</h3>
      <div>
        <span>Item name</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <ul className="flex flex-col gap-5 mb-5">
        {localItems.map(({ name, quantitiy, price, total, id }) => {
          return (
            <li className="flex items-center justify-between" key={id}>
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
                defaultValue={quantitiy}
                className="w-[100px]"
                type="number"
                name="quantity"
                placeholder="Qty"
              />
              <Input
                onChange={(e) => handleChange(e, id)}
                defaultValue={price}
                className="w-[100px]"
                type="number"
                name="price"
                placeholder="Price"
              />
              <span>{total.toFixed(2)}</span>
              <Button
                type="button"
                onClick={() => handleClick("delete", id)}
                variant="destructive"
                size="icon"
              >
                <Trash2 />
              </Button>
            </li>
          );
        })}
        <Button
          type="button"
          onClick={() => {
            handleClick("add", crypto.randomUUID());
          }}
          className="w-full"
          variant="secondary"
        >
          <Plus />
          Add New Item
        </Button>
      </ul>
    </div>
  );
}
