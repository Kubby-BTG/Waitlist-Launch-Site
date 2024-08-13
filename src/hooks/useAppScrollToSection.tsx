export default function useAppScrollToSection() {
  const isBrowser = () => typeof window !== "undefined";

  function scrollToSection(id: string) {
    if (!id) return;
    const element = document.getElementById(id);
    // console.log(element);
    if (!element || !isBrowser) return;
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }
  return { scrollToSection };
}
