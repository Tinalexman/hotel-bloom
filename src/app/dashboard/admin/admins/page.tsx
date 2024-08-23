import Admins from "@/src/components/dashboard/admin/admins/Admins";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admins",
};

export default function AdminsPage() {
  return <Admins />;
}
