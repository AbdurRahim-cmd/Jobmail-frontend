import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SendForm from "@/components/form/SendForm";

export const metadata = {
  title: "Send Mail — Jobmail",
};

export default function FormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SendForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
