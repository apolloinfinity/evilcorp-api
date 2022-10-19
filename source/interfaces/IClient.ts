export interface Client {
  _id: Id;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  gender: string;
  phone: string;
  address: Address;
  company: Company;
}

export interface Id {
  $oid: string;
}

export interface Address {
  street_address: string;
  city: string;
  state: string | null;
  country: string;
  zip_code: string;
}

export interface Company {
  name: string;
  department: string;
  title: string;
  frequency_of_service: string;
  app: App;
}

export interface App {
  id: string;
  name: string;
  version: string;
}
