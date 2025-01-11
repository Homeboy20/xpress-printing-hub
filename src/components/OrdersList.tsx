import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: number;
  service_type: string;
  quantity: number;
  specifications: string;
  delivery_address: string;
  status: string;
  created_at: string;
}

export const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No orders found</div>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg capitalize">
                    {order.service_type.replace('-', ' ')}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {order.quantity}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Specifications:</span><br />
                  {order.specifications}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Delivery Address:</span><br />
                  {order.delivery_address}
                </p>
                <p className="text-sm text-gray-500">
                  Ordered on: {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};