import { addDoc, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

// Tipos para os dados do webhook (WhatsApp)
export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  text?: string;
  type: string;
  timestamp: number;
  raw?: any;
}

export interface WhatsAppWebhookEvent {
  object: 'whatsapp_business_account';
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messages?: WhatsAppMessage[];
        [key: string]: any;
      };
      field: string;
    }>;
  }>;
}

// Serviço para gerenciar webhooks do WhatsApp
export class WebhookService {
  private static instance: WebhookService;
  private readonly collectionName = 'webhook_events';

  static getInstance(): WebhookService {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService();
    }
    return WebhookService.instance;
  }

  // Salvar evento do webhook
  async saveWebhookEvent(event: WhatsAppWebhookEvent): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...event,
        receivedAt: new Date().toISOString(),
        processed: false
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao salvar evento do webhook:', error);
      throw error;
    }
  }

  // Processar mensagens do webhook
  async processWebhookMessages(event: WhatsAppWebhookEvent): Promise<void> {
    try {
      for (const entry of event.entry) {
        for (const change of entry.changes) {
          if (change.value.messages) {
            for (const message of change.value.messages) {
              await this.processMessage(message);
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro ao processar mensagens do webhook:', error);
      throw error;
    }
  }

  // Processar uma mensagem individual do WhatsApp
  private async processMessage(message: WhatsAppMessage): Promise<void> {
    try {
      await addDoc(collection(db, 'messages'), {
        ...message,
        receivedAt: new Date().toISOString(),
        processed: false
      });
      console.log('Mensagem WhatsApp processada:', message);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      throw error;
    }
  }

  // Verificar se o webhook é válido (verificação do Facebook)
  verifyWebhook(mode: string, token: string, challenge: string, verifyToken: string): string | null {
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    return null;
  }

  // Buscar mensagens não processadas
  async getUnprocessedMessages(): Promise<any[]> {
    try {
      const q = query(
        collection(db, 'messages'),
        where('processed', '==', false)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar mensagens não processadas:', error);
      throw error;
    }
  }

  // Marcar mensagem como processada
  async markMessageAsProcessed(messageId: string): Promise<void> {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        processed: true,
        processedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao marcar mensagem como processada:', error);
      throw error;
    }
  }
}

export const webhookService = WebhookService.getInstance(); 