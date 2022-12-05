import axios from "../axios";

export const auth = async () => {
  const res = await axios.get("/api/protected");
  return res.data;
};

export const signup = async (data) => {
  const res = await axios.post("https://web-project-wzlk.onrender.com/chat-app/registration/", data);
  return res.data;
};

export const login = async (data) => {
  


  const res = await axios.post("https://web-project-wzlk.onrender.com/chat-app/login/", data);
  localStorage.setItem('user',JSON.stringify(res.data.user))
  
  return res.data;
};

export const getAllUsers = async (id) => {
  
  const token = localStorage.getItem('token')

  const config = {
      headers: { Authorization: `Bearer ${token}`,
      
    }
  };

  // const bodyParameters = {
  //   key: "value"
  // };
  const res = await axios.get(`  https://web-project-wzlk.onrender.com/chat-app/users/`, config);
  
  

  return res.data;
};

export const setAvatar = async ({ id, imgUrl }) => {
  const res = await axios.put(`/api/setavatar/${id}`, { imgUrl });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`/api/delete/${id}`);
  return res.data;
};

export const sendMessage = async (data) => {

  // const token = localStorage.getItem('token')

  // const config = {
  //   headers: { Authorization: `Bearer ${token}` }
  // };
  const username = localStorage.getItem('user').username
  const res = await axios.post(`  https://web-project-wzlk.onrender.com/chat-app/ws/message/${username}`, data);
  return res.data;
};

export const getMessage = async (data) => {
  // const res = await axios.get("  https://web-project-wzlk.onrender.com/chat-app/users/", data);
  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: `Bearer ${token}` ,
    
  }
  };

  // const bodyParameters = {
  //   key: "value"
  // };
  const res = await axios.get(`https://web-project-wzlk.onrender.com/chat-app/users/`, config);

  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`/api/user/${id}`);
  return res.data;
};
