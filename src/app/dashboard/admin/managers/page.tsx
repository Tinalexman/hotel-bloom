import Managers from "@/src/components/dashboard/admin/managers/Managers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Managers",
};

export default function ManagersPage() {
  return <Managers />;
}
