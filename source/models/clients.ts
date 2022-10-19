import { ObjectId } from "mongodb";
import { Address, Company } from "../interfaces/IClient";

export default class Clients {
  constructor(
    public avatar: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public username: string,
    public gender: string,
    public phone: string,
    public address: Address,
    public company: Company,
    public id?: ObjectId
  ) {}
}
