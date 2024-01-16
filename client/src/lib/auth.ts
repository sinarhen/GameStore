import axios from 'axios';
import Cookies from 'js-cookie';

const headerName = 'authorization';

const fetchUser = async () => {
  const cookie = Cookies.get(headerName);
  if (!cookie) {
    console.log('No cookie found')
    return null;
  };
    try {
      const headers = {
      
        [headerName]: `Bearer ${cookie}`,}
      const response = await axios.get('/auth/me', {
        headers
      
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

const setCookie = (token: string) => {
  Cookies.set(headerName, token, { expires: 30 });
}

const removeCookie = () => {
  Cookies.remove(headerName);
}

export {
  fetchUser,
  setCookie,
  removeCookie,
} ;