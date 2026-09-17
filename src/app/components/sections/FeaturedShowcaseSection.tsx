import BrowserShowcase from "../ui/BrowserShowcase";

export default function FeaturedShowcaseSection() {
  return (
    <section
      id="showcase"
      className="relative min-h-screen bg-(--background) text-(--foreground) transition-colors duration-300"
    >
      <div className="h-screen w-full px-4 py-4 sm:px-6 sm:py-6 ">
        <BrowserShowcase mode="expanded" />
      </div>
    </section>
  );
}
