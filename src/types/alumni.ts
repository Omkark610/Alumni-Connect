interface Alumni {
  _id: string;
  name: string;
  email: string;
  passoutYear: number;
  socials?: {
    linkedin?: string;
    instagram?: string;
    linktree?: string;
  };
}
