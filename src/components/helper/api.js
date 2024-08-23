import axios from "axios";
import { baseurl, header } from "./baseurl";

const api = axios.create({
    baseURL:baseurl,
    headers:header.headers,
})
// console.log("api",api)

export const get =  async(url) =>{
    // console.log("url",url)
   try {
    const response = await api.get(url);
    // console.log("api response",response)
    return response.data
   } catch (error) {
    console.log("API GET error",error)
    throw error;
   }
}

export const post = async (url,data) =>{
    // console.log("data",data)
   try {
     const response = await api.post(url,data)
     return response.data
   } catch (error) {
    console.log("POST API error",error);
    throw error
   }
}
export const put = async (url,data) =>{
    // console.log("data",data)
    try {
      const response = await api.put(url,data)
    //   console.log("put response",response)
      return response.data
    } catch (error) {
     console.log("PUT API error",error);
     throw error
    }
 }

 export const del = async (url) => {
    try {
      const response = await api.delete(url);
    //   console.log("delres",response)
      return response.data;
    } catch (error) {
      console.error("API DELETE request error:", error);
      throw error;
    }
  };