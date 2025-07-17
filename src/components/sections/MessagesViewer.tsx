import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { useFirebaseRealtime } from '@/hooks/useFirebase';
import { RefreshCw, MessageCircle, User, Clock } from 'lucide-react';

export default function MessagesViewer() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  // Temporariamente desabilitado até configurar Firebase
  const messages: any[] = [];
  const loading = false;
  const error = null;

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getMessageType = (type: string) => {
    switch (type) {
      case 'message':
        return { label: 'Mensagem', color: 'bg-blue-100 text-blue-800' };
      case 'postback':
        return { label: 'Postback', color: 'bg-green-100 text-green-800' };
      case 'delivery':
        return { label: 'Entrega', color: 'bg-yellow-100 text-yellow-800' };
      case 'read':
        return { label: 'Leitura', color: 'bg-purple-100 text-purple-800' };
      default:
        return { label: 'Desconhecido', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getMessageContent = (message: any) => {
    if (message.text) {
      return message.text;
    }
    if (message.attachments && message.attachments.length > 0) {
      return `Anexo: ${message.attachments[0].type}`;
    }
    return 'Mensagem sem texto';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Mensagens Recebidas</h2>
          <p className="text-gray-600">Mensagens recebidas via WhatsApp</p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw size={16} className="mr-2" />
          Atualizar
        </Button>
      </div>

      {loading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <RefreshCw className="animate-spin mr-2" />
              Carregando mensagens...
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Erro ao carregar mensagens: {error}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Mensagens */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle size={20} />
                Mensagens ({messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Nenhuma mensagem recebida ainda
                </p>
              ) : (
                messages.map((message) => {
                  const typeInfo = getMessageType(message.type);
                  return (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <User size={14} className="text-gray-500" />
                            <span className="text-sm font-medium">
                              {message.senderId}
                            </span>
                            <Badge className={typeInfo.color}>
                              {typeInfo.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {getMessageContent(message)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} />
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detalhes da Mensagem */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Mensagem</CardTitle>
              <CardDescription>
                Informações completas sobre a mensagem selecionada
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        ID da Mensagem
                      </label>
                      <p className="text-sm">{selectedMessage.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Tipo
                      </label>
                      <Badge className={getMessageType(selectedMessage.type).color}>
                        {getMessageType(selectedMessage.type).label}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Remetente
                      </label>
                      <p className="text-sm">{selectedMessage.senderId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Destinatário
                      </label>
                      <p className="text-sm">{selectedMessage.recipientId}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Conteúdo
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">{getMessageContent(selectedMessage)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Timestamp
                    </label>
                    <p className="text-sm">{formatTimestamp(selectedMessage.timestamp)}</p>
                  </div>

                  {selectedMessage.receivedAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Recebido em
                      </label>
                      <p className="text-sm">
                        {new Date(selectedMessage.receivedAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  )}

                  {selectedMessage.processed !== undefined && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <Badge
                        className={
                          selectedMessage.processed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {selectedMessage.processed ? 'Processado' : 'Pendente'}
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Selecione uma mensagem para ver os detalhes
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 