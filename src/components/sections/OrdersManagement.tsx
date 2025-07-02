
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, MapPin, Phone, CheckCircle, AlertCircle, Package } from "lucide-react";

export const OrdersManagement = () => {
  const [orders] = useState([
    {
      id: "#1238",
      customer: "Carlos Silva",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - Vila Madalena",
      items: [
        { name: "Hambúrguer Artesanal", quantity: 2, price: 24.90 },
        { name: "Batata Frita", quantity: 1, price: 12.90 }
      ],
      total: 62.70,
      status: "pending",
      paymentMethod: "pix",
      orderTime: "14:32",
      estimatedTime: "30-40 min"
    },
    {
      id: "#1237",
      customer: "Ana Oliveira",
      phone: "(11) 88888-8888",
      address: "Av. Paulista, 456 - Bela Vista",
      items: [
        { name: "Pizza Margherita", quantity: 1, price: 32.50 }
      ],
      total: 32.50,
      status: "preparing",
      paymentMethod: "card",
      orderTime: "14:15",
      estimatedTime: "25-35 min"
    },
    {
      id: "#1236",
      customer: "Pedro Costa",
      phone: "(11) 77777-7777",
      address: "Rua Augusta, 789 - Consolação",
      items: [
        { name: "Açaí Tradicional", quantity: 3, price: 12.90 },
        { name: "Suco Natural", quantity: 2, price: 8.50 }
      ],
      total: 55.70,
      status: "ready",
      paymentMethod: "pix",
      orderTime: "13:58",
      estimatedTime: "15-25 min"
    },
    {
      id: "#1235",
      customer: "Maria Santos",
      phone: "(11) 66666-6666",
      address: "Rua dos Jardins, 321 - Jardins",
      items: [
        { name: "Prato Executivo", quantity: 1, price: 18.90 }
      ],
      total: 18.90,
      status: "delivered",
      paymentMethod: "card",
      orderTime: "13:30",
      estimatedTime: "Entregue"
    }
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          label: "Pendente", 
          color: "bg-yellow-100 text-yellow-800", 
          icon: AlertCircle 
        };
      case "preparing":
        return { 
          label: "Preparando", 
          color: "bg-blue-100 text-blue-800", 
          icon: Package 
        };
      case "ready":
        return { 
          label: "Pronto", 
          color: "bg-green-100 text-green-800", 
          icon: CheckCircle 
        };
      case "delivered":
        return { 
          label: "Entregue", 
          color: "bg-gray-100 text-gray-800", 
          icon: CheckCircle 
        };
      default:
        return { 
          label: "Desconhecido", 
          color: "bg-gray-100 text-gray-800", 
          icon: AlertCircle 
        };
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // Aqui implementaríamos a lógica para atualizar o status do pedido
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: any }) => {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    return (
      <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{order.id}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Clock size={14} />
                {order.orderTime} • {order.estimatedTime}
              </div>
            </div>
            <Badge className={statusInfo.color}>
              <StatusIcon size={12} className="mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Customer Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <User size={14} className="text-gray-500" />
              <span>{order.customer}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-gray-500" />
              <span>{order.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-xs">{order.address}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50/50 rounded-lg p-3 mb-4">
            <h4 className="font-semibold text-sm mb-2">Itens do pedido:</h4>
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>R$ {(item.quantity * item.price).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-green-600">R$ {order.total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Pagamento:</span>
            <Badge variant="outline">
              {order.paymentMethod === 'pix' ? 'PIX' : 'Cartão'}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {order.status === "pending" && (
              <Button 
                size="sm" 
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                onClick={() => updateOrderStatus(order.id, "preparing")}
              >
                Iniciar Preparo
              </Button>
            )}
            {order.status === "preparing" && (
              <Button 
                size="sm" 
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={() => updateOrderStatus(order.id, "ready")}
              >
                Marcar Pronto
              </Button>
            )}
            {order.status === "ready" && (
              <Button 
                size="sm" 
                className="flex-1 bg-purple-500 hover:bg-purple-600"
                onClick={() => updateOrderStatus(order.id, "delivered")}
              >
                Marcar Entregue
              </Button>
            )}
            <Button variant="outline" size="sm">
              Detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestão de Pedidos</h1>
        <p className="text-gray-600">Acompanhe e gerencie todos os pedidos em tempo real</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">Todos ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending">Pendentes ({filterOrdersByStatus("pending").length})</TabsTrigger>
          <TabsTrigger value="preparing">Preparando ({filterOrdersByStatus("preparing").length})</TabsTrigger>
          <TabsTrigger value="ready">Prontos ({filterOrdersByStatus("ready").length})</TabsTrigger>
          <TabsTrigger value="delivered">Entregues ({filterOrdersByStatus("delivered").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterOrdersByStatus("pending").map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preparing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterOrdersByStatus("preparing").map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ready">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterOrdersByStatus("ready").map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterOrdersByStatus("delivered").map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
          <p className="text-gray-600">Os pedidos aparecerão aqui quando chegarem</p>
        </div>
      )}
    </div>
  );
};
