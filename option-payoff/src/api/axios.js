import axios from 'axios';


const instance = axios.create({
	baseURL: 'https://api.ghontu.in'
});
export default instance;

