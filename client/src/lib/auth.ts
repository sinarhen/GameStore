import axios from 'axios';
import Cookies from 'js-cookie';

const headerName = 'authorization';

const getHeaders = () => {
  const cookie = Cookies.get(headerName);
  return {
    [headerName]: `Bearer ${cookie}`,
  };
};

const fetchUser = async () => {
  const cookie = Cookies.get(headerName);
  if (!cookie) {
    console.log('No cookie found');
    return null;
  }
  try {
    const response = await axios.get('/auth/me', {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const setCookie = (token: string) => {
  Cookies.set(headerName, token, { expires: 30 });
};

const removeCookie = () => {
  Cookies.remove(headerName);
};

const updateUser = async ({
  name,
  email,
  avatarUrl,
}: {
  name?: string;
  email?: string;
  avatarUrl?: string;
}) => {
  try {
    const response = await axios.put('/auth/update', {
      name,
      email,
      avatarUrl,
    }, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchUser,
  setCookie,
  removeCookie,
  updateUser,
};