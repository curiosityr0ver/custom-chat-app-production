import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [selectedTask, setSelectedTask] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [tasks, setTasks] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
            navigate("/");
            setTasks([]);
        } else {
            setUser(userInfo);
        }
        // console.log(userInfo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TaskContext.Provider
            value={{
                selectedTask,
                setSelectedTask,
                user,
                setUser,
                notification,
                setNotification,
                tasks,
                setTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const TaskState = () => {
    return useContext(TaskContext);
};

export default TaskProvider;
