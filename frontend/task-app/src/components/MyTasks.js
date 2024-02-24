import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import NewTaskModal from "./miscellaneous/NewTaskModal";
import { Button } from "@chakra-ui/react";
import { TaskState } from "../context/TaskProvider";

const MyTasks = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedTask, setSelectedTask, tasks, setTasks, user } = TaskState();

  const toast = useToast();

  const fetchTasks = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/task", config);

      setTasks(data);
      // console.log(tasks);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the tasks",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchTasks();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedTask ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Tasks
        <NewTaskModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            Add
          </Button>
        </NewTaskModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
      >

        <Stack overflowY="scroll">
          {tasks.map((task) => (
            <Box
              onClick={() => setSelectedTask(task)}
              cursor="pointer"
              bg={selectedTask === task ? "#38B2AC" : "#E8E8E8"}
              color={selectedTask === task ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={task._id}
            >
              <Text>
                {task.title}
              </Text>
              <Text noOfLines={2} fontSize="xs">
                <b>{task.description} : </b>
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default MyTasks;
