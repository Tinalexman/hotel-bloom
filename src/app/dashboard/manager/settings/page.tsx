import Settings from "@/src/components/dashboard/manager/settings/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return <Settings />;
}
