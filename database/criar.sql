INSERT INTO tbl_paises (nome, sigla, moeda, simbolo_de_moeda, bandeira) VALUES
    ('Estados Unidos', 'USA', 'Dólar Americano', '$', 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'),
    ('Japão', 'JP', 'Iene', '¥', 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg'),
    ('Polônia', 'PL', 'Zloty', 'zł', 'https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg'),
    ('Brasil', 'BR', 'Real', 'R$', 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg');

INSERT INTO tbl_sexo (nome, sigla) VALUES
    ('Masculino', 'M'),
    ('Feminino', 'F'),
    ('Outro', 'O');


INSERT INTO tbl_tipo_pagamento (tipo, logo) VALUES
    ('Cartão de Crédito', 'https://example.com/cartao_credito.png'),
    ('Pix', 'https://example.com/pix.png'),
    ('Boleto Bancário', 'https://example.com/boleto.png');


INSERT INTO tbl_plataforma (nome, taxa, logo) VALUES
    ('Steam', 30.00, 'https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg'),
    ('PlayStation 5', 20.00, 'https://upload.wikimedia.org/wikipedia/commons/8/8e/PlayStation_logo.svg'),
    ('Xbox Series X', 20.00, 'https://upload.wikimedia.org/wikipedia/commons/4/43/Xbox_Series_X_logo.svg');


INSERT INTO tbl_genero (nome) VALUES
    ('RPG'),
    ('Aventura'),
    ('Ação'),
    ('Plataforma'),
    ('Terror'),
    ('Estratégia'),
    ('Corrida');


INSERT INTO tbl_empresa (nome, senha_salt, senha_hash, email, data_de_fundacao, biografia, foto, id_paises) VALUES
    ('FromSoftware', 'salt1', 'hash1', 'contato@fromsoftware.jp', '1986-11-01', 'Desenvolvedora japonesa focada em jogos desafiadores.', NULL, 2),
    ('CD Projekt Red', 'salt2', 'hash2', 'contato@cdprojekt.com', '2002-07-01', 'Estúdio polonês conhecido por RPGs complexos.', NULL, 3),
    ('Team Cherry', 'salt3', 'hash3', 'contact@teamcherry.com.au', '2014-01-01', 'Estúdio indie criador de Hollow Knight.', NULL, 1);


INSERT INTO tbl_jogo (nome, data_lancamento, versao, tamanho, descricao, foto_capa, link) VALUES
    -- Elden Ring base
    ('Elden Ring', '2022-02-25', '1.09', '50GB', 'Um vasto mundo aberto com elementos de RPG e ação intensa.', NULL, 'https://en.bandainamcoent.eu/elden-ring/elden-ring'),

    -- DLC de Elden Ring
    ('Elden Ring: Shadow of the Erdtree', '2024-06-21', '1.00', '20GB', 'Expansão da história com novas áreas e desafios.', NULL, 'https://en.bandainamcoent.eu/elden-ring/elden-ring-shadow-erdtree'),

    -- Outros jogos
    ('The Witcher 3: Wild Hunt', '2015-05-19', '1.32', '60GB', 'Jogo de RPG com narrativa envolvente em mundo aberto.', NULL, 'https://thewitcher.com/en/witcher3'),
    ('Hollow Knight', '2017-02-24', '1.4', '9GB', 'Jogo metroidvania com arte desenhada à mão.', NULL, 'https://www.hollowknight.com/'),
    ('Outlast', '2013-09-04', '1.0', '5GB', 'Jogo de terror psicológico em primeira pessoa.', NULL, 'https://redbarrelsgames.com/games/outlast/'),
    ('Forza Horizon 5', '2021-11-09', '1.0', '100GB', 'Jogo de corrida em mundo aberto com carros realistas.', NULL, 'https://forza.net'),
    ('Civilization VI', '2016-10-21', '1.0', '12GB', 'Jogo de estratégia baseado em turnos.', NULL, 'https://civilization.com/');


INSERT INTO tbl_dlc (id_jogo_principal, id_jogo_dlc) VALUES
    (1, 2); -- Elden Ring -> Shadow of the Erdtree


INSERT INTO tbl_jogo_genero (id_jogo, id_genero) VALUES
    (1, 1), -- Elden Ring -> RPG
    (1, 2), -- Elden Ring -> Aventura
    (2, 1), -- Shadow of the Erdtree -> RPG
    (3, 1), -- The Witcher 3 -> RPG
    (3, 2), -- The Witcher 3 -> Aventura
    (4, 4), -- Hollow Knight -> Plataforma
    (4, 2), -- Hollow Knight -> Aventura
    (5, 5), -- Outlast -> Terror
    (6, 7), -- Forza -> Corrida
    (7, 6); -- Civilization VI -> Estratégia


INSERT INTO tbl_jogo_plataforma (id_plataforma, id_jogo) VALUES
    (1, 1), (2, 1), (3, 1),
    (1, 2), (2, 2),
    (1, 3), (2, 3), (3, 3),
    (1, 4),
    (1, 5),
    (1, 6), (3, 6),
    (1, 7);


INSERT INTO tbl_publicacao_jogo_da_empresa (data_de_publicacao, id_empresa, id_jogo) VALUES
    ('2022-02-25', 1, 1),
    ('2024-06-21', 1, 2),
    ('2015-05-19', 2, 3),
    ('2017-02-24', 3, 4);


INSERT INTO tbl_usuario (nome, sobrenome, senha_salt, senha_hash, email, data_de_nascimento, biografia, foto, id_sexo, id_paises)
    VALUES
    ('Lucas', 'Ferreira', 'salt1', 'hash1', 'lucas@email.com', '2000-05-12', 'Amante de RPGs e aventuras.', NULL, 1, 4),
    ('Mariana', 'Yamamoto', 'salt2', 'hash2', 'mariana@email.com', '1998-11-20', 'Fã de jogos de terror e estratégia.', NULL, 2, 2),
    ('André', 'Kowalski', 'salt3', 'hash3', 'andre@email.com', '2002-07-03', 'Apaixonado por jogos de corrida.', NULL, 1, 3);


INSERT INTO tbl_compra (data_de_compra, id_usuario, id_jogo, id_plataforma, id_tipo_pagamento)
    VALUES
    ('2022-03-01', 1, 1, 1, 1), -- Lucas comprou Elden Ring no PC (Steam) com Cartão
    ('2022-06-10', 1, 2, 1, 2), -- Lucas comprou DLC via Pix
    ('2015-06-01', 2, 3, 2, 1), -- Mariana comprou Witcher 3 no PS5
    ('2023-01-10', 3, 6, 3, 3); -- André comprou Forza no Xbox com boleto


INSERT INTO tbl_conquista (nome, descricao, foto, id_jogo)
    VALUES
    ('Derrote Margit', 'Vença o chefe Margit em Elden Ring.', NULL, 1),
    ('Final verdadeiro', 'Complete Hollow Knight com o final verdadeiro.', NULL, 4),
    ('Campeão mundial', 'Vença todos os campeonatos em Forza Horizon 5.', NULL, 6);


INSERT INTO tbl_usuario_conquista (id_usuario, id_conquista, data_de_conquista)
    VALUES
    (1, 1, '2022-03-10'), -- Lucas derrotou Margit
    (3, 3, '2023-03-01'); -- André venceu todos os campeonatos em Forza


INSERT INTO tbl_avaliacao (id_usuario, id_jogo, nota, comentario, data_avaliacao)
    VALUES
    (1, 1, 9, 'Excelente mundo aberto e combate viciante!', '2022-03-15'),
    (2, 3, 10, 'Melhor RPG da década, narrativa impecável.', '2015-06-10'),
    (2, 5, 8, 'Muito assustador, mas às vezes repetitivo.', '2020-10-31'),
    (3, 6, 9, 'Ótimos gráficos e jogabilidade fluida.', '2023-01-20');


INSERT INTO tbl_preco (id_jogo, id_plataforma, id_paises, id_tipo_pagamento, preco)
    VALUES
    -- Elden Ring
    (1, 1, 4, 1, 249.90), -- BR, Steam, Cartão
    (1, 1, 4, 2, 239.90), -- BR, Steam, Pix
    (1, 1, 1, 1, 59.99),  -- EUA, Steam, Cartão

    -- Witcher 3
    (3, 2, 4, 1, 149.90), -- BR, PS5, Cartão
    (3, 2, 1, 1, 49.99),  -- EUA, PS5, Cartão

    -- Forza
    (6, 3, 4, 3, 299.90), -- BR, Xbox, Boleto
    (6, 3, 1, 1, 59.99);  -- EUA, Xbox, Cartão
