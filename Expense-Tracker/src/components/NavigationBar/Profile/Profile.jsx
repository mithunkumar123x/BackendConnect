import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

export const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    imageUrl: "",
  });

  const { token } = useContext(AuthContext);

  const saveProfile = async (data) => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCqsq7UqyLZoMuNmuOxLnxY2z4wv5WYEaw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Sending request");
      if (res.ok) {
        const resData = await res.json();
        console.log(resData, "Profile update successful");
        return resData;
      } else {
        const resData = await res.json();
        console.error("Error updating profile:", resData.error.message);
        alert(`Error: ${resData.error.message}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  const { name, imageUrl } = profile;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);

    saveProfile({
      idToken: token,
      displayName: name,
      photoUrl: imageUrl,
    });
  };

  const onChangeHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div>
        <h3>Please Complete Your Profile</h3>
      </div>

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={onChangeHandler}
            placeholder="Enter Full Name"
          />
        </div>

        <div>
          <label htmlFor="img_url">Profile Photo URL:</label>
          <input
            id="img_url"
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={onChangeHandler}
            placeholder="Enter Image URL"
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};
