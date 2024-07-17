"use client";
import { useToast } from "../use-toast";

export interface NotifyProps {
  type: "success" | "error" | "warning";
  title: string;
}
export const useNotify = () => {
  const { toast } = useToast();
  const notify = ({ type, title }: NotifyProps) => {
    if (type === "success") {
      toast({
        title: title,
        className:
          "text-green-600 rounded-[10px] z-[10000] font-[700] border-[1px] border-green-600 bg-white",
      });
    } else if (type === "error") {
      toast({
        title: title,
        className:
          "text-rose-400 rounded-[10px] z-[10000] font-[700] border-[1px] border-rose-400 bg-white",
      });
    } else if (type === "warning") {
      toast({
        title: title,
        className:
          "text-yellow-600 rounded-[10px] z-[10000] font-[700] border-[1px] border-yellow-600 bg-white",
      });
    } else {
      toast({
        title: title,
      });
    }
  };
  return notify;
};
