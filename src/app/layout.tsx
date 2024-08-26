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
  "#ffecff",
  "#f9d6f9",
  "#f1aaf0",
  "#e97be9",
  "#e254e1",
  "#de3cdd",
  "#dc2fdc",
  "#c422c4",
  "#af1baf",
  "#980e99",
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
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
