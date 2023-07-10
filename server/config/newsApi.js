const api_key = '92bce174e057493fbc6768684fbd7527';
import axios from 'axios';

export const newsApi = axios.create({
	baseURL: 'https://newsapi.org',

});
var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=92bce174e057493fbc6768684fbd7527';
//const url =https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=92bce174e057493fbc6768684fbd7527;

export const requests={
    getTopHeadLinesByCategory:(country,category)=>`/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_key}`

}

