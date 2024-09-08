import  { useState, useContext, useEffect } from 'react';
import classes from './StartingPageContent.module.css';
import AuthContext from '../store/auth-context';

const StartingPageContent = () => {
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(true);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const authCtx = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false); 

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

  return (
    <section className={classes.container}>
      {!showForm ? (
        <div className={classes.message}>
          <h1>Welcome to Expense Tracker!</h1>
          <h2>Your Profile is Incomplete</h2>
          <p>
            <button onClick={handleCompleteProfile} className={classes.completeButton}>
              Complete Now
            </button>
          </p>
        </div>
      ) : (
        <div className={classes.formContainer}>
          <h1>Your profile is 64% completed. A complete profile has a higher chance of landing a job.<a>Complete now.</a></h1>
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
