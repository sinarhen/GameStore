import axios from 'axios';
import Cookies from 'js-cookie';

const fetchUser = async () => {
    try {
      const headers = {
        token: Cookies.get('token'),
      }
      console.log(headers)
      const response = await axios.get('/auth/me', {
        headers
      
      });
      return response
    } catch (error) {
      console.error(error);
    }
  }

export default fetchUser;