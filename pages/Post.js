import React from "react";

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import Style from "../styles/blog.module.css";

const Post = ({ id, title, content, editPost, deletePost }) => {
  return (
    <>
      <div className={Style.card + ' ' + Style.card_width + ' ' + Style.bg_dark}>
        <section key={id}>
          <h3>{title}</h3>
          <hr className={Style.new1}></hr>
          <p>{content}</p>
          <span title="edit post" onClick={() => editPost(id)}>
            <i className="edit-button far fa-edit fa-2x button-css" />
          </span>
          <span title="delete post" onClick={() => deletePost(id)}>
            <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
          </span>
        </section>
      </div>
    </>
  );
};

export default Post;
