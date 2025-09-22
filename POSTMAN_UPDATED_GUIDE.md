# 🚀 Guia Atualizado - Collection Postman com Refresh Token

## 📋 **Resumo das Atualizações**

A collection do Postman foi atualizada para incluir o sistema completo de **refresh tokens** implementado na API.

### ✨ **Novidades Adicionadas:**

1. **🔄 Endpoint de Refresh Token** - Renovação automática de tokens
2. **🚪 Endpoint de Logout** - Revogação segura de tokens  
3. **🔧 Scripts Automáticos** - Gerenciamento inteligente de tokens
4. **📊 Variáveis Dinâmicas** - Controle automático de expiração

---

## 📁 **Estrutura Completa da Collection**

### 🔐 **Authentication (5 endpoints)**

#### **1. Login** `POST /auth/login`
**✨ ATUALIZADO com refresh token**

```json
// Resposta agora inclui:
{
  "access_token": "eyJ...",
  "refresh_token": "63af4025-c080-4860-a8c7-1c16d4b064d3",
  "expires_in": 1800,
  "user": { "uuid": "...", "name": "...", "email": "..." }
}
```

**Scripts Automáticos:**
- ✅ Salva `access_token` automaticamente
- ✅ Salva `refresh_token` automaticamente  
- ✅ Salva `expires_in` (tempo de expiração)
- ✅ Salva dados do usuário (`uuid`, `name`, `email`)

#### **2. Get Profile** `GET /auth/profile`
- Usa `{{jwt_token}}` automaticamente
- Protegido por autenticação JWT

#### **3. Validate Token** `POST /auth/validate`
- Verifica se o access token é válido
- Retorna dados do usuário se válido

#### **4. Refresh Token** `POST /auth/refresh` ⭐ **NOVO**
**Renova tokens automaticamente**

```json
// Body da requisição:
{
  "refresh_token": "{{refresh_token}}"
}

// Resposta:
{
  "access_token": "eyJ...",      // Novo access token
  "refresh_token": "096ed96d...", // Novo refresh token
  "expires_in": 1800,
  "user": { ... }
}
```

**Scripts Automáticos:**
- ✅ Usa `{{refresh_token}}` automaticamente
- ✅ Salva novos tokens automaticamente
- ✅ Atualiza tempo de expiração

#### **5. Logout** `POST /auth/logout` ⭐ **NOVO**
**Revoga refresh token e limpa sessão**

**Scripts Automáticos:**
- ✅ Usa `{{jwt_token}}` para autenticação
- ✅ Limpa todos os tokens após logout
- ✅ Remove variáveis de sessão

### 👥 **Users (7 endpoints)**
*Inalterados - todos funcionando com o novo sistema de tokens*

### ℹ️ **App Info (1 endpoint)**
*Health check - inalterado*

---

## 🔧 **Variáveis de Environment Atualizadas**

| Variável | Tipo | Descrição |
|----------|------|-----------|
| `base_url` | default | URL da API |
| `jwt_token` | secret | Access token (30min) |
| `refresh_token` | secret | ⭐ **NOVO** - Token de renovação (7 dias) |
| `expires_in` | default | ⭐ **NOVO** - Tempo de expiração em segundos |
| `user_uuid` | default | UUID do usuário logado |
| `user_email` | default | Email do usuário |
| `user_name` | default | Nome do usuário |
| `created_user_uuid` | default | UUID do último usuário criado |
| `test_user_email` | default | Email de teste |
| `test_user_password` | secret | Senha de teste |

---

## 🎯 **Fluxo de Teste Recomendado**

### **1. Teste Completo do Sistema de Tokens**

```bash
1. Create User       # Criar usuário de teste
2. Login            # Obter access + refresh token
3. Get Profile      # Testar access token
4. Refresh Token    # Renovar tokens
5. Get Profile      # Testar novo access token
6. Logout           # Revogar tokens
7. Get Profile      # Deve falhar (401)
```

### **2. Teste de Expiração de Tokens**

```bash
1. Login            # Obter tokens
2. [Aguardar 30min] # Deixar access token expirar
3. Get Profile      # Deve falhar (401)
4. Refresh Token    # Renovar com refresh token
5. Get Profile      # Deve funcionar novamente
```

