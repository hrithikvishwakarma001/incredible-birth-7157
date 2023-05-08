import axios from "axios";
import { BASEURL } from "../../0568/utils";
const URL = `${BASEURL}/users`;


const auth = async (email, password) => {
  try {
    let res = await axios.post(`${URL}/login`, { email, password });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { auth };


const register=async(UserData)=>{
  try{
    let res = await axios.post(`${URL}/register`, UserData);
    console.log(res.data);
    return res.data;
    }
    catch(err){
      console.log(err);
      return err;
      }
}

export{register}