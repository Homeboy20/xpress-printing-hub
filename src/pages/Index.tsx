import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <WhyChooseUs />
        <ContactForm />
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Index;