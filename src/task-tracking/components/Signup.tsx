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

type SignupData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: SignupData) => void;
  users: { email: string; password: string }[];
}
// const navigate = useNavigate();
const Signup = ({ onSubmit, users }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SignupData>({ resolver: zodResolver(schema) });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [existingUser, setExistingUser] = useState(false);

  const handleSignup = (signup: { email: string; password: string }) => {
    console.log("Signup ::  handlesignup function");
    const account = users.find((user) => user.email === signup.email);
    if (account) {
      setExistingUser(true);
      console.log("Login::account.email", account.email);
      console.log("Signup:: an existing user");
    } else {
      setExistingUser(false);
      console.log("Signup:: Not an existing user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Signup:: OnSubmit Block");
        handleSignup(data);
        onSubmit(data);
        reset();
      })}
    >
      {existingUser && (
        <div className="alert alert-danger" role="alert">
          The email id you have provided already exists in our database. Try
          again or navigate to login page.
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
      <button className="btn btn-primary mb-3">signup</button>
    </form>
  );
};

export default Signup;
