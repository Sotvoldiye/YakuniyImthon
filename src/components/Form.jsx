import React, { useEffect, useState } from "react";
import ItemLIst from "./ItemLIst";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { addInvoice, upDateById } from "../request";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Form({ info, setSheetOpen }) {
  const { updateInvoices} =useAppStore()
  const { items: zustandItems } = useAppStore();
  const navigate= useNavigate()
  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    createdAt,
    items,
  } = info || {};
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = {};
    if(!info){
      result.status = e.nativeEvent.submitter.id
    }
    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });
    result.items = zustandItems;

    const readyData = prepareData(result);

 setSending({mode: e.nativeEvent.submitter.id ==="edit" ? "edit" : "add",
 data: readyData})
  }

 
  useEffect(() => {
   if(sending){
    if(sending.mode === "add") {
      addInvoice(sending.data)
      .then((res) => {
        updateInvoices(res)
        setLoading(true)
        toast.success("succesfully added ✔")
        setSheetOpen(false)
      })
      .catch(({message}) => {
        toast.error(message)
      })
      .finally(() => {
        setLoading(false)
        setSending(null)
      });
    } else if(sending.mode === "edit"){
      upDateById( {id:info.id, newData:sending.data})
      .then((res) => {
        updateInvoices(res)
        toast.success("succesfully edited ✔")
        setSheetOpen(false)
      })
      .catch(({message}) => {
        toast.error(message)
      })
      .finally(() => {
        setLoading(false)
        setSending(null)
      });
    }
   }
    },  [sending ? JSON.stringify(sending) : sending]);

    return (
    <form onSubmit={handleSubmit} className="p-4 pt-14">
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5"> Bill From </h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street address</Label>
            <Input
              type="text"
              id="senderAddress-street"
              name="senderAddress-street"
              placeholder="Street Addres"
              defaultValue={info && senderAddress.street}
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-city">City</Label>
              <Input
                type="text"
                id="senderAddress-city"
                name="senderAddress-city"
                placeholder="Ctiy"
                defaultValue={info && senderAddress.city}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-postcode">Post Code</Label>
              <Input
                type="text"
                id="senderAddress-postcode"
                name="senderAddress-postcode"
                placeholder="Post Code"
                defaultValue={info && senderAddress.postCode}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-country">Country</Label>
              <Input
                type="text"
                id="senderAddress-country"
                name="senderAddress-country"
                placeholder="Country"
                defaultValue={info && senderAddress.country}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bill to */}
      <div>
        <h3 className="text-2xl font-medium mb-5"> Bill to </h3>

        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Client's Name"
              defaultValue={info && clientName}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              type="text"
              id="clientEmail"
              name="clientEmail"
              defaultValue={info && clientEmail}
              placeholder="Client's Email"
            />
          </div>
        </div>
        {/* Client */}
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street address</Label>
            <Input
              type="text"
              id="clientAddress-street"
              name="clientAddress-street"
              placeholder="Street Addres"
              defaultValue={info && clientAddress.street}
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-city">City</Label>
              <Input
                type="text"
                id="clientAddress-city"
                name="clientAddress-city"
                placeholder="Ctiy"
                defaultValue={info && clientAddress.city}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-postcode">Post Code</Label>
              <Input
                type="text"
                id="clientAddress-postcode"
                name="clientAddress-postcode"
                placeholder="Post Code"
                defaultValue={info && clientAddress.postCode}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-country">Country</Label>
              <Input
                type="text"
                id="clientAddress-country"
                name="clientAddress-country"
                placeholder="Country"
                defaultValue={info && clientAddress.country}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Date */}
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 items-end">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice date</Label>
            <Input
              type="date"
              id="createdAt"
              name="createdAt"
              placeholder="Invoice date"
              defaultValue={info && createdAt}
            />
          </div>
          <Select
            name="paymentTerms"
            defaultValue={info && paymentTerms.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Terms</SelectLabel>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Day</SelectItem>
                <SelectItem value="14">Net 14 Day</SelectItem>
                <SelectItem value="30">Net 30 Day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Project description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Project description"
            defaultValue={info && description}
          />
        </div>
      </div>
      <ItemLIst info={items} />

      {info ? (
        <div className="flex justify-end gap-5 mt-10">
          <Button variant={"outline"}>Cancel</Button>
          <Button id="edit" disabled={loading}>{loading ? "Loading ..." : "Save Changes"}</Button>
        </div>
      ) : (
        <div className="flex justify-end gap-5 mt-10">
          <Button type="button" variant={"outline"}>
            Discard
          </Button>
          <Button id= "draft" variant={"secondary"} disabled={loading}>
            {loading ? "LOading..." : "Save as dreaft"}
          </Button>
          <Button id="pending">{loading ? "Loading ..." : "Save Sand"}</Button>
        </div>
      )}
    </form>
  );
}