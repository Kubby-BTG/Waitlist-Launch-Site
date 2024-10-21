import Footer from "@/components/global/footer";
import Header from "@/components/global/header";

export default function Custom404() {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col items-center justify-center">
        <p className="text-2xl">Page not found</p>
      </div>
      <Footer />
    </>
  );
}
