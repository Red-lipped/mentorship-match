export type ServerError = {
    log: string;
    message: {err: string};
    status: number;
  }

 export interface User {
    _id : number,
    nickName: String,
    userName: String,
    password: String,
    accountType: String,
    email: String,
    field: Array<string>,
  }