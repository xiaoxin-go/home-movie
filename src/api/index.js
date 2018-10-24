import axios from 'axios';
//axios.defaults.baseURL = 'http://127.0.0.1:5500';

// 拦截器，返回对象的data
axios.interceptors.response.use((res)=>{
  return res.data;
});

/*-------------------------      获取电影     ------------------------*/
export let getMovie = (data) =>{
  return axios.get('/home/movie', {params:data})
};

export let getMovieDetail =(data)=>{
  return axios.get('/home/movie/detail', {params:data})
};

export let getPerformer =(data)=>{
  return axios.get('/home/performer', {params:data})
};

export let getPerformerDetail=(data)=>{
  return axios.get('/home/performer/detail', {params:data})
};
export let delPerformer =(data)=>{
  return axios.delete('/admin/performer', {params:data})
};

export let getGenre=(data)=>{
  return axios.get('/home/genre', {params:data})
};
/*--------------------------------------------------------*/
