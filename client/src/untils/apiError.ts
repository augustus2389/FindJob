export interface IDataError {
    error?: string;
    Error?: string;
  }
  export const handleServiceError = (error: any): IDataError => {
    let message = "";
    if (error.response && error.response.data)
      message = error.response.data.message;
    if (!message) message = "Something wrong";
    return { error: message };
  };
  export const instanceOfDataError = (object: any): object is IDataError => {
    return "error" in object || "Error" in object;
  };
  