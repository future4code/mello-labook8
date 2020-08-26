import * as jwt from "jsonwebtoken";

export class Authenticator {
  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
      },

      process.env.JWT_KEY as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
    };
    return result;
  }

  public verify(token: string): AuthenticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return {
      id: data.id,
    };
  }
}

interface AuthenticationData {
  id: string;
}
