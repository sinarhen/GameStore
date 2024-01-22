import { useState, useEffect } from 'react';
import { fetchUser } from '../lib/auth';
import { User } from '../lib/types';

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser().then((fetchedUser: User) => {
      setUser(fetchedUser);
    });
  }, []);

  return { user, setUser };
}