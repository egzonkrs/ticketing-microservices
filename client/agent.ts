import axios, { AxiosError, AxiosResponse } from 'axios';
import { CurrentUser, User, UserFormValues } from './models/user';

// axios.defaults.baseURL = `ticketing.com`;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<CurrentUser>('/api/users/currentuser'),
  signup: (user: UserFormValues) => requests.post<User>('/api/users/signup', user),
  signin: (user: UserFormValues) => requests.post<User>('/api/users/signin', user),
};

const agent = {
  Account,
};

export default agent;