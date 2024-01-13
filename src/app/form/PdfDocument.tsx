"use client";
import { Box, Button } from "@mui/material";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
// Create styles
function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
const styles = StyleSheet.create({
  document: {
    fontFamily: "Times-Roman",
  },
  heading: {
    paddingBottom: 20,
    borderBottom: 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 17,
  },
  headingText: {
    fontFamily: "Times-Bold",
    fontSize: "16",
    fontWeight: 700,
  },
  page: {
    // backgroundColor: "aqua",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageInner: {
    display: "flex",
    height: "95%",
    width: "93%",
    // backgroundColor: "red",
    border: 1.5,
    borderColor: "black",
  },
  section1: {
    flexDirection: "row",
    borderBottom: 1.5,
    borderColor: "black",
  },
  subSectionWithBorderRight: {
    flexDirection: "row",
    fontSize: 14,
    flexGrow: 1,
    padding: 5,
    borderRight: 1.5,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  boldText: {
    fontWeight: 700,
    fontFamily: "Times-Bold",
  },
  subSection: {
    flexDirection: "row",
    fontSize: 14,
    flexGrow: 1,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  feeHeading: {
    paddingBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 17,
  },
  feeHeadingText: {
    fontFamily: "Times-Bold",
    fontSize: "16",
    fontWeight: 700,
  },
  feeSectionContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  feeDetailsContainer: {},
  feeSection: {
    flexDirection: "row",
  },
  feeSubSection: {
    flexDirection: "row",
    fontSize: 14,
    flexGrow: 1,
    padding: 5,
    paddingLeft: 10,
  },
  dateAndSignContainer: {
    flexGrow: 1,
    display: "flex",
    fontSize: 14,
    justifyContent: "flex-end",
  },
  dateContainer: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    width: "50%",
  },
  signContainer: {},
});

// Create Document Component
export default function pdfDocument(props: {
  coursename: string;
  id: string;
  name: string;
  dob: Date;
  fatherName: string;
  motherName: string;
  phoneNumber: string;
  email: string;
  paymentMode: string;
  paymentId: string;
  amount: number;
}) {
  return (
    <Box
      sx={{
        background: "red",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* <PDFDownloadLink document={<MyDocument />}>Download pdf</PDFDownloadLink> */}
      <MyDocument {...props} />
    </Box>
  );
}
console.log(typeof window !== "undefined" ? "defined" : "not defined");

function MyDocument({
  coursename,
  id,
  name,
  dob,
  fatherName,
  email,
  motherName,
  phoneNumber,
  paymentMode,
  paymentId,
  amount,
}: {
  coursename: string;
  id: string;
  name: string;
  dob: Date;
  fatherName: string;
  motherName: string;
  phoneNumber: string;
  email: string;
  paymentMode: string;
  paymentId: string;
  amount: number;
}) {
  return typeof window !== "undefined" ? (
    // <PDFViewer
    //   style={{ border: 0, position: "absolute", width: "100%", height: "100%" }}
    // >
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageInner}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>
              National Skill Development Corporation, Examination January 2024
            </Text>
          </View>
          <View style={styles.section1}>
            <View style={styles.subSection}>
              <Text style={styles.boldText}>S.R No:- </Text>
              <Text>{id}</Text>
            </View>
          </View>
          <View style={styles.section1}>
            <View style={styles.subSection}>
              <Text style={styles.boldText}>Course: </Text>
              <Text>{coursename}</Text>
            </View>
          </View>
          <View style={styles.section1}>
            <View style={styles.subSectionWithBorderRight}>
              <Text style={styles.boldText}>Name: </Text>
              <Text>{name}</Text>
            </View>
            <View style={styles.subSection}>
              <Text style={styles.boldText}>DOB: </Text>
              <Text>{formatDate(dob)}</Text>
            </View>
          </View>
          <View style={styles.section1}>
            <View style={styles.subSection}>
              <Text style={styles.boldText}>Father&apos;s Name: </Text>
              <Text>{fatherName}</Text>
            </View>
          </View>
          <View style={styles.section1}>
            <View style={styles.subSection}>
              <Text style={styles.boldText}>Mother&apos;s Name: </Text>
              <Text>{motherName}</Text>
            </View>
          </View>
          <View style={styles.section1}>
            <View style={styles.subSection}>
              <Text style={styles.boldText}>Phone Number: </Text>
              <Text>{phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.section1}>
            <View style={styles.subSection}>
              <Text style={styles.boldText}>Email: </Text>
              <Text>{email}</Text>
            </View>
          </View>
          <View style={styles.feeSectionContainer}>
            <View style={styles.feeHeading}>
              <Text style={styles.feeHeadingText}>Examination Fee Receipt</Text>
            </View>
            <View style={styles.feeDetailsContainer}>
              <View style={styles.feeSection}>
                <View style={styles.feeSubSection}>
                  <Text style={styles.boldText}>S.R No:- </Text>
                  <Text>{id}</Text>
                </View>
              </View>
              <View style={styles.feeSection}>
                <View style={styles.feeSubSection}>
                  <Text style={styles.boldText}>Course: </Text>
                  <Text>{coursename}</Text>
                </View>
              </View>
              <View style={styles.feeSection}>
                <View style={styles.feeSubSection}>
                  <Text style={styles.boldText}>Payment Mode: </Text>
                  <Text>{paymentMode}</Text>
                </View>
              </View>
              <View style={styles.feeSection}>
                <View style={styles.feeSubSection}>
                  <Text style={styles.boldText}>Payee Name: </Text>
                  <Text>{name}</Text>
                </View>
                <View style={styles.feeSubSection}>
                  <Text style={styles.boldText}>Amount (In Rupees): </Text>
                  <Text>{amount}</Text>
                </View>
              </View>

              <View style={styles.feeSection}>
                <View style={styles.feeSubSection}>
                  <Text style={styles.boldText}>Payment id: </Text>
                  <Text>{paymentId}</Text>
                </View>
              </View>
              <View style={styles.feeSection}>
                <View style={styles.feeSubSection}>
                  <Text style={styles.boldText}>Status: </Text>
                  <Text>{paymentMode === "ONLINE" ? "PAID" : ""}</Text>
                </View>
              </View>
            </View>
            <View style={styles.dateAndSignContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.boldText}>Date: </Text>
                <Text>{formatDate(new Date())}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  ) : (
    // </PDFViewer>
    <></>
  );
}
