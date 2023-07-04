import "./createForms.scss";

const postTypes = [
  { type: "event", text: "Event" },
  { type: "poll", text: "Poll" },
  { type: "marketplace", text: "Marketplace" },
];

const CreateMenu = ({ setFormType, formType, postType, setPostType }) => {
  const showPostTypes = formType === "post";
  return (
    <div>
      <div className="menu-item">
        <div onClick={() => setFormType("post")} className="menu-title">
          Create Post
        </div>
        <div
          style={{
            maxHeight: showPostTypes ? 300 : 0,
            visibility: showPostTypes ? "visible" : "hidden",
            opacity: showPostTypes ? 1 : 0,
            transition: showPostTypes
              ? "visibility 1s 0.5s, opacity 0.5s linear 0.5s, max-height 0.5s ease-in-out"
              : "visibility 1s, opacity 0.5s linear, max-height 0.5s ease-in-out 0.5s",
          }}
        >
          <div>
            <div style={{ height: 12 }}></div>
            <ul>
              {postTypes.map((p) => (
                <li
                  key={p.type}
                  className={postType === p.type ? "active" : ""}
                  onClick={() => setPostType(p.type)}
                >
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={`menu-item ${formType === "community" ? "active" : ""}`}>
        <span onClick={() => setFormType("community")} className="menu-title">
          Create Community
        </span>
      </div>
    </div>
  );
};

export default CreateMenu;
