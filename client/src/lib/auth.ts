import Cookies from 'js-cookie';
import http from './fetcher';
import {headerName} from './constants';
import toast from 'react-hot-toast';

const fetchUser = async () => {
  const cookie = Cookies.get(headerName);
  if (!cookie) {
    console.log('No cookie found. User is not logged in.');
    return null;
  }
  try {
    const response = await http.get('/auth/me', true);
    return response.data;
  } catch (error) {
    toast.error('Внутрішня помилка з автентифікацією. Будь ласка, спробуйте ще раз', {duration: 5000, id: 'fetchUser'});
    console.error(error);
  }
};

const setCookie = (token: string) => {
  Cookies.set(headerName, token, {expires: 30});
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
    const response = await http.put('/auth/update', {
      name,
      email,
      avatarUrl,
    }, true);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchUser,
  setCookie,
  removeCookie,
  updateUser,
};