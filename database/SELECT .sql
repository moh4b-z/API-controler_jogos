
-- Mostrar todos os jogos de uma empresa
SELECT * 
FROM tbl_jogo 
WHERE id_empresa = 1;


SELECT g.*
FROM tbl_genero g
JOIN tbl_jogo_genero jg ON g.id = jg.id_genero
WHERE jg.id_jogo = 1;

-- Mostrar todos os jogos de um determinado gênero
SELECT j.*
FROM tbl_jogo j
JOIN tbl_jogo_genero jg ON j.id_jogo = jg.id_jogo
WHERE jg.id_genero = 2;


-- Mostrar todos os jogos que um usuário possui (baseado nas compras)
SELECT DISTINCT j.*
FROM tbl_compra c
JOIN tbl_jogo j ON j.id_jogo = c.id_jogo
WHERE c.id_usuario = 1;

-- Mostrar todas as conquistas de um jogo
SELECT * 
FROM tbl_conquista 
WHERE id_jogo = 1;

-- Média e quantidade de avaliações de um jogo
SELECT 
  id_jogo,
  AVG(nota) AS media_avaliacao,
  COUNT(*) AS quantidade_avaliacoes
FROM tbl_avaliacao
WHERE id_jogo = 1
GROUP BY id_jogo;

-- Mostrar todos os jogos lançados em um determinado ano
SELECT *
FROM tbl_jogo
WHERE YEAR(data_de_lancamento) = 2022;

-- Procurar jogos pelo nome
SELECT * 
FROM tbl_jogo
WHERE nome_jogo LIKE 'Eld%';

SELECT * 
FROM tbl_jogo
WHERE nome_jogo LIKE '%eld%';


-- Procurar usuários pelo nome

SELECT * 
FROM tbl_usuario
WHERE nome LIKE 'Mar%';


SELECT * 
FROM tbl_usuario
WHERE nome LIKE '%ana%';

-- Procurar empresas pelo nome
SELECT * 
FROM tbl_empresa
WHERE nome LIKE 'Sony%';

SELECT * 
FROM tbl_empresa
WHERE nome LIKE '%oni%';

-- Buscar ao mesmo tempo por nome de usuário ou empresa

SELECT 'usuario' AS tipo, nome 
FROM tbl_usuario 
WHERE nome LIKE 'Mar%'
UNION
SELECT 'empresa' AS tipo, nome 
FROM tbl_empresa 
WHERE nome LIKE 'Mar%';


SELECT 'usuario' AS tipo, nome 
FROM tbl_usuario 
WHERE nome LIKE '%ari%'
UNION
SELECT 'empresa' AS tipo, nome 
FROM tbl_empresa 
WHERE nome LIKE '%ari%';
