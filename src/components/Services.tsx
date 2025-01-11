import { Printer, Image, FileText, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OrderForm } from "./OrderForm";
import { OrdersList } from "./OrdersList";
import { useState } from "react";
import { Button } from "./ui/button";

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
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => {
              setShowOrderForm(true);
              setShowOrders(false);
            }}
            className="bg-blue-900 hover:bg-blue-800"
          >
            Place New Order
          </Button>
          <Button
            onClick={() => {
              setShowOrders(true);
              setShowOrderForm(false);
            }}
            variant="outline"
          >
            View My Orders
          </Button>
        </div>

        {showOrderForm && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">Place Your Order</h3>
            <OrderForm />
          </div>
        )}

        {showOrders && (
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">My Orders</h3>
            <OrdersList />
          </div>
        )}
      </div>
    </section>
  );
};