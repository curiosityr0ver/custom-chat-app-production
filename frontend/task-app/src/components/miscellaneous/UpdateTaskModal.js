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
    Checkbox
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { TaskState } from "../../context/TaskProvider";


const UpdateTaskModal = ({ children, selectedTask }) => {
    // console.log(selectedTask.status);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [taskTitle, setTaskTitle] = useState();
    const [taskDescription, setTaskDescription] = useState();
    const [taskDeadline, setTaskDeadline] = useState();
    const [taskStatus, setTaskStatus] = useState();
    const toast = useToast();

    const { user, tasks, setTasks, setSelectedTask } = TaskState();



    const handleSubmit = async () => {

        // console.log({
        //     title: taskTitle,
        //     description: taskDescription,
        //     deadline: taskDeadline,
        //     status: taskStatus
        // });
        // return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            // console.log(taskDeadline);
            const { data } = await axios.put(
                `/api/task/`,
                {
                    taskId: selectedTask._id,
                    title: taskTitle,
                    description: taskDescription,
                    deadline: taskDeadline,
                    status: taskStatus
                },
                config
            );
            // setTasks([])
            const index = tasks.indexOf(selectedTask);
            tasks[index] = data;
            setTasks([...tasks]);
            setSelectedTask(data);
            onClose();
            toast({
                title: "Task Updated!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Update the Task!",
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
                        Edit Task
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder="Task Name"
                                mb={3}
                                defaultValue={selectedTask.title}
                                // value
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Task Description"
                                mb={1}
                                defaultValue={selectedTask.description}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Task Deadline"
                                mb={1}
                                defaultValue={new Date(selectedTask.deadline).toISOString().split('T')[0]}
                                type="date"
                                onChange={(e) => setTaskDeadline(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Checkbox
                                colorScheme="green"
                                defaultChecked={selectedTask.status}
                                onChange={(e) => setTaskStatus(e.target.checked)}
                            >Finished </Checkbox>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
};

export default UpdateTaskModal;
