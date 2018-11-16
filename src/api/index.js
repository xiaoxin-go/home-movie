import axios from 'axios';
//axios.defaults.baseURL = 'http://127.0.0.1:5500';

// 拦截器，返回对象的data
axios.interceptors.response.use((res)=>{
  return res.data;
});

// 获取用户是否登录
export let getUser =(data) =>{
  return axios.get('/home/user',{params:data})
};

// 检查用户合法性
export let checkUser =(data) =>{
  return axios.get('/home/check_user',{params:data})
};

// 用户注册
export let register =(data) =>{
  return axios.post('/home/register/', data)
};

// 用户登录
export let login =(data) =>{
  return axios.post('/home/login', data)
};

// 退出登录
export let logout=()=>{
  return axios.post('/home/logout')
};

/*-------------------------      电影管理     ------------------------*/
export let getMovie = (data) =>{
  return axios.get('/home/movie', {params:data})
};

export let getMovieDetail =(data)=>{
  return axios.get('/home/movie/detail', {params:data})
};

export let delMovie =(data) =>{
  return axios.delete('/admin/movie', {params:data})
};


/*------------------------      角色管理    ----------------------*/
export let getPerformer =(data)=>{
  return axios.get('/home/performer', {params:data})
};

export let getPerformerDetail=(data)=>{
  return axios.get('/home/performer/detail', {params:data})
};
export let delPerformer =(data)=>{
  return axios.delete('/admin/performer', {params:data})
};

export let putPerformerLogo =(data) =>{
  return axios.put('/admin/performerlogo', data)
};

export let restore = (data) =>{
  return axios.post('/home/restore',data)
};
export let getPerformerS =(data) =>{
  return axios.get('/home/performers', {params:data})
};

/*------------------------      获取系列    ----------------------*/
export let getGenre=(data)=>{
  return axios.get('/home/genre', {params:data})
};

/*------------------------      改变状态    ----------------------*/
export let changeState=(data)=>{
  return axios.post('/home/change_state',data)
};

/*------------------------      收藏管理    ----------------------*/
export let getMoviecol=(data)=>{
  return axios.get('/home/moviecol', {params:data})
};

export let addMoviecol=(data)=>{
  return axios.post('/home/moviecol',data)
};

export let delMoviecol=(data)=>{
  return axios.delete('/home/moviecol',{params:data})
};

/*------------------------      关注管理    ----------------------*/
export let getFollow=(data)=>{
  return axios.get('/home/follow', {params:data})
};

export let addFollow=(data)=>{
  return axios.post('/home/follow',data)
};

export let delFollow=(data)=>{
  return axios.delete('/home/follow',{params:data})
};


/*--------------------------------------------------------*/
