# 🗄️ Estrutura do Banco de Dados - Honey Money API

## 📁 Arquivos SQL Disponíveis

### 1. `database-structure.sql` (Completo)
**231 linhas** - Estrutura completa com recursos avançados

**Inclui:**
- ✅ Estrutura completa da tabela `user`
- ✅ Comentários detalhados em todos os campos
- ✅ Índices otimizados para performance
- ✅ Views úteis (`user_public`, `user_stats`)
- ✅ Stored Procedures para manutenção
- ✅ Triggers para auditoria
- ✅ Dados de exemplo (comentados)
- ✅ Documentação completa do sistema

**Recomendado para:**
- Ambiente de produção
- Desenvolvimento com recursos avançados
- Documentação e referência

### 2. `database-simple.sql` (Básico)
**29 linhas** - Apenas estrutura essencial

**Inclui:**
- ✅ Tabela `user` com todos os campos
- ✅ Chaves primárias e únicas
- ✅ Configuração de charset
- ✅ Estrutura mínima funcional

**Recomendado para:**
- Deploy rápido
- Ambiente de testes
- Configuração mínima

### 3. `prisma-generated-schema.sql` (Gerado)
**15 linhas** - Schema exato do Prisma

**Inclui:**
- ✅ SQL gerado automaticamente pelo Prisma
- ✅ Estrutura idêntica ao banco atual
- ✅ Compatibilidade 100% com o ORM

**Recomendado para:**
- Replicação exata do ambiente
- Migração de dados
- Backup da estrutura

## 🏗️ Estrutura da Tabela `user`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `uuid` | VARCHAR(191) | Chave primária (UUID) |
| `name` | VARCHAR(191) | Nome completo do usuário |
| `email` | VARCHAR(191) | Email único do usuário |
| `password` | VARCHAR(191) | Senha hasheada (bcrypt) |
| `refresh_token` | VARCHAR(191) | Refresh token hasheado |
| `token_expiry` | DATETIME(3) | Expiração do refresh token |
| `create_at` | DATETIME(3) | Data de criação |
| `update_at` | DATETIME(3) | Data de atualização |

## 🔐 Sistema de Autenticação

### Características:
- **Access Token:** 30 minutos de duração
- **Refresh Token:** 7 dias de duração  
- **Segurança:** Todos os tokens são hasheados no banco
- **Rotação:** Refresh tokens são renovados a cada uso

### Campos Relacionados:
- `refresh_token`: Armazena o hash do refresh token
- `token_expiry`: Data de expiração do refresh token
- `password`: Senha hasheada com bcrypt (salt 10)

## 🚀 Como Usar

### Opção 1: Estrutura Completa
```bash
mysql -u username -p database_name < database-structure.sql
```

### Opção 2: Estrutura Simples
```bash
mysql -u username -p database_name < database-simple.sql
```

### Opção 3: Via Prisma (Recomendado)
```bash
npm run prisma:migrate
```

## 📊 Views Disponíveis (apenas no arquivo completo)

### `user_public`
Visualização dos usuários sem informações sensíveis:
```sql
SELECT uuid, name, email, create_at, update_at FROM user_public;
```

### `user_stats`
Estatísticas do sistema:
```sql
SELECT * FROM user_stats;
```

## 🔧 Procedures Disponíveis (apenas no arquivo completo)

### `CleanExpiredTokens()`
Remove refresh tokens expirados:
```sql
CALL CleanExpiredTokens();
```

### `GetAuthStats()`
Estatísticas de autenticação:
```sql
CALL GetAuthStats();
```

## 🛡️ Segurança

### Índices Criados:
- **Primary Key:** `uuid`
- **Unique Index:** `email`
- **Performance Index:** `refresh_token`, `token_expiry`

### Boas Práticas Implementadas:
- ✅ Senhas nunca armazenadas em texto plano
- ✅ Refresh tokens hasheados
- ✅ Expiração automática de tokens
- ✅ Charset UTF8MB4 para suporte completo
- ✅ Timestamps automáticos

## 🔄 Migração e Backup

### Backup da Estrutura:
```bash
mysqldump -u username -p --no-data database_name > backup-structure.sql
```

### Backup Completo:
```bash
mysqldump -u username -p database_name > backup-complete.sql
```

### Restauração:
```bash
mysql -u username -p database_name < backup-file.sql
```

## 📈 Monitoramento

### Consultas Úteis:

**Usuários ativos:**
```sql
SELECT COUNT(*) FROM user WHERE refresh_token IS NOT NULL;
```

**Tokens expirados:**
```sql
SELECT COUNT(*) FROM user WHERE token_expiry < NOW();
```

**Últimos registros:**
```sql
SELECT name, email, create_at FROM user ORDER BY create_at DESC LIMIT 10;
```

## 🔗 Integração com a API

### Endpoints Relacionados:
- `POST /auth/login` - Cria refresh_token
- `POST /auth/refresh` - Renova refresh_token  
- `POST /auth/logout` - Remove refresh_token
- `POST /user` - Cria novo usuário

### Fluxo de Dados:
1. **Registro:** Usuário criado com senha hasheada
2. **Login:** Refresh token gerado e salvo hasheado
3. **Renovação:** Novo refresh token substitui o antigo
4. **Logout:** Refresh token removido do banco

---

**Escolha o arquivo SQL que melhor atende às suas necessidades!** 🎯
