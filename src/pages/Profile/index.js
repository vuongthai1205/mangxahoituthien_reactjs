import React from 'react';
import { MyUserContext } from '../../App';
import { useContext } from 'react';

function Profile() {
  const [user, dispatch] = useContext(MyUserContext);
  return (
    <div>
      <h2>Profile page</h2>
      <div>
      {user ? (<>
        <img height={200} src={user.avatar} alt="User Avatar" />
        <p>{user.username}</p>
        <p>{user.firstName} {user.lastName}</p>
      </> ) : (
        <>
          <p>Hãy đăng nhập</p>
        </>
      )
      
    }
        
      </div>
    </div>
  );
}

export default Profile;
