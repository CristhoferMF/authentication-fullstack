import * as yup from "yup";
import es from "yup-es";

yup.setLocale(es);
export const profileSchema = yup
  .object({
    name: yup.string().required(),
    bio: yup.string().max(200),
    email: yup.string().email().required(),
    phone: yup.string(),
    password: yup
      .string()
      .notRequired()
      .min(0)
      .test(
        "pvalid",
        "Password must be at least 8 characters long!",
        (value) => !value || value.length >= 8
      ),
  })
  .required();
