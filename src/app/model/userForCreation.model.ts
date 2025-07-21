export interface UserForCreation {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthday: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    country: string;
    city: string;
    region: string;
    postal: string;
  };
}
