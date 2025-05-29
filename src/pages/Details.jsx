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
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
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
    upDateById(id, data)
      .then(() => {
        updateInvoices(res);
      })
      .catch((message) => {
        toast.error(message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }

  function handleEdit(id, data){
    setSheetOpen()
    setEditedData(data)
  }

  if (loading) {
    return <CardSkleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(invoice);
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
              <Button onClick={() =>handleEdit(invoice.id, invoice)} variant="ghost">Edit</Button>
              <Dialog>
                <DialogTrigger
                  className={buttonVariants({ variant: "destructive" })}
                  disa
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
    </div>
  );
}
