import React from "react";

// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

const ModifyPost = (props) => {
  return (
    <>
      <form>
        <h2>Modify Post</h2>
        <label className="col-sm-12 col-form-label">
          <b>Title</b>
          <input
            className="form-control form-control-sm"
            defaultValue={props.title}
            autoFocus={true}
            onChange={props.savePostTitleToState}
            placeholder="title"
            size="39"
          />
        </label>
        <br />
        <label className="col-sm-12 col-form-label">
          <b>Content</b>
          <textarea
            className="form-control form-control-sm"
            defaultValue={props.content}
            onChange={props.savePostContentToState}
            placeholder="contents"
            rows="18"
            cols="41"
          />
        </label>
        <button
          title="update changes"
          className="btn btn-success ml-3"
          onClick={props.updatePost}
        >
          Update Post
        </button>
      </form>
    </>
  );
};
export default ModifyPost;
