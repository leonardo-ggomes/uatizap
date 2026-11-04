-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para whatsapp
DROP DATABASE IF EXISTS `whatsapp`;
CREATE DATABASE IF NOT EXISTS `whatsapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `whatsapp`;

-- Copiando estrutura para tabela whatsapp.mensagens
DROP TABLE IF EXISTS `mensagens`;
CREATE TABLE IF NOT EXISTS `mensagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `telefone_remetente` varchar(20) NOT NULL,
  `telefone_destino` varchar(20) NOT NULL,
  `mensagem` text NOT NULL,
  `data_envio` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_mensagem_remetente` (`telefone_remetente`),
  KEY `fk_mensagem_destino` (`telefone_destino`),
  CONSTRAINT `fk_mensagem_destino` FOREIGN KEY (`telefone_destino`) REFERENCES `utilizadores` (`telefone`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagem_remetente` FOREIGN KEY (`telefone_remetente`) REFERENCES `utilizadores` (`telefone`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela whatsapp.mensagens: ~52 rows (aproximadamente)
DELETE FROM `mensagens`;
INSERT INTO `mensagens` (`id`, `telefone_remetente`, `telefone_destino`, `mensagem`, `data_envio`) VALUES
	(1, '5518991110004', '5518991110016', 'Olá Tudo bem?', '2026-10-02 19:18:54'),
	(2, '5518991110001', '5518991110002', 'Olá Maria, tudo bem por aí?', '2026-10-02 19:19:50'),
	(3, '5518991110002', '5518991110001', 'Oi João! Tudo ótimo e contigo?', '2026-10-02 19:19:50'),
	(4, '5518991110001', '5518991110002', 'Tudo bem também, correria com o trabalho.', '2026-10-02 19:19:50'),
	(5, '5518991110003', '5518991110004', 'Ana, você conseguiu terminar aquele relatório?', '2026-10-02 19:19:50'),
	(6, '5518991110004', '5518991110003', 'Sim Carlos, acabei de enviar para o e-mail.', '2026-10-02 19:19:50'),
	(7, '5518991110005', '5518991110006', 'E aí Beatriz, vamos almoçar hoje?', '2026-10-02 19:19:50'),
	(8, '5518991110006', '5518991110005', 'Com certeza! Me pega às 12h?', '2026-10-02 19:19:50'),
	(9, '5518991110007', '5518991110008', 'Juliana, qual o link da reunião de hoje?', '2026-10-02 19:19:50'),
	(10, '5518991110008', '5518991110007', 'Vou te enviar no privado agora mesmo.', '2026-10-02 19:19:50'),
	(11, '5518991110009', '5518991110010', 'Camila, lembra de trazer o material de rede.', '2026-10-02 19:19:50'),
	(12, '5518991110010', '5518991110009', 'Combinado, já está na minha bolsa!', '2026-10-02 19:19:50'),
	(13, '5518991110011', '5518991110012', 'Larissa, o sistema caiu para você também?', '2026-10-02 19:19:50'),
	(14, '5518991110012', '5518991110011', 'Aqui está normal, tenta reiniciar o router.', '2026-10-02 19:19:50'),
	(15, '5518991110013', '5518991110014', 'Fernanda, parabéns pelo projeto novo!', '2026-10-02 19:19:50'),
	(16, '5518991110014', '5518991110013', 'Muito obrigada Matheus! Deu trabalho mas valeu a pena.', '2026-10-02 19:19:50'),
	(17, '5518991110015', '5518991110016', 'Amanda, vamos marcar aquela partida de futebol?', '2026-10-02 19:19:50'),
	(18, '5518991110016', '5518991110015', 'Por mim fechado, sábado à tarde!', '2026-10-02 19:19:50'),
	(19, '5518991110017', '5518991110018', 'Patrícia, precisa de ajuda com o banco de dados?', '2026-10-02 19:19:50'),
	(20, '5518991110018', '5518991110017', 'Aceito sim Diego, estou travada numa query.', '2026-10-02 19:19:50'),
	(21, '5518991110019', '5518991110020', 'Vanessa, bom dia! Onde deixaste a chave da sala?', '2026-10-02 19:19:50'),
	(22, '5518991110020', '5518991110019', 'Bom dia! Está na gaveta da secretária.', '2026-10-02 19:19:50'),
	(23, '5518991110021', '5518991110022', 'Renata, confirmada a nossa viagem no fim de semana?', '2026-10-02 19:19:50'),
	(24, '5518991110022', '5518991110021', 'Sim Gustavo, já arrumei as malas!', '2026-10-02 19:19:50'),
	(25, '5518991110023', '5518991110024', 'Tatiane, olhou a documentação da API?', '2026-10-02 19:19:50'),
	(26, '5518991110024', '5518991110023', 'Estou a ler agora mesmo, ficou excelente.', '2026-10-02 19:19:50'),
	(27, '5518991110025', '5518991110026', 'Jéssica, vamos tomar um café?', '2026-10-02 19:19:50'),
	(28, '5518991110026', '5518991110025', 'Vamos sim Marcos, daqui a 5 minutos estou aí.', '2026-10-02 19:19:50'),
	(29, '5518991110027', '5518991110028', 'Daniela, o cliente aprovou o orçamento.', '2026-10-02 19:19:50'),
	(30, '5518991110028', '5518991110027', 'Que notícia maravilhosa Igor!', '2026-10-02 19:19:50'),
	(31, '5518991110029', '5518991110030', 'Bianca, me liga quando puder por favor.', '2026-10-02 19:19:50'),
	(32, '5518991110030', '5518991110029', 'Já te ligo Alexandre, só a terminar um atendimento.', '2026-10-02 19:19:50'),
	(33, '5518991110031', '5518991110032', 'Sabrina, parabéns pela conquista profissional!', '2026-10-02 19:19:50'),
	(34, '5518991110032', '5518991110031', 'Obrigada Eduardo! Estou muito feliz.', '2026-10-02 19:19:50'),
	(35, '5518991110033', '5518991110034', 'Caroline, qual a versão do Node estamos a usar?', '2026-10-02 19:19:50'),
	(36, '5518991110034', '5518991110033', 'Estamos na versão LTS mais recente.', '2026-10-02 19:19:50'),
	(37, '5518991110035', '5518991110036', 'Natália, o backup da base de dados rodou com sucesso?', '2026-10-02 19:19:50'),
	(38, '5518991110036', '5518991110035', 'Sim Leandro, verifiquei os logs agora cedo.', '2026-10-02 19:19:50'),
	(39, '5518991110037', '5518991110038', 'Priscila, vamos fechar o cronograma das aulas?', '2026-10-02 19:19:50'),
	(40, '5518991110038', '5518991110037', 'Combinado Marcelo, à tarde reunimo-nos.', '2026-10-02 19:19:50'),
	(41, '5518991110039', '5518991110040', 'Flávia, tem o contato do suporte técnico?', '2026-10-02 19:19:50'),
	(42, '5518991110040', '5518991110039', 'Tenho sim Fábio, vou te mandar por mensagem.', '2026-10-02 19:19:50'),
	(43, '5518991110041', '5518991110042', 'Tatiana, o painel do Zabbix disparou um alerta.', '2026-10-02 19:19:50'),
	(44, '5518991110042', '5518991110041', 'Estou a verificar o servidor de aplicação agora.', '2026-10-02 19:19:50'),
	(45, '5518991110043', '5518991110044', 'Luana, consegues validar o layout novo?', '2026-10-02 19:19:50'),
	(46, '5518991110044', '5518991110043', 'Ficou muito bom Wagner, aprovealei os ícones.', '2026-10-02 19:19:50'),
	(47, '5518991110045', '5518991110046', 'Aline, a chave PIX da empresa é a mesma?', '2026-10-02 19:19:50'),
	(48, '5518991110046', '5518991110045', 'Sim António, continua o CNPJ.', '2026-10-02 19:19:50'),
	(49, '5518991110047', '5518991110048', 'Renan, o deploy em produção correu bem?', '2026-10-02 19:19:50'),
	(50, '5518991110048', '5518991110047', 'Tudo verde Paulo, sem erros reportados.', '2026-10-02 19:19:50'),
	(51, '5518991110049', '5518991110050', 'Beatriz, vamos fechar o relatório mensal?', '2026-10-02 19:19:50'),
	(52, '5518991110050', '5518991110049', 'Vamos sim Júlio, já estou com os dados abertos.', '2026-10-02 19:19:50'),
	(53, '5518991110003', '5518991110010', 'Oiiii', '2026-10-02 19:20:51');

-- Copiando estrutura para procedure whatsapp.sp_enviar_mensagem
DROP PROCEDURE IF EXISTS `sp_enviar_mensagem`;
DELIMITER //
CREATE PROCEDURE `sp_enviar_mensagem`(
	IN p_remetente VARCHAR(20),
	IN p_destino  VARCHAR(20),
	IN p_mensagem TEXT
)
BEGIN
	INSERT INTO mensagens (telefone_remetente,telefone_destino, mensagem)
	VALUES (p_remetente,p_destino,p_mensagem);
END//
DELIMITER ;

-- Copiando estrutura para procedure whatsapp.sp_obter_historico
DROP PROCEDURE IF EXISTS `sp_obter_historico`;
DELIMITER //
CREATE PROCEDURE `sp_obter_historico`(
	IN p_telefone_a VARCHAR(20),
	IN p_telefone_b VARCHAR(20)
)
BEGIN
SELECT 
     m.id AS id_mensagem,
     m.telefone_remetente,
     remetente.apelido AS apelido_remetente,
     m.telefone_destino,
     destino.apelido AS apelido_destino,
     m.mensagem,
     m.data_envio
   FROM mensagens m
	JOIN utilizadores remetente ON m.telefone_remetente = remetente.telefone
	JOIN utilizadores destino ON m.telefone_destino = destino.telefone
	WHERE (m.telefone_remetente = p_telefone_a AND m.telefone_destino = p_telefone_b)
	  OR (m.telefone_remetente = p_telefone_b AND m.telefone_destino = p_telefone_a)
	ORDER BY m.data_envio ASC;
END//
DELIMITER ;

-- Copiando estrutura para procedure whatsapp.sp_registrar_utilizador
DROP PROCEDURE IF EXISTS `sp_registrar_utilizador`;
DELIMITER //
CREATE PROCEDURE `sp_registrar_utilizador`(
	IN p_apelido VARCHAR(100),
	IN p_telefone VARCHAR(20),
	IN p_senha VARCHAR(255)
)
BEGIN
	INSERT INTO utilizadores(apelido, telefone, senha)
	VALUES (p_apelido,p_telefone,p_senha);
END//
DELIMITER ;

-- Copiando estrutura para tabela whatsapp.utilizadores
DROP TABLE IF EXISTS `utilizadores`;
CREATE TABLE IF NOT EXISTS `utilizadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apelido` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela whatsapp.utilizadores: ~52 rows (aproximadamente)
DELETE FROM `utilizadores`;
INSERT INTO `utilizadores` (`id`, `apelido`, `telefone`, `senha`, `criado_em`) VALUES
	(1, 'joao_joao', '18991245678', 'senha1234', '2026-10-02 18:59:31'),
	(2, 'MariaFer', '18912345678', 'senha123', '2026-10-02 19:05:01'),
	(3, 'joao_silva', '5518991110001', '5f4dcc3b5aa765d61d8327deb882cf99', '2026-10-02 19:17:25'),
	(4, 'maria_santos', '5518991110002', 'e11023778c1c4f699351e36f45a0b943', '2026-10-02 19:17:25'),
	(5, 'carlos_souza', '5518991110003', 'f5bb0c8de1adcafc674249a2d1d2938f', '2026-10-02 19:17:25'),
	(6, 'ana_oliveira', '5518991110004', '52d6928e18dbb9d4da2c3da2cf788f6c', '2026-10-02 19:17:25'),
	(7, 'lucas_pereira', '5518991110005', '0cc175b9c0f1b6a831c399e269772661', '2026-10-02 19:17:25'),
	(8, 'beatriz_lima', '5518991110006', '900150983cd24fb0d6963f7d28e17f72', '2026-10-02 19:17:25'),
	(9, 'rafael_costa', '5518991110007', '3b5935759e66ff45eb9d7f02d417a8e7', '2026-10-02 19:17:25'),
	(10, 'juliana_ferreira', '5518991110008', '14f63c8734e8f7fa745f470a1a5b822d', '2026-10-02 19:17:25'),
	(11, 'gabriel_rodrigues', '5518991110009', '4297f44b13955a352a4b22103f1559e3', '2026-10-02 19:17:25'),
	(12, 'camila_almeida', '5518991110010', 'df6d2338b2b8fcebc8f60f6ef52af742', '2026-10-02 19:17:25'),
	(13, 'bruno_martins', '5518991110011', '2d7116f4f794ce0ada17f4bb7541d4aa', '2026-10-02 19:17:25'),
	(14, 'larissa_barbosa', '5518991110012', '827ccb0eea8a706c4c34a16891f84e7b', '2026-10-02 19:17:25'),
	(15, 'matheus_ribeiro', '5518991110013', 'e3ceb5881a0a1fdaad01a96d9124293f', '2026-10-02 19:17:25'),
	(16, 'fernanda_carvalho', '5518991110014', '69a4d8d17ca35767a9cd68b201a4e219', '2026-10-02 19:17:25'),
	(17, 'thiago_gomes', '5518991110015', '2133062de3309a96e93e0b2b8fa7c907', '2026-10-02 19:17:25'),
	(18, 'amanda_martins', '5518991110016', '19581e27de7cbd008275c531d0f1fa2d', '2026-10-02 19:17:25'),
	(19, 'diego_araujo', '5518991110017', '7694f4a66316e53c8cdd9d9954bd611d', '2026-10-02 19:17:25'),
	(20, 'patricia_melo', '5518991110018', '25d55ad283aa400af464c76d713c07ad', '2026-10-02 19:17:25'),
	(21, 'vinicius_cardoso', '5518991110019', 'e2fc714c4727ee9395f324cd2e7f331f', '2026-10-02 19:17:25'),
	(22, 'vanessa_monteiro', '5518991110020', '6c14da1efe4f89d6e7f8ef839257e849', '2026-10-02 19:17:25'),
	(23, 'gustavo_nogueira', '5518991110021', '03c7c0ace395d80182db07ae2c30f034', '2026-10-02 19:17:25'),
	(24, 'renata_vieira', '5518991110022', 'd791bcfcadac5bc2aa7a6c9e0cf517e4', '2026-10-02 19:17:25'),
	(25, 'felipe_correia', '5518991110023', 'a8f5f167f44f4964e6c998dee827110c', '2026-10-02 19:17:25'),
	(26, 'tatiane_moraes', '5518991110024', '3b14d2320b98a08ff842d76f827a4d53', '2026-10-02 19:17:25'),
	(27, 'marcos_freitas', '5518991110025', '1c383cd30b7c298ab50293adfecb7b18', '2026-10-02 19:17:25'),
	(28, 'jessica_ramos', '5518991110026', '81dc9bdb52d04dc20036dbd8313ed055', '2026-10-02 19:17:25'),
	(29, 'igor_cavalcanti', '5518991110027', 'c20ad4d76fe97759aa27a0c99bff6710', '2026-10-02 19:17:25'),
	(30, 'daniela_pinto', '5518991110028', 'c3284d0f94606de1fed2afc7d8f6153b', '2026-10-02 19:17:25'),
	(31, 'alexandre_silva', '5518991110029', '6512bd43d9caa6e02c990b0a82652dca', '2026-10-02 19:17:25'),
	(32, 'bianca_rocha', '5518991110030', 'c4ca4238a0b923820dcc509a6f75849b', '2026-10-02 19:17:25'),
	(33, 'eduardo_campos', '5518991110031', 'c81e728d9d4c2f636f067f89cc14862c', '2026-10-02 19:17:25'),
	(34, 'sabrina_siqueira', '5518991110032', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', '2026-10-02 19:17:25'),
	(35, 'rodrigo_mendes', '5518991110033', 'a87ff679a2f3e71d9181a67b7542122c', '2026-10-02 19:17:25'),
	(36, 'caroline_teixeira', '5518991110034', 'e4da3b7fbbce2345d7772b0674a318d5', '2026-10-02 19:17:25'),
	(37, 'leandro_dias', '5518991110035', '1679091c5a880faf6fb5e6087eb1b2dc', '2026-10-02 19:17:25'),
	(38, 'natalia_guedes', '5518991110036', '8f14e45fceea167a5a36dedd4bea2543', '2026-10-02 19:17:25'),
	(39, 'marcelo_furtado', '5518991110037', 'c9f0f895fb98ab9159f51fd0297e236d', '2026-10-02 19:17:25'),
	(40, 'priscila_duarte', '5518991110038', '45c48cce2e2d7fbdea1afc51c7c6ad26', '2026-10-02 19:17:25'),
	(41, 'fabio_azevedo', '5518991110039', 'd3d9446802a44259755d38e6d163e820', '2026-10-02 19:17:25'),
	(42, 'flavia_castro', '5518991110040', '651bcb437fac960ef2b0abfe984039f3', '2026-10-02 19:17:25'),
	(43, 'leonardo_brito', '5518991110041', 'c74d97b01eae257e44aa9d5bade97baf', '2026-10-02 19:17:25'),
	(44, 'tatiana_medeiros', '5518991110042', '6f4922f45568161a8cdf4ad2299f6d23', '2026-10-02 19:17:25'),
	(45, 'wagner_lima', '5518991110043', '19ca14e7ea6328a42e0eb13d585ae4c2', '2026-10-02 19:17:25'),
	(46, 'luana_silveira', '5518991110044', 'a5bfc9e07964f8dddeb95fc584cd965d', '2026-10-02 19:17:25'),
	(47, 'antonio_neto', '5518991110045', 'd81f9c1be2e08964bf9f24b15f0e4934', '2026-10-02 19:17:25'),
	(48, 'aline_fonseca', '5518991110046', '68d30a9594728bc39aa24be94b319d21', '2026-10-02 19:17:25'),
	(49, 'paulo_henrique', '5518991110047', '3295c76acbf4caaed33c36b1b5fc2cb1', '2026-10-02 19:17:25'),
	(50, 'renan_sampaio', '5518991110048', 'b5b410068e7d2a8435d045d6174a7810', '2026-10-02 19:17:25'),
	(51, 'julio_cesar', '5518991110049', 'f7177163c833dff4b38fc8da28731176', '2026-10-02 19:17:25'),
	(52, 'beatriz_souza', '5518991110050', '6c8349cc7260ae62e3b1396831a8398f', '2026-10-02 19:17:25'),
	(53, 'Anderson', '18123456', 'asdsadasdsa', '2026-10-14 16:43:24'),
	(54, 'Leonardo', '+5512345', '123456', '2026-10-16 17:05:29');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
