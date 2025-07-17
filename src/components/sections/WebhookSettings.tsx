import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
// import { webhookService } from '@/lib/webhookService';
// import { useFirebase } from '@/hooks/useFirebase';

export default function WebhookSettings() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [verifyToken, setVerifyToken] = useState('');
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const { toast } = useToast();
  
  // const { add, update, getById } = useFirebase('webhook_config');

  useEffect(() => {
    loadWebhookConfig();
  }, []);

  const loadWebhookConfig = async () => {
    // Temporariamente desabilitado até configurar Firebase
    console.log('Firebase não configurado ainda');
  };

  const saveWebhookConfig = async () => {
    // Temporariamente desabilitado até configurar Firebase
    toast({
      title: 'Firebase não configurado',
      description: 'Configure o Firebase primeiro para salvar as configurações.',
    });
  };

  const testWebhook = async () => {
    // Temporariamente desabilitado até configurar Firebase
    setTestResult('Firebase não configurado ainda');
    toast({
      title: 'Firebase não configurado',
      description: 'Configure o Firebase primeiro para testar webhooks.',
    });
  };

  const generateVerifyToken = () => {
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    setVerifyToken(token);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuração do Webhook</CardTitle>
          <CardDescription>
            Configure o webhook do WhatsApp para receber mensagens e pedidos dos clientes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">URL do Webhook</Label>
            <Input
              id="webhookUrl"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://seu-dominio.com/api/webhook"
            />
            <p className="text-sm text-muted-foreground">
              Esta URL será usada na configuração do WhatsApp Cloud API para receber mensagens.
            </p>
          </div>
  <div className="space-y-2">
    <Label htmlFor="verifyToken">Token de Verificação</Label>
    <div className="flex gap-2">
      <Input
        id="verifyToken"
        value={verifyToken}
        onChange={(e) => setVerifyToken(e.target.value)}
        placeholder="Token de verificação"
      />
      <Button onClick={generateVerifyToken} variant="outline">
        Gerar
      </Button>
    </div>
    <p className="text-sm text-muted-foreground">
      Este token será usado para validar o webhook no WhatsApp Cloud API.
    </p>
  </div>
  <div className="flex gap-2">
    <Button onClick={saveWebhookConfig}>
      {isConfigured ? 'Atualizar' : 'Salvar'} Configuração
    </Button>
    <Button onClick={testWebhook} variant="outline">
      Testar Webhook
    </Button>
  </div>
  {testResult && (
    <Alert>
      <AlertDescription>{testResult}</AlertDescription>
    </Alert>
  )}
</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruções de Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Configurar no WhatsApp Cloud API</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Acesse o <a href="https://developers.facebook.com/docs/whatsapp/cloud-api" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp Cloud API</a></li>
              <li>Configure o webhook com a URL: <code className="bg-muted px-1 rounded">{webhookUrl}</code></li>
              <li>Use o token de verificação: <code className="bg-muted px-1 rounded">{verifyToken}</code></li>
              <li>Selecione os eventos desejados (messages, status, etc.)</li>
            </ol>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">2. Configurar Firebase</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Crie um projeto no Firebase Console</li>
              <li>Ative o Firestore Database</li>
              <li>Configure as regras de segurança</li>
              <li>Adicione as credenciais no arquivo .env</li>
            </ol>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">3. Deploy da Aplicação</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Faça deploy da aplicação em um servidor público (ex: Render, Vercel, etc.)</li>
              <li>Certifique-se de que a URL do webhook está acessível</li>
              <li>Teste a configuração usando o botão "Testar Webhook"</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 