import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { TaskState } from "../../context/TaskProvider";


const NewTaskModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [taskTitle, setTaskTitle] = useState();
    const [taskDescription, setTaskDescription] = useState();
    const [taskDeadline, setTaskDeadline] = useState();
    const toast = useToast();

    const { user, tasks, setTasks } = TaskState();



    const handleSubmit = async () => {
        if (!taskTitle || !taskDescription) {
            toast({
                title: "Please add task name and description",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            // console.log(taskDeadline);
            const { data } = await axios.post(
                `/api/task/`,
                {
                    title: taskTitle,
                    description: taskDescription,
                    deadline: taskDeadline
                },
                config
            );
            setTasks([data, ...tasks]);
            onClose();
            toast({
                title: "New Task Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create the Task!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        Create New Task
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder="Task Name"
                                mb={3}
                                // value
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Task Description"
                                mb={1}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Task Description"
                                mb={1}
                                type="date"
                                onChange={(e) => setTaskDeadline(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewTaskModal;
