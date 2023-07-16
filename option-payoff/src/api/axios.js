import axios from 'axios';


const instance = axios.create({
	baseURL: 'https://apiv2.ghontu.in'
});
export default instance;

