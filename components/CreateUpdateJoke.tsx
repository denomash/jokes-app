"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "@components/Common/Input/Input";
import { JokeProps } from "@models/Joke";
import Button from "./Common/Button/Button";
import { EMAIL_ADDRESS_REGEX } from "@utils/constants";
import { useDeleteRequest, useRequest } from "@hooks/useRequest";
import { useToastContext } from "@context/ToastProvider";
import Modal from "./Common/Modal";

/**
 * Component to create and update a joke
 * @returns Node to render
 */
const CreateUpdateJoke = ({
  data,
  type,
}: {
  data?: JokeProps;
  type?: "create" | "edit";
}) => {
  const router = useRouter();

  const defaultValues = {
    Author: data?.Author || "",
    Title: data?.Title || "",
    Body: data?.Body || "",
    CreatedAt: data?.CreatedAt || "",
    Views: data?.Views || "",
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    ...defaultValues,
  });

  useEffect(() => {
    setValues({
      Author: data?.Author || "",
      Title: data?.Title || "",
      Body: data?.Body || "",
      CreatedAt: data?.CreatedAt || "",
      Views: data?.Views || "",
    });
  }, [data]);

  const [errors, setErrors] = useState({
    Author: "",
    Title: "",
    Body: "",
  });

  const { alertSuccess } = useToastContext();

  /**
   * Handle Joke Update
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [event.target.name]: "" }));
  };

  /**
   * Update errors
   * @param error
   */
  const updateErrors = (field: string, error: string) => {
    setErrors({ ...errors, [field]: error });
    loading && setIsLoading(false);
  };

  const queryClient = useQueryClient();

  const onSuccess = async (res: JokeProps) => {
    console.log(
      `joke-${data?.id}`,
      "*** ***",
      [`${data?.id ? `joke-${data?.id}` : ""}`, "jokes"],
      res
    );
    // Invalidate and refetch
    await queryClient.invalidateQueries({
      queryKey: [`${data?.id ? `joke-${data?.id}` : ""}`, "jokes"],
    });

    setIsLoading(false);
    alertSuccess(
      `Joke ${type === "create" ? "created" : "updated"} successfully.`
    );

    router.push("/");
  };

  const onDeleteSuccess = (res: JokeProps) => {
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey.includes(`joke-${data?.id}`),
    });
    setIsLoading(false);
    alertSuccess(`Joke deleted successfully.`);
    router.push("/");
  };

  const onFailure = (err: any) => {
    console.log("Joke Update error:", err);
    setIsLoading(false);
  };

  const createMutation = useRequest(
    "POST",
    "/api/jokes",
    {
      ...values,
      Views: "10",
    },
    onSuccess,
    onFailure
  );

  const updateMutation = useRequest(
    "PUT",
    `/api/jokes/${data?.id}`,
    {
      ...values,
    },
    onSuccess,
    onFailure
  );

  const deleteMutation = useDeleteRequest(
    "DELETE",
    `/api/jokes/${data?.id}`,
    onDeleteSuccess,
    onFailure
  );

  /**
   * Handle form submit
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    if (!values.Title.trim())
      return updateErrors("Title", "Field is required!");

    if (values.Title.length < 3)
      return updateErrors("Title", "A minimum of 3 characters are required!");

    if (!values.Author.trim())
      return updateErrors("Author", "Field is required!");
    if (!values.Author.match(EMAIL_ADDRESS_REGEX))
      return updateErrors("Author", "Enter a valid email address!");

    if (!values.Body) return updateErrors("Body", "Field is required!");
    if (values.Body.length < 3)
      return updateErrors("Title", "A minimum of 3 characters are required!");

    if (type === "create") {
      createMutation.reset();
      createMutation.mutate();
    } else {
      updateMutation.reset();
      updateMutation.mutate();
    }
  };

  /**
   * Handle Delete
   */
  const handleDelete = () => {
    deleteMutation.reset();
    deleteMutation.mutate();
  };

  return (
    <div>
      <Link href="/" className="text-cyan-500 underline underline-offset-4">
        {`<`} Back
      </Link>
      {modalOpen && (
        <Modal
          message="Are you sure you want to delete this joke?"
          onClose={() => setModalOpen((prev) => !prev)}
        >
          <Button
            className="!inline-flex items-center px-5 py-2.5 text-center mr-2 danger"
            onClick={handleDelete}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Yes, I'm sure
          </Button>

          <Button
            className="!inline-flex items-center px-5 py-2.5 text-center"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            No, cancel
          </Button>
        </Modal>
      )}
      <h1 className="head_text text-center">
        {type === "create" ? "Create" : "Update"} Joke
        <br className="max-md:hidden" />
      </h1>

      <form className="mt-6">
        <Input
          label="Title"
          name="Title"
          type="text"
          placeholder="Title..."
          value={values.Title}
          error={errors.Title}
          onChange={(e) => handleChange(e)}
        />

        <Input
          label="Author"
          name="Author"
          type="text"
          placeholder="Author..."
          value={values.Author}
          error={errors.Author}
          onChange={(e) => handleChange(e)}
        />

        <Input
          label="Body"
          name="Body"
          type="text"
          placeholder="Body..."
          value={values.Body}
          error={errors.Body}
          onChange={(e) => handleChange(e)}
        />

        <div className="flex justify-evenly	">
          {type !== "create" ? (
            <Button
              className="submit-btn danger"
              disabled={updateMutation.isLoading || loading}
              onClick={() => setModalOpen(true)}
            >
              Delete
            </Button>
          ) : null}
          <Button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={updateMutation.isLoading || loading}
          >
            {type === "create" ? "Create" : "Update"} Joke
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateJoke;
