import { useState, useEffect } from 'react';
import { fetchUser } from '../lib/auth';

export function useCurrentUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser().then((fetchedUser: any) => {
      setUser(fetchedUser);
      console.log(fetchedUser);
    });
  }, []);

  return { user, setUser };
}