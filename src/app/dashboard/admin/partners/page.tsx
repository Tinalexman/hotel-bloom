import Partners from "@/src/components/dashboard/admin/partners/Partners";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners",
};

export default function PartnersPage() {
  return <Partners />;
}
