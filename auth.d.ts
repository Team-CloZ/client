import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    readonly name: string;
    readonly image: string;
  }

  interface Session {
    readonly user: User;
  }
}
