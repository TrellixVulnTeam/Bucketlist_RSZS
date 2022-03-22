export interface Post {
  email: string;
  bucketItems: [
    {
      id: number;
      items: any;
    }
  ];
}
