export interface Birthday {
    id?: string;
    birthId: string;
    name: string;
    birthdate: Date;
    notes: string;
    categories: Array<string>;
  }

  export class MyDate {
    seconds: number;
    nanoseconds: number;
  }