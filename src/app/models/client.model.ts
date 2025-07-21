import { Interest } from './interest.model';

export interface Client {
  id: string;
  name: string;
  surname: string;
  phone: number;
  interests: Interest[];
}
