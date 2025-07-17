import { webhookService } from './webhookService';

export interface WebhookResponse {
  status: number;
  data: any;
}

export async function handleWebhook(
  method: string,
  query: any,
  body: any
): Promise<WebhookResponse> {
  try {
    // Apenas POST para WhatsApp
    if (method === 'POST') {
      // Verificar se o body é válido para WhatsApp
      if (!body || !body.object || body.object !== 'whatsapp_business_account') {
        return {
          status: 400,
          data: { error: 'Invalid request body' }
        };
      }
      // Processar o webhook do WhatsApp
      await webhookService.processWebhookMessages(body);
      return {
        status: 200,
        data: { success: true }
      };
    }
    // Método não suportado
    return {
      status: 405,
      data: { error: 'Method not allowed' }
    };
  } catch (error) {
    console.error('Erro no handleWebhook:', error);
    return {
      status: 500,
      data: { error: 'Internal server error' }
    };
  }
} 