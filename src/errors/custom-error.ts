export class CustomError extends Error {
  protected statusCode = 500;
  protected code = -1;
  protected msg = '';

  constructor(msg = 'Unknown', code = -1) {
    super(msg);

    this.code = code;
    this.msg = msg;
  }

  public getCode() {
    return this.code;
  }

  public getMsg() {
    return this.msg;
  }

  public getStatus(): number {
    return this.statusCode;
  }

  public toResponse() {
    return {
      code: this.code,
      msg: this.msg,
    };
  }
}
