import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// type: PostType;
// community_id: ICommunityDoc["_id"];
// author_id: IUserDoc["_id"];
// text: string;
// images?: string[];
// location?: string;
// title?: string;
// max_capacity?: number;
// rsvp?: IUserDoc["_id"][];
// options?: IPollOption[];
// price?: number;

const CreatePost = ({ postType }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { communities } = useSelector((state) => state.feed);
  const navigate = useNavigate();
  const [addressQuery, setAddressQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [formData, setFormData] = useState({
    type: postType,
    title: "",
    text: "",
    community_id: "",
    location: "",
    max_capacity: 0,
    price: "",
    options: [],
    images: [],
  });

  useEffect(() => {
    if (postType === "poll") {
      setFormData((prevState) => ({ ...prevState, options: [""] }));
    } else setFormData((prevState) => ({ ...prevState, options: [] }));
  }, [postType]);

  useEffect(() => {
    setFormData((prevState) => ({ ...prevState, type: postType }));
  }, [postType]);

  useEffect(() => {
    // if (!window.google) return;
    if (addressQuery) {
      const updatePredictions = function (predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
          alert(status);
          return;
        }

        setPredictions(predictions);
      };

      const service = new window.google.maps.places.AutocompleteService();

      service.getQueryPredictions({ input: addressQuery }, updatePredictions);
    }
  }, [addressQuery]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let payload = {
      type: postType,
      community: formData.community_id,
      text: formData.text,
      location: formData.location,
    };

    // Add optional fields
    if (!!formData.location) payload.location = formData.location;
    if (!!formData.title) payload.title = formData.title;
    if (formData.images.length > 0) payload.images = formData.images;

    // Add type-specific fields
    if (formData.type === "event") {
      payload.max_capacity = formData.max_capacity;
      payload.title = formData.title;
    } else if (formData.type === "marketplace") {
      payload.price = formData.price;
      payload.images = formData.images;
      payload.image = " ";
    } else if (postType === "poll") {
      payload.options = [];
      formData.options.forEach((value) => {
        if (value) payload.options.push({ value });
      });
    }

    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] === "string" && !payload[key])
        toast.error(`${key} is required`);
      if (typeof payload[key] === "array" && payload[key].length === 0)
        toast.error(`${key} is required`);
    });

    // Create post
    axios
      .post(`${process.env.REACT_APP_API_URL}/post`, payload, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
        console.log(res);
        toast.success("Post created!");
        navigate("/dashboard");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <h3 className="posttag">New {postType}</h3>
      <form className="custom-form" onSubmit={onSubmit}>
        <div className="form-group ">
          <label htmlFor="community_id">Community: </label>

          <select
            className="drop"
            name="community_id"
            onChange={onChange}
            value={formData.community_id}
          >
            <option value="" disabled>
              Select a community
            </option>
            {communities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <br />

          <label htmlFor="location">Location: </label>
          <input
            className="loc"
            type="text"
            name="location"
            placeholder={formData.location}
            onChange={(e) => setAddressQuery(e.target.value)}
            value={addressQuery}
          />
          {predictions.length > 0 && (
            <ul className="predictions list-group">
              {predictions.map((p) => (
                <li
                  key={p.place_id}
                  className="prediction list-group-item"
                  onClick={() => {
                    setFormData((prevState) => ({
                      ...prevState,
                      location: p.description,
                    }));
                    setAddressQuery("");
                    setPredictions([]);
                  }}
                >
                  {p.description}
                </li>
              ))}
            </ul>
          )}

          <button
            className="btn btn-primary preview"
            disabled={!formData.location}
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://maps.google.com?q=${formData.location}`, "_blank");
            }}
          >
            Preview Location
          </button>

          {postType === "event" && <label htmlFor="max_capacity">Max Capacity: </label>}
          {postType === "event" && (
            <input
              className="max"
              type="number"
              name="max_capacity"
              placeholder="Maximum Capacity"
              onChange={onChange}
              value={formData.max_capacity}
            />
          )}

          {postType === "marketplace" && <label htmlFor="price">Price:</label>}
          {postType === "marketplace" && (
            <input
              className="pricedrop"
              type="number"
              name="price"
              placeholder="Price Range"
              onChange={onChange}
              value={formData.price}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            className="titletag"
            type="text"
            name="title"
            placeholder="Title"
            onChange={onChange}
            value={formData.title}
          />
        </div>

        {formData.options.length > 0 && (
          <div className="form-group poll">
            <label className="polltag" htmlFor="title">
              Poll Options:{" "}
            </label>
            <br />
            {formData.options.map((option, i) => (
              <input
                className="option"
                key={i}
                type="text"
                name="options"
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    options: prevState.options.map((o, j) =>
                      i === j ? e.target.value : o
                    ),
                  }));
                }}
                value={formData.options[i]}
              />
            ))}
            <button
              className="btn btn-primary option-btn"
              onClick={(e) => {
                e.preventDefault();
                setFormData((prevState) => ({
                  ...prevState,
                  options: [...prevState.options, ""],
                }));
              }}
            >
              Add Option
            </button>
          </div>
        )}
        <div className="form-group postgroup">
          <label className="imgtag" htmlFor="text">
            Image:
          </label>
          <input
            className="postimg"
            type="file"
            name="image"
            placeholder="Upload an image"
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                images: [e.target.files[0]],
              }));
            }}
          />

          {formData.images.length > 0 && (
            <img
              src={URL.createObjectURL(formData.images[0])}
              alt="preview"
              className="post-img"
              width={400}
            />
          )}
        </div>
        <div className="form-group">
          <textarea
            className="messagearea"
            name="text"
            onChange={onChange}
            value={formData.text}
            placeholder="What's on your mind?"
          />
        </div>
        <button type="submit" className="btn btn-primary create">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
