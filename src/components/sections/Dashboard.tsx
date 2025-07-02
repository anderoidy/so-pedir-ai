
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShoppingCart, DollarSign, Users, Clock, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

export const Dashboard = () => {
  const stats = [
    {
      title: "Vendas Hoje",
      value: "R$ 2.847",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Pedidos Hoje",
      value: "47",
      change: "+8%",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Clientes Ativos",
      value: "156",
      change: "+23%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Tempo Médio",
      value: "18min",
      change: "-5%",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const salesData = [
    { name: 'Seg', vendas: 1200 },
    { name: 'Ter', vendas: 1800 },
    { name: 'Qua', vendas: 1400 },
    { name: 'Qui', vendas: 2200 },
    { name: 'Sex', vendas: 2800 },
    { name: 'Sáb', vendas: 3200 },
    { name: 'Dom', vendas: 2400 },
  ];

  const recentOrders = [
    { id: "#1234", customer: "João Silva", items: "2x Hambúrguer, 1x Batata", total: "R$ 45,90", status: "preparing", time: "5 min" },
    { id: "#1235", customer: "Maria Santos", items: "1x Pizza Margherita", total: "R$ 32,50", status: "delivered", time: "12 min" },
    { id: "#1236", customer: "Pedro Costa", items: "3x Açaí, 2x Suco", total: "R$ 28,00", status: "pending", time: "2 min" },
    { id: "#1237", customer: "Ana Oliveira", items: "1x Prato Feito", total: "R$ 18,90", status: "preparing", time: "8 min" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "preparing":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Preparando</Badge>;
      case "delivered":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Entregue</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Acompanhe o desempenho do seu restaurante em tempo real</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                      <TrendingUp size={14} />
                      {stat.change} vs ontem
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle>Vendas da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="url(#gradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{order.total}</p>
                    <p className="text-xs text-gray-500">{order.time} atrás</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Status */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">IA Conversacional Ativa</h3>
              <p className="text-sm text-gray-600">Atendendo clientes automaticamente no WhatsApp • 47 conversas hoje</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
