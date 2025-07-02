
import { Bot, Zap, MessageCircle, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const features = [
    {
      icon: Bot,
      title: "IA Conversacional",
      description: "Atendimento automatizado inteligente via WhatsApp"
    },
    {
      icon: Zap,
      title: "Setup Rápido",
      description: "Configure seu restaurante em menos de 15 minutos"
    },
    {
      icon: MessageCircle,
      title: "Multi-canal",
      description: "Pedidos via WhatsApp, site e outras plataformas"
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Relatórios e insights para otimizar suas vendas"
    }
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          O Futuro dos Pedidos
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Revolucione seu restaurante com IA conversacional avançada. 
          Automatize pedidos, aumente vendas e encante seus clientes.
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
          onClick={onGetStarted}
        >
          Começar Agora
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-gray-200/50">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Demo Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
          <p className="text-gray-600">Simples, rápido e inteligente</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold mb-2">Configure seu Cardápio</h3>
            <p className="text-gray-600 text-sm">Adicione pratos, preços e descrições em minutos</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold mb-2">IA Atende Clientes</h3>
            <p className="text-gray-600 text-sm">Resposta automática e inteligente 24/7</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold mb-2">Gerencie Pedidos</h3>
            <p className="text-gray-600 text-sm">Acompanhe tudo em tempo real no dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};
