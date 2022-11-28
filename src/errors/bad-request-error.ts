import { ApplicationError } from "@/protocols";

export function badRequestError(message: string): ApplicationError {
  return {
    name: "BadRequestError",
    message: "The server cannot or will not process the request"
  };
}
