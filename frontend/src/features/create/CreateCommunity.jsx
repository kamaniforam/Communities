import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./createCommunity.scss";
import Btn from "../../components/common/inputBox.jsx";

const CreateCommunity = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    image: "",
    description: "",
  });

  const theme = localStorage.getItem("theme");

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/community`, formData, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        toast.success("Community created successfully", {
          theme: theme,
        });

        navigate(`/search/${res.data.name}`);
      })
      .catch((err) => {
        let message = "Error creating community";
        if (err.response?.data?.message) message = err.response.data.message;
        toast.error(message, {
          theme: theme,
        });
        console.log(err);
      });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, type, image, description } = formData;

  console.log("formData", formData);
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <h1 className="commtitle">Create Community</h1>
        {/* <label htmlFor="name">Name: </label> */}
        <input
          className="dropdown"
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={onChange}
        />

        {/* <label htmlFor="type">Community type:</label> */}
        <select
          className="dropdown"
          name="type"
          value={type}
          onChange={onChange}
          required
        >
          <option value="none" hidden>
            Select Communtiy type
          </option>
          <option value="school">School</option>
          <option value="company">Company</option>
          <option value="organization">Organization</option>
          <option value="club">Club</option>
          <option value="neighborhood">Neighborhood</option>
          <option value="interest">Interest</option>
        </select>
        {/* <label htmlFor="image">Image</label> */}
        <input
          className="dropdown"
          type="file"
          name="image"
          placeholder="Community image"
          value={image}
          onChange={onChange}
        />

        {/* <label htmlFor="description">Description</label> */}
        <input
          className="dropdown"
          type="text"
          name="description"
          placeholder="Description"
          required
          value={description}
          onChange={onChange}
        />
        <br />
        <button className="btn btn-primary comm" type="submit">
          Create Community
        </button>
      </form>
    </div>
  );
};

export default CreateCommunity;
