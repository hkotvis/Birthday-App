export interface Birthday {
    id?: string;
    name: string;
    birthdate: Date;
    notes: string;
    categories: [
      name: string,
      selected: boolean
    ];
  }