import axios from 'axios';


const instance = axios.create({
	baseURL: 'http://api.ghontu.in'
});
export default instance;

