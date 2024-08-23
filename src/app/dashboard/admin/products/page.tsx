import Products from "@/src/components/dashboard/admin/products/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return <Products />;
}
