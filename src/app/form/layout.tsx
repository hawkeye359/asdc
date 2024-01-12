"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Footer from "../Footer";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  );
}
