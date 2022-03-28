import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getProfile } from '../../redux/actions/users';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(
    (state) => state.profileDetails
  );
  const router = useRouter();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };
  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {profile && (
        <>
          <h3>Welcome</h3>
          <button onClick={handleLogout}>Logout</button>
          <Link href="/admin">Admin</Link>
        </>
      )}
    </div>
  );
};

export default Profile;
