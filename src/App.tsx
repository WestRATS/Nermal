import { useState, useEffect } from "react";
import { Link, BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./Form";
import TaskForm from "./task-tracking/components/TaskForm";
import TaskList from "./task-tracking/components/TaskList";
import TaskFilter from "./task-tracking/components/TaskFilter";
import categories from "./task-tracking/categories";
import status from "./task-tracking/status";
import Navbar from "./task-tracking/components/Navbar";
import Login from "./task-tracking/components/Login";
import { ZodLiteral } from "zod";
import Greetings from "./task-tracking/components/Greetings";
import Signup from "./task-tracking/components/Signup";
import Headers from "./task-tracking/components/Header";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      email: "gp@gmail.com",
      taskName: "math",
      status: "in progress",
      category: "school/work",
    },
    {
      id: 6,
      email: "gp@gmail.com",
      taskName: "food bank",
      status: "tbd",
      category: "volunteer hours",
    },
    {
      id: 4,
      email: "abc@gmail.com",
      taskName: "s.a.t",
      status: "in progress",
      category: "extra curriculars",
    },
  ]);

  const [users, setUsers] = useState([
    { email: "gp@gmail.com", password: "gp12345678" },
    { email: "abc@gmail.com", password: "abc12345678" },
  ]);

  const [authenticated, setauthenticated] = useState("");
  useEffect(() => {
    const authenticatedUser = localStorage.getItem("authenticated");
    if (authenticatedUser == "true") {
      setauthenticated(authenticatedUser);
    }
  }, []);
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    const authenticatedUserEmail = localStorage.getItem("loggedInUser");

    if (authenticatedUserEmail != null) {
      setLoggedInUser(authenticatedUserEmail);
    }
  }, []);

  console.log("APP:: logged in user", loggedInUser);
  console.log("APP:: authenticated?", authenticated);

  const visibleTasks1 = selectedCategory
    ? tasks.filter((t) => t.category === selectedCategory)
    : tasks;

  // console.log(visibleTasks1);
  // console.log(loggedInUser);

  //further filtering by user id
  const visibleTasks = loggedInUser
    ? visibleTasks1.filter((t) => t.email === loggedInUser)
    : visibleTasks1;
  console.log(visibleTasks);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id == id ? { ...task, status: "done" } : task))
    );
  };
  const handleLogin = (login: { email: string; password: string }) => {
    console.log("APP:: In Handle Login");
    console.log("APP::login::", login);
   
    const authenticatedUser = localStorage.getItem("authenticated");
    console.log("APP::authenticatedUser::", authenticatedUser);
    const authenticatedUserEmail = localStorage.getItem("loggedInUser");
    console.log("APP::authenticatedUserEmail::", authenticatedUserEmail);
    if (authenticatedUserEmail != null) {
       setLoggedInUser(authenticatedUserEmail);
    }
    if (authenticatedUser != null) {
       setauthenticated(authenticatedUser);
    }
  

    // useEffect(() => {
    //   const authenticatedUser = localStorage.getItem("authenticated");
    //   if (authenticatedUser == "true") {
    //     setauthenticated(authenticatedUser);
    //   }
    // }, []);

    // useEffect(() => {
    //   const authenticatedUserEmail = localStorage.getItem("loggedInUser");

    //   if (authenticatedUserEmail != null) {
    //     setLoggedInUser(authenticatedUserEmail);
    //   }
    // }, []);

    // const { email, password } = login;

    // let email = "";
    // users.forEach((user) => {
    //   if (user.email === login.email && user.password === login.password) {
    //     console.log("user", user);
    //     email = user.email;
    //     console.log("email", email);
    //   }
    // });

    // if (email === null) {
    //   email = "gp@gmail.com";
    // }
    // console.log("email", email);
    // setLoggedInUser(email);
  };

  const handleSignup = (signup: { email: string; password: string }) => {
    console.log("APP:: In Handle Signup");
    console.log("APP", signup);

    setUsers([...users, signup]);

    // const { email, password } = login;

    // let email = "";
    // users.forEach((user) => {
    //   if (user.email === login.email && user.password === login.password) {
    //     console.log("user", user);
    //     email = user.email;
    //     console.log("email", email);
    //   }
    // });

    // if (email === null) {
    //   email = "gp@gmail.com";
    // }
    // console.log("email", email);
    // setLoggedInUser(email);
  };

  console.log("APP:: loggedinuser-XXXXX", loggedInUser);
  console.log("APP:: authenticated-XXXXX", authenticated);

  return (
    <>
      <BrowserRouter>
        <div className="mb-5">
          <Navbar></Navbar>
        </div>
        <Routes>
          <Route
            path="login"
            element={
              <>
                <Headers msg={"login please"} header={"login"}></Headers>
                <Login
                  onSubmit={(login) => handleLogin(login)}
                  users={users}
                ></Login>
              </>
            }
          ></Route>
          <Route
            path="signup"
            element={
              <>
                <Headers msg={"signup please"} header={"signup"}></Headers>
                <Signup
                  onSubmit={(signup) => handleSignup(signup)}
                  users={users}
                ></Signup>
              </>
            }
          ></Route>
          <Route
            path="create"
            element={
              authenticated == "true" ? (
                <>
                  <Headers
                    msg={"create a task here:"}
                    header={"create task"}
                  ></Headers>
                  <TaskForm
                    onSubmit={(task) =>
                      setTasks([
                        ...tasks,
                        { ...task, id: tasks.length + 1, email: loggedInUser },
                      ])
                    }
                  />
                </>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>

          <Route
            path="/"
            element={
              authenticated == "true" ? (
                <>
                  <Greetings loggedInUser={loggedInUser}></Greetings>
                  <TaskFilter
                    onSelectCategory={(category) =>
                      setSelectedCategory(category)
                    }
                  />
                  <TaskList
                    tasks={visibleTasks}
                    onDelete={(id) => setTasks(tasks.filter((t) => t.id != id))}
                    onDone={handleDone}
                  ></TaskList>{" "}
                </>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
