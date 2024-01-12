import { Box } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Image
          src="/banner.png"
          alt="home page banner 1"
          width={1366}
          height={768}
          style={{
            width: "100%",
            height: "auto",
          }}
        ></Image>
      </Box>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background: "#fff",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Link href="#" style={{}}>
          <Image
            src="/cyber_pathshala_logo.png"
            alt="asdc logo"
            height={227}
            width={402}
            style={{
              display: "block",
              height: "200px",
              width: "auto",
              background: "red",
            }}
          ></Image>
        </Link>
        <Link href="/form" style={{}}>
          <Image
            src="/asdc_logo.png"
            alt="asdc logo"
            height={227}
            width={402}
            style={{
              display: "block",
              height: "200px",
              width: "auto",
              background: "red",
            }}
          ></Image>
        </Link>
      </Box>
    </Box>
  );
}
