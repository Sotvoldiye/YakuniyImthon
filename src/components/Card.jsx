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
import style from "./card/Card.module.css"

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
      className={`border-2 border-transparent hover:border-blue-400 transition-colors ${style.cardBody}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
         <div className={style.cardHeader}>
         <CardTitle>#{id}</CardTitle>
         <CardDescription>{createdAt}</CardDescription>
         </div>
        <div className={style.mainCard}>
        <span>{clientName}</span>
          <span  className={style.total}>{total}</span>
          <StatusBadge status={status} />
          <ArrowRight className={`text-[#7c5dfa] ${style.link}`} />

        </div>
                </div>
      </CardHeader>
    </Card>
  );
}
