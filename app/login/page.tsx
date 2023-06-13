"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@context/AuthProvider";
import { EMAIL_ADDRESS_REGEX } from "@utils/constants";
import { alertSuccess } from "@utils/alerts";
import Button from "@components/Common/Button/Button";
import Input from "@components/Common/Input/Input";

/**
 * Jokes home page
 * @returns Node to render home Page
 */
const Home = () => {
  const [loading, setIsLoading] = useState(false);

  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState({
    ...defaultValues,
  });

  const [errors, setErrors] = useState({
    ...defaultValues,
  });

  const { setToken } = useAuthContext();

  /**
   * Handle Joke Update
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors({ ...errors, [event.target.name]: "" });
  };

  /**
   * Update errors
   * @param error
   */
  const updateErrors = (field: string, error: string) => {
    setErrors({ ...errors, [field]: error });
    loading && setIsLoading(false);
  };

  /**
   * Handle submit
   */
  const handleSubmit = () => {
    setIsLoading(true);
    if (!values.email.trim())
      return updateErrors("email", "Field is required!");

    if (!values.email.match(EMAIL_ADDRESS_REGEX))
      return updateErrors("email", "Enter a valid email address!");

    if (!values.password.trim())
      return updateErrors("password", "Field is required!");

    if (values.password.length < 4)
      return updateErrors(
        "password",
        "A minimum of 4 characters are required!"
      );

    setToken(
      JSON.stringify(Math.floor(Math.random() * Date.now()).toString(36))
    );

    alertSuccess("Login Successfull");
    router.push("/");
    setIsLoading(false);
  };

  return (
    <>
      <p className="flex justify-center text-lg dark:text-black font-medium mb-4 uppercase ">
        Login
      </p>
      <Input
        label="Email"
        name="email"
        type="text"
        placeholder="Enter email..."
        value={values.email}
        error={errors.email}
        onChange={(e) => handleChange(e)}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password..."
        value={values.password}
        error={errors.password}
        onChange={(e) => handleChange(e)}
      />

      <div className="flex-center">
        <Button
          className="flex uppercase w-full login_btn"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Home;
