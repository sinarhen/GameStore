import axios from 'axios';
import Cookies from 'js-cookie';
import { getHeadersWithCookiesByHeaderName } from './utils';
import { headerName } from './constants';



const fetchUser = async () => {
  const cookie = Cookies.get(headerName);
  if (!cookie) {
    console.error('No cookie found. User is not logged in.');
    return null;
  }
  try {
    const response = await axios.get('/auth/me', {
      headers: getHeadersWithCookiesByHeaderName(),
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
      headers: getHeadersWithCookiesByHeaderName(),
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