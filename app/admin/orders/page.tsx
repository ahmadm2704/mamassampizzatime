'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useAdminOrders } from '@/hooks/use-admin';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Eye, MapPin, Phone, User, Clock, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';

export default function OrdersPage() {
  const { orders, loading, updateOrderStatus } = useAdminOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const columns = [
    { header: 'Order ID', key: 'id' as const, render: (value: any) => value.slice(0, 8) },
    { header: 'Customer', key: 'customerName' as const },
    {
      header: 'Phone',
      key: 'customerPhone' as const,
    },
    {
      header: 'Type',
      key: 'orderType' as const,
      render: (value: any) => (
        <span className="capitalize px-3 py-1 bg-muted rounded-full text-xs font-medium">
          {value || 'Delivery'}
        </span>
      ),
    },
    {
      header: 'Items',
      key: 'itemsList' as const,
      render: (value: any) => <span className="text-xs text-muted-foreground truncate max-w-[150px] inline-block" title={value}>{value || '-'}</span>,
    },
    {
      header: 'Total',
      key: 'totalAmount' as const,
      render: (value: any) => `$${Number(value || 0).toFixed(2)}`,
    },
    {
      header: 'Status',
      key: 'status' as const,
      render: (status: any, row: any) => (
        <select
          aria-label="Order Status"
          value={status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize outline-none cursor-pointer ${
            status === 'completed' || status === 'delivered'
              ? 'bg-green-100 text-green-700'
              : status === 'preparing' || status === 'ready'
              ? 'bg-blue-100 text-blue-700'
              : status === 'confirmed'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      header: 'Est. Time',
      key: 'estimatedTime' as const,
      render: (value: any) => `${value || 30} min`,
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track all customer orders.</p>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          keyField="id"
          onEdit={openOrderDetails}
        />
      )}

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl flex flex-col max-h-[90vh] p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
            <DialogTitle>Order Details <span className="text-muted-foreground text-sm ml-2">#{selectedOrder?.order_number || selectedOrder?.id?.slice(0, 8)}</span></DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {/* Customer Info */}
              <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{selectedOrder.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedOrder.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{selectedOrder.orderType} Order</span>
                </div>
                {selectedOrder.orderType === 'delivery' && (
                  <div className="flex items-start gap-2 col-span-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{selectedOrder.delivery_address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 col-span-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Placed at: {new Date(selectedOrder.created_at).toLocaleString()}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">Items ({selectedOrder.order_items?.length || 0})</h3>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">Item</th>
                        <th className="px-4 py-2 text-right font-semibold">Qty</th>
                        <th className="px-4 py-2 text-right font-semibold">Price</th>
                        <th className="px-4 py-2 text-right font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {selectedOrder.order_items?.map((item: any) => (
                        <tr key={item.id} className="align-top">
                          <td className="px-4 py-3">
                            <div className="font-semibold">{item.menu_items?.name || 'Unknown Item'}</div>
                            {item.special_instructions && (
                              <div className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap blur-0">
                                {item.special_instructions}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">${Number(item.unit_price).toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">${(Number(item.unit_price) * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Notes */}
              {selectedOrder.special_instructions && (
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground">Order Notes</h3>
                  <div className="bg-amber-500/10 text-amber-700 dark:text-amber-500 p-3 rounded-lg border border-amber-500/20 text-sm whitespace-pre-wrap">
                    {selectedOrder.special_instructions}
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="flex justify-end pt-4 border-t border-border">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${Number(selectedOrder.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${Number(selectedOrder.tax).toFixed(2)}</span>
                  </div>
                  {selectedOrder.orderType === 'delivery' && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>${Number(selectedOrder.delivery_fee).toFixed(2)}</span>
                    </div>
                  )}
                  {Number(selectedOrder.discount) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${Number(selectedOrder.discount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${Number(selectedOrder.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="px-6 py-4 border-t border-border shrink-0">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
