import { Box } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import Chatbox from "../components/TaskBox";
import MyTasks from "../components/MyTasks";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { TaskState } from "../context/TaskProvider";

const Taskpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    const { user, setUser } = TaskState();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
    }, []);

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display='flex' justifyContent='space-between' w='100%' h={'100vh'} p='10px'>
                {user && <MyTasks fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    );
};

export default Taskpage;
