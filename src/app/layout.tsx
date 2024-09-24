import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { Toaster } from "react-hot-toast";

import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  ColorSchemeScript,
} from "@mantine/core";
import AuthProvider from "@/src/providers/AuthProvider";
import UserProvider from "../providers/UserProvider";

const myColor: MantineColorsTuple = [
  "#faecfe",
  "#f1d4f8",
  "#e3a4f3",
  "#d573ef",
  "#c94aeb",
  "#c232e9",
  "#bf27e9",
  "#a81ccf",
  "#9516b9",
  "#820ca2",
];

const white: MantineColorsTuple = [
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
];

const corben = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Servexi",
    template: "%s - Servexi",
  },
  description: "Hospitality made easier",
};

const theme = createTheme({
  colors: {
    myColor,
    white,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={corben.className}>
        <Toaster />
        <MantineProvider theme={theme}>
          <AuthProvider>
            <UserProvider>{children}</UserProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
