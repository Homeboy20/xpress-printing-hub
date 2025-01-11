import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-r from-[hsla(221,45%,73%,1)] to-[hsla(220,78%,29%,1)] text-white">
      <div className="container mx-auto px-6 animate-fadeIn">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Professional Printing Solutions for Your Business
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Fast, reliable, and high-quality printing services tailored to your needs
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-900 hover:bg-blue-50"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};