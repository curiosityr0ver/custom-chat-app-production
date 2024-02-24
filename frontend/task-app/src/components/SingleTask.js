import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Heading, Badge, Button } from '@chakra-ui/react';
import UpdateTaskModal from "./miscellaneous/UpdateTaskModal";
import axios from "axios";


// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { TaskState } from "../context/TaskProvider";
// const ENDPOINT = "http://localhost:5000"; (for local machine, also change is server.js)
// const ENDPOINT = "https://custom-mern-chat-app-production.onrender.com";

// "https://talk-a-tive.herokuapp.com"; -> After deployment
// var socket, selectedChatCompare;

const SingleTask = ({ fetchAgain, setFetchAgain }) => {
  // const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();


  const { user, tasks, setTasks, selectedTask, setSelectedTask } = TaskState();

  // const fetchMessages = async () => {
  //   if (!selectedTask) return;

  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     setLoading(true);

  //     const { data } = await axios.get(
  //       `/api/message/${selectedChat._id}`,
  //       config
  //     );
  //     setMessages(data);
  //     setLoading(false);

  //     // socket.emit("join chat", selectedChat._id);
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured!",
  //       description: "Failed to Load the Messages",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   }
  // };

  // const sendMessage = async (event) => {
  //   if (event.key === "Enter" && newMessage) {
  //     // socket.emit("stop typing", selectedChat._id);
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       };
  //       setNewMessage("");
  //       const { data } = await axios.post(
  //         "/api/message",
  //         {
  //           content: newMessage,
  //           chatId: selectedChat,
  //         },
  //         config
  //       );
  //       // socket.emit("new message", data);
  //       setMessages([...messages, data]);
  //     } catch (error) {
  //       toast({
  //         title: "Error Occured!",
  //         description: "Failed to send the Message",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connected", () => setSocketConnected(true));
  //   socket.on("typing", () => setIsTyping(true));
  //   socket.on("stop typing", () => setIsTyping(false));

  //   eslint-disable-next-line
  // }, [selectedTask]);

  // useEffect(() => {
  //   fetchMessages();

  //   selectedChatCompare = selectedChat;
  //   // eslint-disable-next-line
  // }, [selectedChat]);

  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //     ) {
  //       if (!notification.includes(newMessageRecieved)) {
  //         setNotification([newMessageRecieved, ...notification]);
  //         setFetchAgain(!fetchAgain);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });

  const handleDelete = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // return console.log(selectedTask._id);
      const { data } = await axios.delete(
        `/api/task/${selectedTask._id}`,
        config
      );

      const index = tasks.indexOf(selectedTask);
      tasks.splice(index, 1);
      setTasks([...tasks]);
      setSelectedTask(null);

      toast({
        title: "Task Deleted !",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Delete the Task!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };


  return selectedTask ? (

    <Box
      display={{ base: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={"100%"}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Heading as="h1" size="4xl" mb={2}>
        {selectedTask.title}
      </Heading>
      <Text fontSize="xx-large" color="gray.500" mb={2}>
        {selectedTask.description}
      </Text>
      <Text fontSize="xx-large" color="gray.700" mb={2}>
        Deadline: {new Date(selectedTask.deadline).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric" })}
      </Text>
      <Badge fontSize="xl" colorScheme={selectedTask.status ? 'green' : 'red'}>
        {selectedTask.status ? "Finished" : "Unfinished"}
      </Badge>

      <Box width={"45%"} display={"flex"} justifyContent="space-evenly" p="5px 10px">
        <UpdateTaskModal selectedTask={selectedTask} fetchAgain={fetchAgain}>
          <Button variant="outline" leftIcon={<EditIcon />} colorScheme='teal' size='lg'>
            Edit
          </Button>
        </UpdateTaskModal>

        <Button onClick={handleDelete} leftIcon={<DeleteIcon />} colorScheme='red' size='lg'>
          Delete
        </Button>
      </Box>
    </Box>

  ) : (
    <Text fontSize="xx-large" color="gray.700" mb={2}>
      Select A Task
    </Text>
  );
};

export default SingleTask;
