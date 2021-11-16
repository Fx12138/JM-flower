import axios from "axios";

//采用promise的方式
export function request(config) {
  //1.创建axios实例
  const axios1 = axios.create({
    baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
    timeout: 5000
  })
  //2.axios拦截器
  //2.1请求拦截
  // axios1.interceptors.request.use(config=>{
  //   //请求成功时,config传来的是本次请求的一些配置,包括请求方法,url和header等
  //   return config;
  //
  // },err => {
  //   //请求失败时
  //   console.log(err);
  // })
  //2.2响应拦截
  // axios1.interceptors.response.use(res => {
  //   //成功响应返回的是响应的结果
  //   return res;
  // },err => {
  //   console.log(err);
  // })

  //3.发送网络请求
  return axios1(config)

}

//请求本地接口
//采用promise的方式
export function localReq(config) {

  //1.创建axios实例
  const axios1 = axios.create({
    baseURL: '/api',
    timeout: 5000
  })

  axios1.defaults.headers.post["Content-Type"] = "application/json";
  axios1.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  //2.axios拦截器
  //2.1请求拦截
  // axios1.interceptors.request.use(config=>{
  //   //请求成功时,config传来的是本次请求的一些配置,包括请求方法,url和header等
  //   return config;
  //
  // },err => {
  //   //请求失败时
  //   console.log(err);
  // })
  //2.2响应拦截
  // axios1.interceptors.response.use(res => {
  //   //成功响应返回的是响应的结果
  //   return res;
  // },err => {
  //   console.log(err);
  // })

  //3.发送网络请求
  return axios1(config)

}
