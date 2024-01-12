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
console.log("something");
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
export default function pdfDocument() {
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
      <MyDocument />
    </Box>
  );
}

function MyDocument() {
  return (
    <PDFViewer
      style={{ border: 0, position: "absolute", width: "100%", height: "100%" }}
    >
      <Document style={styles.document}>
        <Page size="A4" style={styles.page}>
          <View style={styles.pageInner}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>
                National Skill Development Corporation, Examination 2024
              </Text>
            </View>
            <View style={styles.section1}>
              <View style={styles.subSection}>
                <Text style={styles.boldText}>S.R No:- </Text>
                <Text>ZHA240100001</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.subSection}>
                <Text style={styles.boldText}>Course: </Text>
                <Text>Communication skills & Personality Development</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.subSectionWithBorderRight}>
                <Text style={styles.boldText}>Name: </Text>
                <Text>Mohd Huzaifa</Text>
              </View>
              <View style={styles.subSection}>
                <Text style={styles.boldText}>DOB: </Text>
                <Text>04-07-1999</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.subSection}>
                <Text style={styles.boldText}>Mother&apos;s Name: </Text>
                <Text>Tasneem Fatima</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.subSection}>
                <Text style={styles.boldText}>Father&apos;s Name: </Text>
                <Text>Mumtaz Ahmad</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.subSection}>
                <Text style={styles.boldText}>Phone Number: </Text>
                <Text>+91 88532 86504</Text>
              </View>
            </View>
            <View style={styles.section1}>
              <View style={styles.subSection}>
                <Text style={styles.boldText}>Email: </Text>
                <Text>mohdhuzaifa359@gmail.com</Text>
              </View>
            </View>
            <View style={styles.feeSectionContainer}>
              <View style={styles.feeHeading}>
                <Text style={styles.feeHeadingText}>
                  Examination Fee Receipt
                </Text>
              </View>
              <View style={styles.feeDetailsContainer}>
                <View style={styles.feeSection}>
                  <View style={styles.feeSubSection}>
                    <Text style={styles.boldText}>S.R No:- </Text>
                    <Text>ZHA240100001</Text>
                  </View>
                </View>
                <View style={styles.feeSection}>
                  <View style={styles.feeSubSection}>
                    <Text style={styles.boldText}>Course: </Text>
                    <Text>Communication skills & Personality Development</Text>
                  </View>
                </View>
                <View style={styles.feeSection}>
                  <View style={styles.feeSubSection}>
                    <Text style={styles.boldText}>Payment Mode: </Text>
                    <Text>ONINE/OFFLINE</Text>
                  </View>
                </View>
                <View style={styles.feeSection}>
                  <View style={styles.feeSubSection}>
                    <Text style={styles.boldText}>Payee Name: </Text>
                    <Text>Mohd Huzaifa</Text>
                  </View>
                  <View style={styles.feeSubSection}>
                    <Text style={styles.boldText}>Amount (In Rupees): </Text>
                    <Text>24000</Text>
                  </View>
                </View>

                <View style={styles.feeSection}>
                  <View style={styles.feeSubSection}>
                    <Text style={styles.boldText}>Payment id: </Text>
                    <Text>pay_NN1iwedJljB9OH</Text>
                  </View>
                </View>
                <View style={styles.feeSection}>
                  <View style={styles.feeSubSection}>
                    <Text style={styles.boldText}>Status: </Text>
                    <Text>PAID</Text>
                  </View>
                </View>
              </View>
              <View style={styles.dateAndSignContainer}>
                <View style={styles.dateContainer}>
                  <Text style={styles.boldText}>Date: </Text>
                  <Text>24-02-2001</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
