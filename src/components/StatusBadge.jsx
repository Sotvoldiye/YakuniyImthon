import { Button, buttonVariants } from "./ui/button";

export default function StatusBadge({ status = "pending" }) {
  const style = {
    draft: {
      dote: "bg-[rgba(55,59,83,1)]",
      text: "text-[rgba(55,59,83,1)]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dote: "bg-[#33d69f]",
      text: "text-[#33d69f]",
      bg: "rgba(51,214,159,0.05)",
    },
    pending: {
      dote: "bg-[#ff8f00]",
      text: "text-[#ff8f00]",
      bg: "rgba(255,143,0,0.05)",
    },
  };

  // Agar noto'g'ri status bo'lsa, fallback qilib "pending" ni ishlatamiz
  const currentStyle = style[status] || style["pending"];

  return (
    <Button
      className={`${buttonVariants({ variant: "outline" })} min-w-[104px] flex items-center gap-2`}
      style={{ backgroundColor: currentStyle.bg }}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${currentStyle.dote}`}
      ></span>
      <span className={`capitalize ${currentStyle.text}`}>{status}</span>
    </Button>
  );
}
