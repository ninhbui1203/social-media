import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";

function StatusModal(props) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const { auth, theme, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleUploadImages = (e) => {
    const files = [...e.target.files];
    const newImages = [];
    let err = "";
    const arrFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    files.forEach((file) => {
      if (!file) return (err = "File upload does not exist.");

      if (arrFileTypes.indexOf(file.type) === -1)
        return (err = "File format is incorrect.");

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages([...newImages]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status.isEdit) {
      dispatch(updatePost(content, images, auth, status));
    } else {
      dispatch(createPost(content, images, auth));
    }

    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  useEffect(() => {
    if (status.isEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);
  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 className="m-0">{status.isEdit ? "Edit" : "Create"} Post</h5>
          <span
            onClick={() => {
              dispatch({ type: GLOBALTYPES.STATUS, payload: false });
            }}
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder="what are you thinking?"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>

          <div className="show_images">
            {images.map((image, index) => (
              <div key={index} id="file_img">
                <img
                  className="img-thumbnail rounded"
                  src={image.url ? image.url : URL.createObjectURL(image)}
                  alt={image.name}
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span onClick={() => handleRemoveImage(index)}>&times;</span>
              </div>
            ))}
          </div>
          <div className="input_images">
            <i className="fas fa-camera" />

            <div className="file_upload">
              <i className="fas fa-image" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handleUploadImages}
              />
            </div>
          </div>
        </div>
        <div className="status_footer my-2">
          <button className="btn btn-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
}

export default StatusModal;
