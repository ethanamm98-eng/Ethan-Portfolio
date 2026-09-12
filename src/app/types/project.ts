export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  stack: string[];
  image: string;
  mobileImage: string;
  /** Optional slides shown in the project card; falls back to image. */
  images?: string[];
  /** Tailwind classes applied behind the project image in cards and showcases. */
  backgroundClass?: string;
  href?: string;
  featured?: boolean;
  by?: string;
};
