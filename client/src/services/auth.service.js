import api from "./api";

export const registerUser = data => {
  return api.post("/user/register", data);
};
console.log(registerUser);

export const loginUser = data => {
  return api.post("/user/login", data);
};
