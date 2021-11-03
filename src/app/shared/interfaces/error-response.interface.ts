export interface ErrorResponseI {
  error: {
    details: string;
    instance: string;
    status: string;
    title: string;
  };
  status: number;
  statusText: string;
}
