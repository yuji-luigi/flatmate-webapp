import { Role } from '../../types/models/space-model';

export interface IInitialValues {
  email: string;
  password: string;
  password2: string;
  name: string;
  surname: string;
  role?: Role | '';
  space: {
    maxUsers: number;
    name: string;
    address: string;
    password: string;
  };
}

export const initialValues: IInitialValues = {
  email: '',
  password: '',
  password2: '',
  name: '',
  surname: '',
  space: {
    maxUsers: 0,
    name: '',
    address: '',
    password: '',
  },
};
