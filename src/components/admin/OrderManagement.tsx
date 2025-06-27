
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, Download, Printer, Search, Filter } from 'lucide-react';
import { useOrders } from '@/contexts/OrderContext';
import { toast } from '@/hooks/use-toast';

interface OrderManagementProps {
  language: 'en' | 'bn';
}

const OrderManagement: React.FC<OrderManagementProps> = ({ language }) => {
  const { orders, updateOrderStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const content = {
    en: {
      title: 'Order Management',
      searchPlaceholder: 'Search orders...',
      filterStatus: 'Filter by Status',
      orderNumber: 'Order #',
      customer: 'Customer',
      items: 'Items',
      total: 'Total',
      status: 'Status',
      date: 'Date',
      actions: 'Actions',
      viewDetails: 'View Details',
      printInvoice: 'Print Invoice',
      updateStatus: 'Update Status',
      exportExcel: 'Export to Excel',
      noOrders: 'No orders found',
      orderDetails: 'Order Details',
      shippingAddress: 'Shipping Address',
      paymentMethod: 'Payment Method',
      courierService: 'Courier Service',
      orderItems: 'Order Items',
      orderNotes: 'Order Notes',
      all: 'All',
      pending: 'Pending',
      confirmed: 'Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    },
    bn: {
      title: 'অর্ডার ব্যবস্থাপনা',
      searchPlaceholder: 'অর্ডার খুঁজুন...',
      filterStatus: 'স্ট্যাটাস অনুযায়ী ফিল্টার',
      orderNumber: 'অর্ডার #',
      customer: 'কাস্টমার',
      items: 'পণ্য',
      total: 'মোট',
      status: 'অবস্থা',
      date: 'তারিখ',
      actions: 'অ্যাকশন',
      viewDetails: 'বিস্তারিত দেখুন',
      printInvoice: 'ইনভয়েস প্রিন্ট',
      updateStatus: 'স্ট্যাটাস আপডেট',
      exportExcel: 'এক্সেল এক্সপোর্ট',
      noOrders: 'কোনো অর্ডার পাওয়া যায়নি',
      orderDetails: 'অর্ডার বিস্তারিত',
      shippingAddress: 'ডেলিভারি ঠিকানা',
      paymentMethod: 'পেমেন্ট পদ্ধতি',
      courierService: 'কুরিয়ার সার্ভিস',
      orderItems: 'অর্ডারের পণ্য',
      orderNotes: 'অর্ডার নোট',
      all: 'সব',
      pending: 'অপেক্ষমান',
      confirmed: 'নিশ্চিত',
      processing: 'প্রক্রিয়াকরণ',
      shipped: 'পাঠানো হয়েছে',
      delivered: 'ডেলিভার',
      cancelled: 'বাতিল'
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer_phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'processing': return 'outline';
      case 'confirmed': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    toast({
      title: 'Success!',
      description: 'Order status updated successfully'
    });
  };

  const handlePrintInvoice = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice - ${order.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .invoice-details { margin-bottom: 20px; }
              .customer-details { margin-bottom: 20px; }
              .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .items-table th { background-color: #f2f2f2; }
              .total-section { text-align: right; margin-top: 20px; }
              .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>SHAJOGOURI</h1>
              <p>Fashion & Jewelry Store</p>
              <h2>INVOICE</h2>
            </div>
            
            <div class="invoice-details">
              <p><strong>Invoice No:</strong> ${order.id}</p>
              <p><strong>Date:</strong> ${new Date(order.order_date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
            </div>
            
            <div class="customer-details">
              <h3>Customer Details:</h3>
              <p><strong>Name:</strong> ${order.customer_name}</p>
              <p><strong>Phone:</strong> ${order.customer_phone}</p>
              <p><strong>Email:</strong> ${order.customer_email}</p>
              <p><strong>Address:</strong> ${order.customer_address}, ${order.city}, ${order.area}</p>
              <p><strong>Courier:</strong> ${order.courier_service}</p>
              <p><strong>Payment Method:</strong> ${order.payment_method}</p>
            </div>
            
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item: any) => `
                  <tr>
                    <td>${item.product_name}</td>
                    <td>${item.quantity}</td>
                    <td>৳${item.price.toLocaleString()}</td>
                    <td>৳${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <p><strong>Subtotal: ৳${order.subtotal.toLocaleString()}</strong></p>
              <p><strong>Delivery: ৳${(order.total - order.subtotal).toLocaleString()}</strong></p>
              <p><strong>Total: ৳${order.total.toLocaleString()}</strong></p>
            </div>
            
            ${order.notes ? `<div><h3>Notes:</h3><p>${order.notes}</p></div>` : ''}
            
            <div class="footer">
              <p>Thank you for shopping with Shajogouri!</p>
              <p>For any queries, contact us at: info@shajogouri.com</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleExportExcel = () => {
    const csvContent = [
      ['Order ID', 'Customer Name', 'Phone', 'Email', 'Address', 'Total', 'Status', 'Date', 'Courier', 'Payment Method'],
      ...filteredOrders.map(order => [
        order.id,
        order.customer_name,
        order.customer_phone,
        order.customer_email,
        `${order.customer_address}, ${order.city}, ${order.area}`,
        order.total,
        order.status,
        new Date(order.order_date).toLocaleDateString(),
        order.courier_service,
        order.payment_method
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shajogouri-orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Success!',
      description: 'Orders exported successfully'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{content[language].title}</h2>
        <Button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          {content[language].exportExcel}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={content[language].searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={content[language].filterStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{content[language].all}</SelectItem>
                  <SelectItem value="pending">{content[language].pending}</SelectItem>
                  <SelectItem value="confirmed">{content[language].confirmed}</SelectItem>
                  <SelectItem value="processing">{content[language].processing}</SelectItem>
                  <SelectItem value="shipped">{content[language].shipped}</SelectItem>
                  <SelectItem value="delivered">{content[language].delivered}</SelectItem>
                  <SelectItem value="cancelled">{content[language].cancelled}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">#{order.id}</h3>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {content[language][order.status as keyof typeof content[typeof language]]}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{content[language].customer}:</span>
                        <br />
                        {order.customer_name}
                        <br />
                        {order.customer_phone}
                      </div>
                      <div>
                        <span className="font-medium">{content[language].items}:</span>
                        <br />
                        {order.items.length} {language === 'en' ? 'item(s)' : 'টি পণ্য'}
                      </div>
                      <div>
                        <span className="font-medium">{content[language].total}:</span>
                        <br />
                        <span className="text-lg font-bold text-gray-900">
                          ৳{order.total.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">{content[language].date}:</span>
                        <br />
                        {new Date(order.order_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusUpdate(order.id, value)}
                    >
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{content[language].pending}</SelectItem>
                        <SelectItem value="confirmed">{content[language].confirmed}</SelectItem>
                        <SelectItem value="processing">{content[language].processing}</SelectItem>
                        <SelectItem value="shipped">{content[language].shipped}</SelectItem>
                        <SelectItem value="delivered">{content[language].delivered}</SelectItem>
                        <SelectItem value="cancelled">{content[language].cancelled}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrintInvoice(order)}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      {content[language].printInvoice}
                    </Button>
                  </div>
                </div>

                {/* Order Details */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>{content[language].shippingAddress}:</strong></p>
                      <p>{order.customer_address}, {order.city}, {order.area}</p>
                      <p><strong>{content[language].courierService}:</strong> {order.courier_service}</p>
                      <p><strong>{content[language].paymentMethod}:</strong> {order.payment_method}</p>
                    </div>
                    <div>
                      <p><strong>{content[language].orderItems}:</strong></p>
                      {order.items.map((item) => (
                        <p key={item.id}>
                          {item.quantity}x {language === 'en' ? item.product_name : item.product_name_bn} - ৳{(item.price * item.quantity).toLocaleString()}
                        </p>
                      ))}
                      {order.notes && (
                        <div className="mt-2">
                          <p><strong>{content[language].orderNotes}:</strong></p>
                          <p>{order.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <p className="text-gray-500 text-lg">{content[language].noOrders}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderManagement;
