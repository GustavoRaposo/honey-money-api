-- =====================================================
-- HONEY MONEY API - ESTRUTURA COMPLETA DO BANCO DE DADOS
-- =====================================================
-- Gerado automaticamente em: 2025-09-22
-- Sistema: NestJS + Prisma + MySQL
-- Funcionalidades: Autenticação JWT + Refresh Token
-- =====================================================

-- Configurações do banco
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- CRIAÇÃO DO BANCO DE DADOS
-- =====================================================

-- Criar banco de dados (opcional - descomente se necessário)
-- CREATE DATABASE IF NOT EXISTS `honey_money` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `honey_money`;

-- =====================================================
-- TABELA: user
-- =====================================================
-- Armazena informações dos usuários do sistema
-- Inclui sistema de autenticação com refresh tokens

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `uuid` VARCHAR(191) NOT NULL COMMENT 'Identificador único do usuário (UUID)',
    `name` VARCHAR(191) NOT NULL COMMENT 'Nome completo do usuário',
    `email` VARCHAR(191) NOT NULL COMMENT 'Email do usuário (único)',
    `password` VARCHAR(191) NOT NULL COMMENT 'Senha hasheada com bcrypt',
    `refresh_token` VARCHAR(191) NULL COMMENT 'Refresh token hasheado (para renovação de JWT)',
    `token_expiry` DATETIME(3) NULL COMMENT 'Data de expiração do refresh token',
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT 'Data de criação do registro',
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT 'Data da última atualização',
    
    -- Índices e Constraints
    PRIMARY KEY (`uuid`),
    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `idx_user_email` (`email`),
    INDEX `idx_user_refresh_token` (`refresh_token`),
    INDEX `idx_user_token_expiry` (`token_expiry`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci 
COMMENT = 'Tabela de usuários com sistema de autenticação JWT e refresh tokens';

-- =====================================================
-- DADOS DE EXEMPLO (OPCIONAL)
-- =====================================================
-- Descomente as linhas abaixo para inserir dados de exemplo

/*
-- Usuário administrador de exemplo
INSERT INTO `user` (`uuid`, `name`, `email`, `password`, `refresh_token`, `token_expiry`, `create_at`, `update_at`) VALUES
(
    UUID(),
    'Administrador',
    'admin@honeymoney.com',
    '$2b$10$example.hash.here', -- Senha: admin123 (deve ser hasheada)
    NULL,
    NULL,
    NOW(3),
    NOW(3)
);

-- Usuário de teste
INSERT INTO `user` (`uuid`, `name`, `email`, `password`, `refresh_token`, `token_expiry`, `create_at`, `update_at`) VALUES
(
    UUID(),
    'Usuário Teste',
    'teste@honeymoney.com',
    '$2b$10$example.hash.here', -- Senha: teste123 (deve ser hasheada)
    NULL,
    NULL,
    NOW(3),
    NOW(3)
);
*/

-- =====================================================
-- VIEWS ÚTEIS (OPCIONAL)
-- =====================================================

-- View para listar usuários sem informações sensíveis
CREATE OR REPLACE VIEW `user_public` AS
SELECT 
    `uuid`,
    `name`,
    `email`,
    `create_at`,
    `update_at`
FROM `user`;

-- View para estatísticas de usuários
CREATE OR REPLACE VIEW `user_stats` AS
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN `refresh_token` IS NOT NULL THEN 1 END) as active_sessions,
    COUNT(CASE WHEN `token_expiry` > NOW() THEN 1 END) as valid_tokens,
    DATE(MIN(`create_at`)) as first_user_date,
    DATE(MAX(`create_at`)) as last_user_date
FROM `user`;

-- =====================================================
-- PROCEDURES ÚTEIS (OPCIONAL)
-- =====================================================

DELIMITER //

-- Procedure para limpeza de refresh tokens expirados
CREATE PROCEDURE CleanExpiredTokens()
BEGIN
    UPDATE `user` 
    SET 
        `refresh_token` = NULL,
        `token_expiry` = NULL,
        `update_at` = NOW(3)
    WHERE 
        `token_expiry` IS NOT NULL 
        AND `token_expiry` < NOW();
        
    SELECT ROW_COUNT() as tokens_cleaned;
END //

-- Procedure para estatísticas de autenticação
CREATE PROCEDURE GetAuthStats()
BEGIN
    SELECT 
        'Total de usuários' as metric,
        COUNT(*) as value
    FROM `user`
    
    UNION ALL
    
    SELECT 
        'Usuários com sessão ativa' as metric,
        COUNT(*) as value
    FROM `user`
    WHERE `refresh_token` IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'Tokens válidos' as metric,
        COUNT(*) as value
    FROM `user`
    WHERE `token_expiry` > NOW()
    
    UNION ALL
    
    SELECT 
        'Tokens expirados' as metric,
        COUNT(*) as value
    FROM `user`
    WHERE `token_expiry` IS NOT NULL AND `token_expiry` <= NOW();
END //

DELIMITER ;

-- =====================================================
-- TRIGGERS (OPCIONAL)
-- =====================================================

-- Trigger para log de atualizações de usuário
DELIMITER //

CREATE TRIGGER `user_update_timestamp`
    BEFORE UPDATE ON `user`
    FOR EACH ROW
BEGIN
    SET NEW.`update_at` = NOW(3);
END //

DELIMITER ;

-- =====================================================
-- CONFIGURAÇÕES DE SEGURANÇA
-- =====================================================

-- Restaurar configurações
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- INFORMAÇÕES SOBRE O SCHEMA
-- =====================================================

/*
ESTRUTURA DO SISTEMA:

1. AUTENTICAÇÃO JWT:
   - Access Token: 30 minutos de duração
   - Refresh Token: 7 dias de duração
   - Tokens hasheados no banco com bcrypt

2. CAMPOS DA TABELA USER:
   - uuid: Chave primária (UUID)
   - name: Nome do usuário
   - email: Email único
   - password: Senha hasheada (bcrypt)
   - refresh_token: Token de renovação (hasheado)
   - token_expiry: Expiração do refresh token
   - create_at: Data de criação
   - update_at: Data de atualização

3. ÍNDICES CRIADOS:
   - Primary Key: uuid
   - Unique: email
   - Index: email, refresh_token, token_expiry

4. ENDPOINTS RELACIONADOS:
   - POST /auth/login (gera tokens)
   - POST /auth/refresh (renova tokens)
   - POST /auth/logout (revoga tokens)
   - GET /auth/profile (perfil do usuário)

5. SEGURANÇA:
   - Senhas hasheadas com bcrypt (salt 10)
   - Refresh tokens hasheados
   - Expiração automática de tokens
   - Rotação de refresh tokens

6. MANUTENÇÃO:
   - Use CleanExpiredTokens() para limpar tokens expirados
   - Use GetAuthStats() para estatísticas
   - View user_public para dados sem informações sensíveis
*/

-- =====================================================
-- FIM DO ARQUIVO
-- =====================================================
