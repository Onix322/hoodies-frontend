export class ResponseWrapper{
  public status: number;
  public message: string;
  public result: any;

  constructor() {
    this.status = 0;
    this.message = "";
    this.result = "";
  }


}
