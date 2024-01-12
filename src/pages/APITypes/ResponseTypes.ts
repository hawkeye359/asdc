type APIResponseType<T> =
  | {
      success: true;
      code: number;
      data: T;
    }
  | {
      success: false;
      code: number;
      data: string;
    };
