import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';
import axios from "axios";

import {
    Menu,
    MenuButton,
    // MenuDivider,
    // MenuItem,
    // MenuList,
} from "@chakra-ui/menu";

import TaskListItem from "../userAvatar/TaskListItem";

import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { TaskState } from "../../context/TaskProvider";
import { useNavigate } from 'react-router-dom';


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const { setSelectedTask, user } = TaskState();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history('/');
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/task?search=${search}`, config);
            // console.log(data);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    };

    const accessTask = async (taskId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/task${taskId}`, config);

            setSelectedTask(data);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the task",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    };

    return (
        <Box
            bg="white"
            p="5px 10px 5px 10px"
            borderWidth="5px"
            display='flex'
            justifyContent="space-between"
            alignItems="center"
        >
            <Tooltip label="Search users to chat" hasArrow placeContent='bottom-end' >
                <Button variant='ghost' onClick={onOpen}>
                    <i className="fas fa-search"></i>
                    <Text display={{ base: "none", md: "flex" }} p="4">
                        Search Tasks
                    </Text>
                </Button>
            </Tooltip>
            <Text fontSize='2xl' fontFamily='Work sans'>
                {user.name}
            </Text>
            <div>
                <Menu>
                    <MenuButton>
                        <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
                    </MenuButton>

                    <MenuButton
                        onClick={logoutHandler}
                        ml='2'
                        as={Button}
                        colorScheme='red'
                        rightIcon={<CloseIcon size='sm' />}
                    >
                        Log Out
                    </MenuButton>
                </Menu>
            </div>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Tasks</DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder="Search by title"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {searchResult?.map((task) =>
                            <TaskListItem
                                key={task._id}
                                task={task}
                                handleFunction={() => accessTask(task._id)}
                            />
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box >
    );
};

export default SideDrawer;