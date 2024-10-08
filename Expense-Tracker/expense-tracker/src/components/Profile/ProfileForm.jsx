import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const token = useSelector((state) => state.auth.token);  // Access token from Redux state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCqsq7UqyLZoMuNmuOxLnxY2z4wv5WYEaw', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = 'Password update failed!';
        if (data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      setError(null);
      newPasswordInputRef.current.value = ''; 
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
      {error && <p className={classes.error}>{error}</p>}
      {success && <p className={classes.success}>Password updated successfully!</p>}
    </form>
  );
};

export default ProfileForm;
