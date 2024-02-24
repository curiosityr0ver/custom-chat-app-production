import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleTask from "./SingleTask";
import { TaskState } from "../context/TaskProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedTask } = TaskState();
  // console.log(selectedTask);

  return (
    <Box
      display={{ base: selectedTask ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleTask fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
