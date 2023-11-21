import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const notify = (content) => toast.error(content);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);

  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://artfolio-y03z.onrender.com/api/auth/login", formData)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else if (res.data.message && res.data.token) {
          toast.success(res.data.message);
          setCookie("token", res.data.token, {
            path: "/",
            expires: expirationDate,
          });
          navigate("./userprofile");
        }
      })
      .catch((err) => {
        if (err.response.data.detail) {
          notify("Username or password is wrong");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white border-b-2 border-white">
      <Card color="dark" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-[#000]">
          Sign In
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-black p-8 border-white border-2 rounded"
          onSubmit={handleLoginSubmit}
        >
          <div className="mb-4 flex flex-col gap-6 text-gray-300">
            <Input
              size="lg"
              label="Username"
              className="text-white focus:text-white"
              name="username"
              onChange={handleChange}
              required
              style={{ backgroundColor: "#1E293B" }}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              className="text-white focus:text-white"
              required
              onChange={handleChange}
              style={{ backgroundColor: "#1E293B" }}
            />
          </div>

          <Button
            type="submit"
            className="mt-6 bg-gray-700 text-white font-bold py-2 px-4 rounded hover:opacity-90"
            fullWidth
          >
            Log In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

function Signup() {
  const [registerData, setRegisterData] = useState({});
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size < 5000000) {
        if (
          e.target.files[0].type === "image/jpeg" ||
          e.target.files[0].type === "image/jpg" ||
          e.target.files[0].type === "image/png"
        ) {
          setFormError({
            ...formError,
            imageerror: "",
          });
          setRegisterData({
            ...registerData,
            [e.target.name]: e.target.files[0],
          });
        } else {
          setFormError({
            ...formError,
            imageerror: "Image should be in jpeg, jpg or png format",
          });
        }
      } else {
        setFormError({
          ...formError,
          imageerror: "Image size should be less than 5MB",
        });
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    await e.preventDefault();
    if (!formError.imageerror || formError.imageerror === "") {
      await axios
        .post("https://artfolio-y03z.onrender.com/api/auth/register", registerData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else if (res.data.message) {
            toast.success(res.data.message);
            navigate("/signin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white border-b-2 border-white">
      <Card color="dark" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-[#000]">
          Sign Up
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 bg-black p-8 border-white border-2 rounded"
          onSubmit={handleRegisterSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Username"
              className="text-white"
              required
              name="username"
              onChange={handleChange}
              style={{ backgroundColor: "#1E293B" }}
            />
            <Input
              size="lg"
              label="Email"
              className="text-white"
              required
              name="email"
              onChange={handleChange}
              style={{ backgroundColor: "#1E293B" }}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              className="text-white"
              required
              name="password"
              onChange={handleChange}
              style={{ backgroundColor: "#1E293B" }}
            />

            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-white focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-white dark:file:bg-neutral-700 dark:file:text-white dark:focus:border-primary"
              type="file"
              name="image"
              id="formFile"
              required
              accept="image/*"
              onChange={handleChangeFile}
              style={{ backgroundColor: "#1E293B" }}
            />
          </div>
          {formError["imageerror"] ? (
            <p className="text-red-700 text-base">{formError.imageerror}</p>
          ) : (
            <></>
          )}
          <Button
            type="submit"
            className="mt-6 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:opacity-90"
            fullWidth
          >
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-gray-900 ">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export { Signin, Signup };
