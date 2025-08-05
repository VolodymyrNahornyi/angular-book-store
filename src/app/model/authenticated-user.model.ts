export class AuthenticatedUser {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expiresIn: Date,
    private _refreshToken: string
  ) {
  }

  get token(){
    if (!this._expiresIn || this._expiresIn < new Date()){
      return null;
    }
    return this._token;
  }

  get refreshToken(){
    return this._refreshToken;
  }
}
