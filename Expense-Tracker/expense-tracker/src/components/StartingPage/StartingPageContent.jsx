import React, { useState, useContext, useEffect } from 'react';
import classes from './StartingPageContent.module.css';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';

const StartingPageContent = () => {
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(true);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    setProfiles(storedProfiles);
  }, []);

  const handleCompleteProfile = () => {
    setShowForm(true);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photoUrl = event.target.photoUrl.value;

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCqsq7UqyLZoMuNmuOxLnxY2z4wv5WYEaw', {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || 'Failed to update profile.');
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
      setIsProfileIncomplete(false);
      const newProfile = { name, photoUrl };
      const updatedProfiles = [...profiles, newProfile];
      setProfiles(updatedProfiles);
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    console.log("Cancel action triggered. Redirecting...");
  };

  const handleVerifyEmail = async () => {
    const idToken = authCtx.token;

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCqsq7UqyLZoMuNmuOxLnxY2z4wv5WYEaw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: idToken,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || 'Failed to send verification email.');
      }

      const data = await response.json();
      console.log("Verification email sent to:", data.email);
      setVerificationSent(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    authCtx.logout(); // Call the logout function from context
    localStorage.removeItem('idToken'); // Clear the idToken from local storage
    history.replace('/auth'); // Redirect to the login page
  };

  return (
    <section className={classes.container}>
      <button onClick={handleLogout} className={classes.logoutButton}>
        Logout
      </button>
      {!showForm ? (
        <div className={classes.message}>
          <h1>Welcome to Expense Tracker!</h1>
          <h2>Your Profile is Incomplete</h2>
          <p>
            <button onClick={handleCompleteProfile} className={classes.completeButton}>
              Complete Now
            </button>
          </p>
          <button onClick={handleVerifyEmail} className={classes.verifyButton}>
            Verify Email
          </button>
          {verificationSent && <p>Check your email! A verification link has been sent.</p>}
        </div>
      ) : (
        <div className={classes.formContainer}>
          <h1>Your profile is 64% completed. A complete profile has a higher chance of landing a job.</h1>
          <h2>Please Update Your Profile:</h2>
          <button type="button" onClick={handleCancel} className={`${classes.button} ${classes.cancelButton}`}>
            Cancel
          </button>
          <div className={classes.contact}>
            <form className="md:flex md:items-center mb-6" onSubmit={handleUpdateProfile}>
              <label>
                <img
                  src="https://th.bing.com/th?id=OIP.E6-fcGDeuehNrqgvJ-gFHwAAAA&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
                  alt="GitHub Logo"
                  className={classes.logo}
                />
                Full Name:
              </label>
              <input type="text" name="name" className="border border-lime-600 m-2 py-2 px-3" placeholder="Name" required />
              
              <label>
                <img
                  src="https://th.bing.com/th?id=OIP.NGIDdVP6vw9ue_D-mrEVFQHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2"
                  alt="Web Logo"
                  className={classes.logo}
                />
                Profile Photo URL:
              </label>
              <input type="text" name="photoUrl" className="border border-lime-600 m-2 py-2 px-3" placeholder="Photo URL" required />
              
              <div>
                <button type="submit" className={`${classes.button} ${classes.updateButton}`}>
                  Update
                </button>
              </div>
            </form>
            {error && <p className={classes.error}>{error}</p>}

            <div className={classes.profileList}>
              <h3 className="font-bold">Profiles:</h3>
              <ul>
                {profiles.map((profile, index) => (
                  <li key={index} className={classes.profileItem}>
                    <img src={profile.photoUrl} alt={profile.name} className={classes.profileImage} />
                    <span className={classes.profileName}>{profile.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StartingPageContent;
