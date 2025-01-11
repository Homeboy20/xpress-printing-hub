import { Printer, Image, FileText, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Printer,
    title: "Business Printing",
    description: "Business cards, brochures, and marketing materials printed with precision",
  },
  {
    icon: Image,
    title: "Large Format",
    description: "Banners, posters, and signage that make a big impact",
  },
  {
    icon: FileText,
    title: "Custom Stationery",
    description: "Letterheads, envelopes, and custom designs for your brand",
  },
  {
    icon: Clock,
    title: "Rush Services",
    description: "Quick turnaround when you need it most",
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                    <service.icon className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};