---

## 🔄 **Como o Sistema de Refresh Token Funciona**

### **Fluxo Automático na Collection:**

1. **Login:**
   ```
   POST /auth/login → Salva access_token + refresh_token
   ```

2. **Uso Normal:**
   ```
   Qualquer requisição protegida → Usa {{jwt_token}} automaticamente
   ```

3. **Token Expirado:**
   ```
   Requisição → 401 Unauthorized
   ```

4. **Renovação Manual:**
   ```
   POST /auth/refresh → Novos tokens salvos automaticamente
   ```

5. **Logout:**
   ```
   POST /auth/logout → Tokens limpos automaticamente
   ```

---

## 💡 **Scripts Automáticos Implementados**

### **Login Script:**
```javascript
// Salva todos os tokens e dados do usuário
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set('jwt_token', response.access_token);
    pm.environment.set('refresh_token', response.refresh_token);
    pm.environment.set('expires_in', response.expires_in);
    // ... demais variáveis
}
```

### **Refresh Script:**
```javascript
// Atualiza tokens automaticamente
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set('jwt_token', response.access_token);
    pm.environment.set('refresh_token', response.refresh_token);
    // Token antigo invalidado automaticamente
}
```

### **Logout Script:**
```javascript
// Limpa todas as variáveis de sessão
if (pm.response.code === 200) {
    pm.environment.set('jwt_token', '');
    pm.environment.set('refresh_token', '');
    pm.environment.set('expires_in', '');
}
```

---

## 🛡️ **Segurança Implementada**

### **Rotação de Tokens:**
- ✅ Cada refresh gera **novos** access + refresh tokens
- ✅ Token antigo é **invalidado** imediatamente
- ✅ Previne **ataques de replay**

### **Expiração:**
- ✅ Access Token: **30 minutos**
- ✅ Refresh Token: **7 dias**
- ✅ Limpeza automática no logout

### **Armazenamento:**
- ✅ Refresh tokens **hasheados** no banco
- ✅ Tokens **nunca** armazenados em texto plano
- ✅ Validação rigorosa de expiração

---

## 🚨 **Tratamento de Erros**

### **401 Unauthorized:**
```json
{
  "message": "Invalid refresh token",
  "error": "Unauthorized", 
  "statusCode": 401
}
```

**Possíveis Causas:**
- Access token expirado → Use refresh token
- Refresh token expirado → Faça novo login
- Refresh token inválido → Faça novo login
- Usuário fez logout → Faça novo login

---

## 🎯 **Implementação no Frontend**

### **Interceptor Automático (Exemplo):**
```javascript
// Renovação automática de tokens
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      
      try {
        const response = await axios.post('/auth/refresh', {
          refresh_token: refreshToken
        });
        
        // Atualizar tokens
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        
        // Repetir requisição original
        return axios(error.config);
        
      } catch (refreshError) {
        // Redirecionar para login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

---

## 📊 **Monitoramento e Debug**

### **Console Logs Automáticos:**
- ✅ Status de cada requisição
- ✅ Tempo de resposta
- ✅ Confirmação de tokens salvos
- ✅ Tempo de expiração

### **Verificações Úteis:**
```bash
# Ver token atual
console.log(pm.environment.get('jwt_token'));

# Ver refresh token
console.log(pm.environment.get('refresh_token'));

# Ver tempo de expiração
console.log(pm.environment.get('expires_in'), 'segundos');
```

---

## 🎉 **Benefícios da Atualização**

### **Para Desenvolvedores:**
- ✅ **Teste completo** do sistema de refresh tokens
- ✅ **Automação total** - sem copiar/colar tokens
- ✅ **Fluxo realista** igual ao frontend
- ✅ **Debug fácil** com logs automáticos

### **Para Segurança:**
- ✅ **Tokens rotativos** - maior segurança
- ✅ **Expiração curta** - menor janela de ataque
- ✅ **Logout seguro** - revogação imediata
- ✅ **Sessões longas** - melhor UX

---

**A collection agora está 100% atualizada com o sistema completo de refresh tokens!** 🚀

**Import os arquivos atualizados no Postman e aproveite todas as funcionalidades automáticas!** ✨
