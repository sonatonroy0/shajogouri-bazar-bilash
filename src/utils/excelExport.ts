
// Mock function to simulate Excel export
// In a real application, you would use libraries like 'xlsx' or 'exceljs'
export const exportOrdersToExcel = (orders: any[]) => {
  // Create CSV data as a fallback for Excel functionality
  const headers = ['Order ID', 'Customer Name', 'Phone', 'Email', 'Address', 'Products', 'Total Amount', 'Status', 'Date'];
  
  const csvData = [
    headers,
    ...orders.map(order => [
      order.id,
      order.customerName || 'N/A',
      order.customerPhone || 'N/A',
      order.customerEmail || 'N/A',
      order.shippingAddress || 'N/A',
      order.items?.map((item: any) => `${item.name} (${item.quantity})`).join(', ') || 'N/A',
      `৳${order.total || 0}`,
      order.status || 'Pending',
      order.date || new Date().toLocaleDateString()
    ])
  ];

  const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `shajogouri-orders-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateInvoice = (order: any) => {
  // Create a printable invoice HTML
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice - ${order.id}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .company-name { font-size: 24px; font-weight: bold; color: #ec4899; }
        .invoice-details { margin: 20px 0; }
        .customer-details { margin: 20px 0; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .items-table th { background-color: #f8f9fa; }
        .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">Shajogouri</div>
        <p>Premium Jewelry & Accessories</p>
        <p>Phone: +88 01712345678 | Email: contact@shajogouri.com</p>
      </div>
      
      <div class="invoice-details">
        <h3>Invoice #${order.id}</h3>
        <p><strong>Date:</strong> ${order.date || new Date().toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${order.status || 'Pending'}</p>
      </div>
      
      <div class="customer-details">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${order.customerName || 'N/A'}</p>
        <p><strong>Phone:</strong> ${order.customerPhone || 'N/A'}</p>
        <p><strong>Email:</strong> ${order.customerEmail || 'N/A'}</p>
        <p><strong>Address:</strong> ${order.shippingAddress || 'N/A'}</p>
      </div>
      
      <table class="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items?.map((item: any) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>৳${item.price.toLocaleString()}</td>
              <td>৳${(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          `).join('') || '<tr><td colspan="4">No items</td></tr>'}
        </tbody>
      </table>
      
      <div class="total">
        <p>Total Amount: ৳${(order.total || 0).toLocaleString()}</p>
      </div>
      
      <div style="margin-top: 40px; text-align: center; color: #666;">
        <p>Thank you for shopping with Shajogouri!</p>
      </div>
    </body>
    </html>
  `;
  
  // Open print dialog
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }
};
