import axios, { AxiosError } from "axios";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type CreateMessageProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateMessage = ({ isOpen, setIsOpen }: CreateMessageProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<{
    email: string;
    date: string;
    description: string;
  }>({
    email: "",
    date: "",
    description: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/messages", data);
      if (res.status === 201) {
        // setMessages((prev) => [res.data.data, ...prev]);
        closeModal();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message);
        return;
      }

      console.log(err);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      show={isOpen}
      onClose={closeModal}
      className="z-40"
      position="top-center"
      theme={{
        content: {
          base: "md:py-20 relative h-full w-full md:h-auto",
        },
      }}
    >
      <Modal.Body className="dark:text-white">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-5">
          Create
        </h3>
        {errorMessage && (
          <span className="text-sm text-red-500 my-3">{errorMessage}</span>
        )}
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <TextInput
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              name="email"
              id="email"
              type="text"
              placeholder="Email..."
            />
          </div>

          <div className="w-full mt-3">
            <div className="mb-2 block">
              <Label htmlFor="date" value="Date" />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <TextInput
              onChange={(e) => setData({ ...data, date: e.target.value })}
              name="date"
              id="date"
              type="date"
              placeholder="Date..."
            />
          </div>

          <div className="w-full mt-3">
            <div className="mb-2 block">
              <Label htmlFor="desc" value="Description" />
              <span className="text-red-500 ml-1">*</span>
            </div>
            <Textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              id="desc"
              placeholder="Description..."
              required
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2 mt-7">
            <Button color="blue" type="submit">
              Submit
            </Button>
            <Button color="gray" onClick={closeModal}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateMessage;
