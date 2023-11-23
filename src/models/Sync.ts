import axios, { AxiosPromise } from 'axios';
import { User } from './User';

interface HasId {
  id?: number;
}

export class Sync<T extends HasId> {
  constructor(public baseURL: string) {}
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.baseURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      // update
      return axios.put(`${this.baseURL}/${id}`, data);
    } else {
      // create
      return axios.post(this.baseURL, data);
    }
  }
}
