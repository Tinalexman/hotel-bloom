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

const myColor: MantineColorsTuple = [
  "#e5ffea",
  "#d2fad9",
  "#a7f3b4",
  "#78ea8d",
  "#51e46c",
  "#37e057",
  "#26de4b",
  "#16c43b",
  "#03af32",
  "#009726",
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
    default: "Serviex",
    template: "%s - Serviex",
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
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
