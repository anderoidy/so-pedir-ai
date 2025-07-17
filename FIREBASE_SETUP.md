# Configuração do Firebase e Webhooks do Facebook Messenger

Este guia irá ajudá-lo a configurar o Firebase e os webhooks do Facebook Messenger para o seu projeto.

## 1. Configuração do Firebase

### 1.1 Criar Projeto no Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Digite um nome para o projeto (ex: "pede-ai-webhook")
4. Siga os passos para criar o projeto

### 1.2 Configurar Firestore Database

1. No console do Firebase, vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (para desenvolvimento)
4. Escolha uma localização (recomendado: us-central1)

### 1.3 Configurar Regras de Segurança

No Firestore Database, vá para "Regras" e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita para desenvolvimento
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ IMPORTANTE:** Estas regras permitem acesso total. Para produção, configure regras mais restritivas.

### 1.4 Obter Configurações do Projeto

1. No console do Firebase, vá para "Configurações do projeto" (ícone de engrenagem)
2. Role para baixo até "Seus aplicativos"
3. Clique em "Adicionar aplicativo" e escolha "Web"
4. Registre o aplicativo e copie as configurações

### 1.5 Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id

# Facebook Messenger Configuration
VITE_FACEBOOK_VERIFY_TOKEN=seu_verify_token_aqui
VITE_FACEBOOK_PAGE_ACCESS_TOKEN=seu_page_access_token_aqui
```

## 2. Configuração do Facebook Messenger

### 2.1 Criar App no Facebook Developers

1. Acesse o [Facebook Developers](https://developers.facebook.com/)
2. Clique em "Meus aplicativos" → "Criar aplicativo"
3. Escolha "Negócios" como tipo de aplicativo
4. Preencha as informações necessárias

### 2.2 Configurar Messenger

1. No seu app, vá para "Produtos" → "Messenger"
2. Clique em "Configurar"
3. Conecte uma página do Facebook
4. Anote o "Token de acesso da página"

### 2.3 Configurar Webhook

1. Na seção Messenger, vá para "Configurações"
2. Em "Webhooks", clique em "Adicionar callback URL"
3. Configure:
   - **URL do callback**: `https://seu-dominio.com/webhook`
   - **Token de verificação**: Use o mesmo token definido em `VITE_FACEBOOK_VERIFY_TOKEN`
   - **Campos**: Selecione `messages` e `messaging_postbacks`

## 3. Deploy da Aplicação

### 3.1 Opções de Deploy

#### Opção A: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

#### Opção B: Netlify
```bash
npm run build
# Faça upload da pasta dist
```

#### Opção C: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### 3.2 Configurar Função Serverless (Opcional)

Para processar webhooks, você pode usar:

- **Vercel Functions**: Crie `api/webhook.ts`
- **Netlify Functions**: Crie `netlify/functions/webhook.ts`
- **Firebase Functions**: Use Firebase Functions

Exemplo para Vercel (`api/webhook.ts`):

```typescript
import { handleWebhook } from '../../src/lib/webhookEndpoint';

export default async function handler(req, res) {
  const { method, query, body } = req;
  
  const result = await handleWebhook(method, query, body);
  
  res.status(result.status).json(result.data);
}
```

## 4. Testando a Configuração

### 4.1 Teste Local

1. Execute `npm run dev`
2. Acesse a página de configurações de webhook
3. Use o botão "Testar Webhook"

### 4.2 Teste no Facebook

1. Envie uma mensagem para sua página do Facebook
2. Verifique se a mensagem aparece no Firebase
3. Verifique se a resposta automática é enviada

## 5. Estrutura do Banco de Dados

O Firebase criará automaticamente as seguintes coleções:

- `webhook_events`: Eventos recebidos do Facebook
- `messages`: Mensagens processadas
- `webhook_config`: Configurações do webhook

## 6. Solução de Problemas

### Erro: "Não foi possível validar a URL de callback"

1. Verifique se a URL está acessível publicamente
2. Confirme se o token de verificação está correto
3. Verifique se o servidor está respondendo corretamente

### Erro: "Firebase não inicializado"

1. Verifique se as variáveis de ambiente estão configuradas
2. Confirme se o arquivo `src/lib/firebase.ts` está correto
3. Reinicie o servidor de desenvolvimento

### Mensagens não aparecem no Firebase

1. Verifique as regras de segurança do Firestore
2. Confirme se o webhook está configurado corretamente
3. Verifique os logs do servidor

## 7. Próximos Passos

1. Configure respostas automáticas mais sofisticadas
2. Implemente integração com sistema de pedidos
3. Adicione autenticação e autorização
4. Configure monitoramento e logs
5. Implemente backup e recuperação de dados

## Suporte

Se você encontrar problemas:

1. Verifique os logs do console do navegador
2. Verifique os logs do Firebase Console
3. Teste a conectividade com o Facebook
4. Verifique se todas as variáveis de ambiente estão configuradas 