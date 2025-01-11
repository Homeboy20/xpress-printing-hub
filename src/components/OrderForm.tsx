import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const printingServices = [
  { id: "business-cards", name: "Business Cards", basePrice: 25 },
  { id: "brochures", name: "Brochures", basePrice: 50 },
  { id: "banners", name: "Banners", basePrice: 100 },
  { id: "flyers", name: "Flyers", basePrice: 30 },
];

export const OrderForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    quantity: "",
    specifications: "",
    deliveryAddress: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert([
          {
            service_type: formData.service,
            quantity: parseInt(formData.quantity),
            specifications: formData.specifications,
            delivery_address: formData.deliveryAddress,
            status: 'pending',
          },
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Order Placed Successfully!",
        description: "We'll process your order and get back to you soon.",
      });

      setFormData({
        service: "",
        quantity: "",
        specifications: "",
        deliveryAddress: "",
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="space-y-2">
        <label className="text-sm font-medium">Service Type</label>
        <Select
          value={formData.service}
          onValueChange={(value) => setFormData({ ...formData, service: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {printingServices.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name} - Starting from ${service.basePrice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Quantity</label>
        <Input
          type="number"
          placeholder="Enter quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
          min="1"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Specifications</label>
        <Textarea
          placeholder="Enter your printing specifications, size, color, etc."
          value={formData.specifications}
          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
          required
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Delivery Address</label>
        <Textarea
          placeholder="Enter your delivery address"
          value={formData.deliveryAddress}
          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-900 hover:bg-blue-800"
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </form>
  );
};