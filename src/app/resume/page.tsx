import type { Metadata } from "next";
import ResumeView from "./ResumeView";

export const metadata: Metadata = {
  title: "Resume | Ethan A. Mercado",
  description: "Professional resume of Ethan A. Mercado, front-end developer and UI engineer.",
};

export default function ResumePage() {
  return <ResumeView />;
}
