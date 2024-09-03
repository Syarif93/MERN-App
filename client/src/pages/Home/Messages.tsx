import axios from "axios";
import { Button, Table } from "flowbite-react";
import { Fragment, useEffect, useState } from "react";
import CreateMessage from "./CreateMessage";

const Messages = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/messages");
        if (res.status === 200) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h5 className="text-gray-900 dark:text-white">Messages</h5>
        <Button pill color="blue" onClick={() => setIsOpenCreate(true)}>
          Create
        </Button>
      </div>
      <hr className="bg-gray-200 mb-5" />

      <div>
        <Table>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {messages.map((item, i) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {isOpenCreate && (
        <CreateMessage
          isOpen={isOpenCreate}
          setIsOpen={setIsOpenCreate}
          setMessages={setMessages}
        />
      )}
    </Fragment>
  );
};

export default Messages;
