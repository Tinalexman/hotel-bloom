import AccountVerification from "@/src/components/auth/verification/VerifyAccount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Verification",
};

export default function AccountVerificationPage() {
  return <AccountVerification />;
}
