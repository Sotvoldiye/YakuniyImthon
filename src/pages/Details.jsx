import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, upDateById } from "../request";
import { useEffect, useState } from "react";
import CardSkleton from "../components/CardSkleton";
import { Card, CardContent } from "../components/ui/card";
import StatusBadge from "../components/StatusBadge";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

export default function Details() {
  const navigate = useNavigate();
  const { updateInvoices, setEditedData, setSheetOpen } = useAppStore();
  const { id } = useParams();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState([]);
  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch((message ) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById({id})
      .then(() => {
        navigate("/"); // <-- bu to‘g‘ri
      })
      .catch((message) => {
        toast.error(message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  function handleUpdate(id, data) {
    setUpdateLoading(true);
    upDateById({id, newData:data})
      .then((res) => {
        updateInvoices(res);
        navigate("/")
      })
      .catch((message) => {
        toast.error(message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }
  function handleEdit(data){
    setSheetOpen()
    setEditedData(data)
  }

  if (loading) {
    return <CardSkleton />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  console.log(invoice)
  return (
    <div className="py-5">
      <div className="base_container">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="flex gap-3">
              <Button onClick={() =>handleEdit( invoice)} variant="ghost">Edit</Button>
              <Dialog>
                <DialogTrigger
                  className={buttonVariants({ variant: "destructive" })}
                >
                  {deleteLoading ? "Loading" : "Delete"}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete invoice #
                      {invoice.invoiceId}? This action cannot be undone.{" "}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-end">
                    <DialogClose variant="ghost">Cancel</DialogClose>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(invoice.id)}
                    >
                      Delate
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              {invoice.status === "pending" && (
                <Button
                  onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                >
                  {updateLoading ? "Loading ..." : "Mark as Paid"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
        <div className="base_container">
        <div>
        <Card className="details_container">
        <CardContent className="p-[40px] ">
          <div className="flex items-center-center justify-between mb-[21px]">
            <div>
              <h2>
                <span className="text-[#888EB0]">#</span>
                {invoice.clientAddress?.postcode}
              </h2>
              <h2 className="mt-[8px]">{invoice.items?.[0].name}</h2>
            </div>
            <div>
              <h3>{invoice.senderAddress?.street}</h3>
              <h3>{invoice.senderAddress?.city}</h3>
              <h3>{invoice.senderAddress?.postCode}</h3>
              <h3>{invoice.senderAddress?.country}</h3>
            </div>
          </div>
          <div className="flex items-start justify-between ">
            <div className="flex items-center gap-[65px]">
              <div>
                <div className="flex flex-col md:gap-[32px] justify-between items-start">
                  <div>
                    <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                      Invoice Date
                    </h3>
                    <h2 className="text-[15px] font-bold">
                      {invoice?.createdAt}
                    </h2>
                  </div>
                  <div>
                    <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                      Payment Due
                    </h3>
                    <h2 className="text-[15px] font-bold">
                      {invoice?.paymentDue}
                    </h2>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-[12px] text-[12px] font-normal">Bill To</h3>
                <h2 className="text-[15px] font-bold mb-[8px]">
                  {invoice?.clientName}
                </h2>
                <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                  {invoice?.clientAddress?.city}
                </h3>
                <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                  {invoice?.clientAddress?.postCode}
                </h3>
                <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                  {invoice?.senderAddress?.country}
                </h3>
              </div>
            </div>
            <div className="md:mr-[50px]">
              <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                Sent to
              </h3>
              <h2>{invoice?.clientEmail}</h2>
            </div>
          </div>
          <Card  className="p-0">
            <CardContent  className="p-0">
              <div>
                {invoice.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between mt-[12px]"
                  >
                    <div>
                      <h3 className="text-[11px] font-bold">{item.name}</h3>
                    </div>
                    <div className="flex gap-[100px]">
                      <h3 className="text-[11px] font-bold">{item.quantity}</h3>
                      <h3 className="text-[11px] font-bold">£{item.price}</h3>
                      <h3 className="text-[11px] font-bold">
                        £{item.quantity * item.price}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

          <div className="bg-[rgba(55,59,83,1)] flex items-center justify-between py-[24px] px-[24px] bottom-rad  rounded-br-[8px] rounded-bl-[8px]">
              <h3 className="text-[11px] font-normal">Amount Due</h3>
              <h2 className="font-[700] text-[24px] ">£{invoice.total}</h2>
            </div>
            </CardContent>
            </Card>
          </CardContent>
          </Card>
        </div>
        </div>
    </div>
  );
}
