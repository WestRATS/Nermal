import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";

//schema is needed for zod validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

type LoginData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: LoginData) => void;
  users: { email: string; password: string }[];
}
// const navigate = useNavigate();
const Login = ({ onSubmit, users }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });

  // state to control the alert bar
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  // const [authenticated, setauthenticated] = useState(false);
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || "false")
  );

  const handleLogin = (login: { email: string; password: string }) => {
    console.log("Login ::  handlelogin function");
    // const { email, password } = login;

    console.log(login.email);
    console.log(login.password);
    setUsername(login.email);
    setPassword(login.password);

    console.log("Login :: users ::", users);
    console.log(
      "Login:: authenticated - before",
      localStorage.getItem("authenticated")
    );
    console.log(
      "Login::loggedinuser - before",
      localStorage.getItem("loggedInUser")
    );
    console.log("username", username);
    const account = users.find((user) => user.email === login.email);
    console.log("account", account);
    if (account && account.password === login.password) {
      setauthenticated("true");
      setInvalidLogin(false);
      console.log("Login::account.email", account.email);
      setLoggedInUser(account.email);
      localStorage.setItem("authenticated", "true");
      console.log("Login::logged in user", loggedInUser);
      localStorage.setItem("loggedInUser", account.email);
      navigate("/");
    } else {
      setInvalidLogin(true);
      setError("root.random", {
        type: "random",
      });
      console.log("Login:: User/Password could not be found");
    }
    console.log(
      "Login::authenticated - after",
      localStorage.getItem("authenticated")
    );
    console.log(
      "Login::loggedin - after",
      localStorage.getItem("loggedInUser")
    );

    // users.forEach((user) => {
    //   if (user.email === login.email && user.password === login.password) {
    //     console.log("user", user);
    //     setEmail(user.email);
    //     console.log("email", email);
    //     setInvalidLogin(false);
    //     setauthenticated(true);
    //     localStorage.setItem("authenticated", true);
    //   }
    // });

    // if (email == "") {
    //   console.log("Login:: User/Password could not be found");
    // }

    // console.log(email);
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Login:: OnSubmit Block");

        handleLogin(data);
        onSubmit(data);
        console.log("Login:: errors before reset::", errors);
        reset();
        console.log("Login:: End of onsubmit event");
        console.log("Login:: errors after reset::", errors);
      })}
    >
      {invalidLogin && (
        <div className="alert alert-danger" role="alert">
          Invalid user-id/password. Try again or sign up.
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          {...register("email")}
          id="email"
          type="text"
          className="form-control"
        ></input>
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          password
        </label>
        <input
          {...register("password")}
          id="password"
          type="text"
          className="form-control"
        ></input>
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      <button className="btn btn-primary mb-3">login</button>
    </form>
  );
};

export default Login;
