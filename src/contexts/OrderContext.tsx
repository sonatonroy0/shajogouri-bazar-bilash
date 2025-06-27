
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type Order = Database['public']['Tables']['orders']['Row'] & {
  items: Database['public']['Tables']['order_items']['Row'][];
};

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_date'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  getOrder: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
      
      // Set up real-time subscription
      const channel = supabase
        .channel('orders-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders'
          },
          () => {
            fetchOrders();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const transformedOrders = (ordersData || []).map(order => ({
        ...order,
        items: order.order_items || []
      }));

      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_date'>): Promise<string> => {
    try {
      const orderId = `SHJ-${Date.now()}`;
      
      // Insert order
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          id: orderId,
          user_id: user?.id || null
        }]);

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = orderData.items.map(item => ({
        order_id: orderId,
        product_id: item.product_id,
        product_name: item.product_name,
        product_name_bn: item.product_name_bn,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return orderId;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.user_id === userId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      getOrder,
      getUserOrders,
      loading
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
