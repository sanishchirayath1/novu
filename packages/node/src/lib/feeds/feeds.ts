import axios from 'axios';
import { WithHttp } from '../novu.interface';
import { IFeeds } from './feeds.interface';

export class Feeds extends WithHttp implements IFeeds {
  async create(name: string) {
    return await this.http.post(`/feeds`, { name });
  }

  async get() {
    return await this.http.get(`/feeds`);
  }

  async delete(feedId: string) {
    return await this.http.delete(`/feeds/${feedId}`);
  }
}
