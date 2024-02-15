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

import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import UserListItem from "../userAvatar/UserListItem";

import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { ChatState } from "../../context/ChatProvider";
import { useHistory } from 'react-router-dom';


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,
        user,
        chats,
        setChats,
    } = ChatState();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push('/');
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
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
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
        } finally {
            setLoading(false);
        }
    };

    const accessChat = async (userId) => {


        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) {
                let newChats = chats;
                newChats.push(data);
                setChats(newChats);
            } // if the chat is being newly created, then append it to existing chats state
            // console.log(chats);
            setSelectedChat(data);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        } finally {
            setLoadingChat(false);
        }
    };

    return (
        <>
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
                            Search Users
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
                        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                        <DrawerBody>
                            <Box d="flex" pb={2}>
                                <Input
                                    placeholder="Search by name or email"
                                    mr={2}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={handleSearch}>Go</Button>
                            </Box>
                            {loading
                                ? <ChatLoading />
                                : (
                                    searchResult?.map((user) => {
                                        return (
                                            <div>
                                                <h3>{user.name}</h3>

                                                <UserListItem
                                                    key={user._id}
                                                    user={user}
                                                    handleFunction={() => accessChat(user._id)}
                                                />
                                            </div>
                                        );
                                    })
                                )}
                            {loadingChat && <Spinner ml="auto" d="flex" />}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

            </Box >
        </>

    );
};

export default SideDrawer;