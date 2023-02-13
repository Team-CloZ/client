import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    image: string;
  }

  interface Session {
    user: User;
  }
}
