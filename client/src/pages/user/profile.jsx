import { userProfile } from '@/api/user.api';
import { useEffect } from 'react';

const Profile = () => {
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await userProfile();
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchProfile();
  // }, []);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};
export default Profile;
