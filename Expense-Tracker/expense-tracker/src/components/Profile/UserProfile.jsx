import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Welcome to Expense Tracker !!</h1>

      <p>You want to reset your password.type below...</p>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;