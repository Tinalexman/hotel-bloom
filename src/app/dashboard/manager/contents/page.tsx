import Contents from "@/src/components/dashboard/manager/contents/Contents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contents",
};

export default function ContentsPage() {
  return <Contents />;
}
