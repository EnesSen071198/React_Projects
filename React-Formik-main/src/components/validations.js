import { object, string, number, date, ref } from "yup"; // ref'i import et

const validations = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().email("Invalid email format").required("Email is required"),
  phone: string().required("Phone number is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match") // ref kullan
    .required("Confirm Password is required"),
  gender: string().required("Gender is required"),
  hobbies: string().nullable(), // Hobi alanı isteğe bağlı
  createdOn: date().default(() => new Date())
});

export default validations;
