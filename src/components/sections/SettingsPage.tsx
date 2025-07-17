
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bot, Store, CreditCard, MessageCircle, Bell, Shield, Save, Webhook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WebhookSettings from "./WebhookSettings";
import MessagesViewer from "./MessagesViewer";

export const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    restaurant: {
      name: "Meu Restaurante",
      cnpj: "12.345.678/0001-90",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
      workingHours: "08:00 - 22:00"
    },
    ai: {
      enabled: true,
      model: "deepseek",
      responseTime: "fast",
      autoConfirmOrders: false
    },
    notifications: {
      newOrders: true,
      paymentConfirmed: true,
      orderReady: true,
      emailNotifications: false
    },
    payments: {
      pixEnabled: true,
      cardEnabled: true,
      pixKey: "meu-pix@email.com"
    }
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do seu restaurante e sistema</p>
      </div>

      <Tabs defaultValue="restaurant" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="restaurant" className="flex items-center gap-2">
            <Store size={16} />
            Restaurante
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot size={16} />
            IA
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard size={16} />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook size={16} />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Restaurant Settings */}
        <TabsContent value="restaurant">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Informações do Restaurante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="restaurant-name">Nome do Restaurante</Label>
                  <Input
                    id="restaurant-name"
                    value={settings.restaurant.name}
                    onChange={(e) => updateSetting('restaurant', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={settings.restaurant.cnpj}
                    onChange={(e) => updateSetting('restaurant', 'cnpj', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.restaurant.phone}
                    onChange={(e) => updateSetting('restaurant', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="working-hours">Horário de Funcionamento</Label>
                  <Input
                    id="working-hours"
                    value={settings.restaurant.workingHours}
                    onChange={(e) => updateSetting('restaurant', 'workingHours', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  value={settings.restaurant.address}
                  onChange={(e) => updateSetting('restaurant', 'address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai">
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle>Configurações da IA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">IA Conversacional Ativa</Label>
                    <p className="text-sm text-gray-600">Ative ou desative o atendimento automático</p>
                  </div>
                  <Switch
                    checked={settings.ai.enabled}
                    onCheckedChange={(checked) => updateSetting('ai', 'enabled', checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="ai-model">Modelo de IA</Label>
                  <select
                    id="ai-model"
                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    value={settings.ai.model}
                    onChange={(e) => updateSetting('ai', 'model', e.target.value)}
                  >
                    <option value="deepseek">DeepSeek (Recomendado)</option>
                    <option value="huggingface">Hugging Face</option>
                    <option value="openai">OpenAI GPT</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="response-time">Velocidade de Resposta</Label>
                  <select
                    id="response-time"
                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    value={settings.ai.responseTime}
                    onChange={(e) => updateSetting('ai', 'responseTime', e.target.value)}
                  >
                    <option value="fast">Rápida (1-2s)</option>
                    <option value="balanced">Balanceada (2-4s)</option>
                    <option value="accurate">Precisa (4-6s)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Confirmação Automática</Label>
                    <p className="text-sm text-gray-600">IA confirma pedidos automaticamente</p>
                  </div>
                  <Switch
                    checked={settings.ai.autoConfirmOrders}
                    onCheckedChange={(checked) => updateSetting('ai', 'autoConfirmOrders', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Status */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Status da IA</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                      <span className="text-sm text-gray-600">• 47 conversas hoje • 98% precisão</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">PIX</Label>
                  <p className="text-sm text-gray-600">Aceitar pagamentos via PIX</p>
                </div>
                <Switch
                  checked={settings.payments.pixEnabled}
                  onCheckedChange={(checked) => updateSetting('payments', 'pixEnabled', checked)}
                />
              </div>

              {settings.payments.pixEnabled && (
                <div>
                  <Label htmlFor="pix-key">Chave PIX</Label>
                  <Input
                    id="pix-key"
                    value={settings.payments.pixKey}
                    onChange={(e) => updateSetting('payments', 'pixKey', e.target.value)}
                    placeholder="Sua chave PIX (email, telefone ou CPF)"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Cartão de Crédito/Débito</Label>
                  <p className="text-sm text-gray-600">Aceitar pagamentos com cartão</p>
                </div>
                <Switch
                  checked={settings.payments.cardEnabled}
                  onCheckedChange={(checked) => updateSetting('payments', 'cardEnabled', checked)}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Gateway de Pagamento</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Conectado com Mercado Pago para processar pagamentos
                </p>
                <Badge className="bg-green-100 text-green-800">Conectado</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Novos Pedidos</Label>
                  <p className="text-sm text-gray-600">Notificação quando chegar um novo pedido</p>
                </div>
                <Switch
                  checked={settings.notifications.newOrders}
                  onCheckedChange={(checked) => updateSetting('notifications', 'newOrders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Pagamento Confirmado</Label>
                  <p className="text-sm text-gray-600">Notificação quando o pagamento for confirmado</p>
                </div>
                <Switch
                  checked={settings.notifications.paymentConfirmed}
                  onCheckedChange={(checked) => updateSetting('notifications', 'paymentConfirmed', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Pedido Pronto</Label>
                  <p className="text-sm text-gray-600">Notificação quando o pedido estiver pronto</p>
                </div>
                <Switch
                  checked={settings.notifications.orderReady}
                  onCheckedChange={(checked) => updateSetting('notifications', 'orderReady', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Notificações por Email</Label>
                  <p className="text-sm text-gray-600">Receber resumos diários por email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhook Settings */}
        <TabsContent value="webhooks">
          <div className="space-y-8">
            <WebhookSettings />
            <MessagesViewer />
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="bg-white/70 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">LGPD Compliance</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Seu sistema está em conformidade com a Lei Geral de Proteção de Dados
                </p>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Criptografia</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Todos os dados são criptografados usando TLS 1.3
                </p>
                <Badge className="bg-blue-100 text-blue-800">Ativo</Badge>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Backup Automático</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Backups diários automáticos via Firebase
                </p>
                <Badge className="bg-yellow-100 text-yellow-800">Ativo</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Save size={16} className="mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
