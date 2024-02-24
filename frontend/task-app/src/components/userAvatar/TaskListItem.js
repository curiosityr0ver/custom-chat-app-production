import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const TaskListItem = ({ task, handleFunction }) => {

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={task.title}
        src={require(`../../assets/${!task.status ? "done" : "not-done"}.png`)}
      />
      <Box>
        <Text fontSize="xs">
          <b>Title : </b>
          {task.title}
        </Text>
        <Text noOfLines={2} fontSize="xs">
          {task.description}
        </Text>
      </Box>
    </Box>
  );
};

export default TaskListItem;
