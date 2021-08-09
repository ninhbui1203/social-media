import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import validUploadImage from "../../utils/validUploadImage";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

function EditProfile({ setEditUser }) {
  const initalState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };

  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState(initalState);
  const { fullname, mobile, address, website, story, gender } = userData;

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    const errImage = validUploadImage(file);

    if (errImage)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: errImage,
        },
      });

    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser(userData, avatar, auth));
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setEditUser(false)}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <div className="info_avatar form-group">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="Avatar"
          />
          <span>
            <i className="fas fa-camera"></i>
            <p>Change</p>
            <input
              type="file"
              name="avatar"
              accept="images/*"
              onChange={handleChangeAvatar}
            />
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              name="fullname"
              value={fullname}
              id="fullname"
              placeholder="Full Name..."
              onChange={handleChangeInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >{`${fullname.length}/25`}</small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={mobile}
            id="mobile"
            placeholder="Mobile..."
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={address}
            id="address"
            placeholder="Address..."
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            className="form-control"
            name="website"
            value={website}
            id="website"
            placeholder="Website..."
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea
            className="form-control"
            id="story"
            name="story"
            value={story}
            rows="3"
            onChange={handleChangeInput}
          ></textarea>
          <small className="text-danger">{`${story.length}/255`}</small>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={gender}
            onChange={handleChangeInput}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-info btn-block">
          Save Info
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
