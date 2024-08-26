import Managers from "@/src/components/dashboard/admin/staff/Staff";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff",
};

export default function ManagersPage() {
  return <Managers />;
}
