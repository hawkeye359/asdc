// const [phoneNumber, setPhoneNumber] = useState<string>();
//   const [course, setCourse] = useState<string>();
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [fathersName, setFathersName] = useState<string>("");
//   const [mothersName, setMothersName] = useState<string>("");
//   const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

import { date, object, string } from "yup";

export const PHONENUMBER = "PHONENUMBER";
export const FIRST_NAME = "FIRST_NAME";
export const LAST_NAME = "LAST_NAME";
export const EMAIL = "EMAIL";
export const FATHER_NAME = "FATHER_NAME";
export const MOTHER_NAME = "MOTHER_NAME";
export const DATE_OF_BIRTH = "DATE_OF_BIRTH";
export const COURSE = "COURSE";

export type formFieldsName =
  | typeof PHONENUMBER
  | typeof FIRST_NAME
  | typeof LAST_NAME
  | typeof EMAIL
  | typeof FATHER_NAME
  | typeof MOTHER_NAME
  | typeof DATE_OF_BIRTH
  | typeof COURSE;

export const formSchema = object({
  [PHONENUMBER]: string()
    .matches(/^\+91\s[0-9]{5}\s[0-9]{5}$/, "Mobile number is not valid")
    .required("Mobile number is required"),
  [FIRST_NAME]: string().required(),
  [LAST_NAME]: string().notRequired(),
  [DATE_OF_BIRTH]: date().required(),
  [FATHER_NAME]: string().required(),
  [MOTHER_NAME]: string().required(),
  [COURSE]: string().required(),
  [EMAIL]: string().email("email is invalid").required(),
});

export const initialValues = {
  [PHONENUMBER]: "+91 88532 86504",
  [FIRST_NAME]: "Mohd",
  [LAST_NAME]: "Huzaifa",
  [DATE_OF_BIRTH]: undefined,
  [FATHER_NAME]: "Mumtaz Ahmad",
  [MOTHER_NAME]: "Tasneem Fatima",
  [COURSE]: 0,
  [EMAIL]: "mohdhuzaifa359@gmail.com",
};
