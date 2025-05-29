import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyCard({
  createdAt = "Due 19 Aug 2021",
  clientName = "Jeson Huang",
  total = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/${id}`);
      }}
      className="border-2 border-transparent hover:border-blue-400 transition-colors"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>#{id}</CardTitle>
          <CardDescription>{createdAt}</CardDescription>
          <span>{clientName}</span>
          <span>{total}</span>
          <StatusBadge status={status} />
          <ArrowRight className="text-[#7c5dfa]" />
        </div>
      </CardHeader>
    </Card>
  );
}
