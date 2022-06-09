import "./styles.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [nameCheck, setNameCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [confPasswordCheck, setConfPasswordCheck] = useState("");

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name field is empty.")
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ]+( [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
        "There are invalid characters."
      ),
    email: yup
      .string()
      .required("Email field is empty.")
      .email("Your email is invalid."),
    password: yup
      .string()
      .required("Password field is empty.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Your password must have an uppercase letter, a lowercase letter, a number, a special character, and be at least 8 characters long"
      ),
    confirmPassword: yup
      .string()
      .required("You must confirm your password.")
      .oneOf([yup.ref("password"), null], "Passwords mustn't be different."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  useEffect(() => {
    if (errors.name?.message) {
      setNameCheck(true);
    }
  }, [errors.name?.message]);

  useEffect(() => {
    if (errors.email?.message) {
      setEmailCheck(true);
    }
  }, [errors.email?.message]);
  useEffect(() => {
    if (errors.password?.message) {
      setPasswordCheck(true);
    }
  }, [errors.password?.message]);
  useEffect(() => {
    if (errors.confirmPassword?.message) {
      setConfPasswordCheck(true);
    }
  }, [errors.confirmPassword?.message]);

  const history = useHistory();

  function onSubmitFunction(data) {
    console.log(data);
    if (data) {
      history.push(`/success/${data.name}`);
    }
  }

  function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  //credits to https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
  //adapted for personal use

  return (
    <form className="formRef" onSubmit={handleSubmit(onSubmitFunction)}>
      <div className="inputRef">
        <input
          type="text"
          {...register("name")}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameCheck(false);
          }}
          className={nameCheck ? "setInvalid" : ""}
          autoComplete="off"
        />
        <label htmlFor="name"> Name</label>
      </div>
      <div className="errorMessage"> {errors.name?.message} </div>
      <div className="inputRef">
        <input
          type="email"
          {...register("email")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailCheck(false);
          }}
          //   onBlur={() => setEmailCheck(false)}
          className={emailCheck ? "setInvalid" : ""}
          autoComplete="off"
        />
        <label htmlFor="email"> E-mail </label>
      </div>
      <div className="errorMessage"> {errors.email?.message} </div>

      <div className="inputRef">
        <input
          type="password"
          {...register("password")}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordCheck(false);
          }}
          //   onBlur={() => setPasswordCheck(false)}
          className={passwordCheck ? "setInvalid" : ""}
        />
        <label htmlFor="password"> Password</label>
      </div>
      <div className="errorMessage"> {errors.password?.message} </div>

      <div className="inputRef">
        <input
          type="password"
          {...register("confirmPassword")}
          value={confPassword}
          onChange={(e) => {
            setConfPassword(e.target.value);
            setConfPasswordCheck(false);
          }}
          //   onBlur={() => setConfPasswordCheck(false)}
          className={confPasswordCheck ? "setInvalid" : ""}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
      </div>
      <div className="errorMessage"> {errors.confirmPassword?.message} </div>

      <button onClick={createRipple}> Cadastrar </button>
    </form>
  );
}
