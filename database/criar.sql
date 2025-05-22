INSERT INTO tbl_paises (nome, sigla, moeda, simbolo_de_moeda, bandeira) VALUES
    (
        'Estados Unidos', 
        'USA', 
        'Dólar Americano', 
        '$', 
        'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
    ),
    (
        'Japão', 
        'JP', 
        'Iene', 
        '¥', 
        'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg'
    ),
    (
        'Polônia', 
        'PL', 
        'Zloty', 
        'zł', 
        'https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg'
    ),
    (
        'Brasil', 
        'BR', 
        'Real', 
        'R$', 
        'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
    );

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
    ('FromSoftware', 'e01c713d040c4731b08530fcf27ccef7', 'c3a408f5a46d958c0e1686a4598bf95bc6524e012cd3e1a412528a750be04c4414138d0c32b9ee244c52415dd99f67f67d7e0c31e9e435801b7e11d3e88ce5c9', 'contato@fromsoftware.jp', '1986-11-01', 'Desenvolvedora japonesa focada em jogos desafiadores.', 'https://www.adrenaline.com.br/wp-content/uploads/2023/03/fromsoftware1.jpg', 2),
    ('CD Projekt Red', 'e01c713d040c4731b08530fcf27ccef7', 'c3a408f5a46d958c0e1686a4598bf95bc6524e012cd3e1a412528a750be04c4414138d0c32b9ee244c52415dd99f67f67d7e0c31e9e435801b7e11d3e88ce5c9', 'contato@cdprojekt.com', '2002-07-01', 'Estúdio polonês conhecido por RPGs complexos.', 'https://upload.wikimedia.org/wikipedia/pt/d/d0/CDProjekt_2014_logo.svg.png', 3),
    ('Team Cherry', 'e01c713d040c4731b08530fcf27ccef7', 'c3a408f5a46d958c0e1686a4598bf95bc6524e012cd3e1a412528a750be04c4414138d0c32b9ee244c52415dd99f67f67d7e0c31e9e435801b7e11d3e88ce5c9', 'contact@teamcherry.com.au', '2014-01-01', 'Estúdio indie criador de Hollow Knight.', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Team_cherry_Logo_Red.png', 1);


INSERT INTO tbl_jogo (nome, data_lancamento, versao, tamanho, descricao, foto_capa, link) VALUES
    -- Elden Ring base
    ('Elden Ring', '2022-02-25', '1.09', '50GB', 'Um vasto mundo aberto com elementos de RPG e ação intensa.', 'https://store-images.s-microsoft.com/image/apps.30323.14537704372270848.6ecb6038-5426-409a-8660-158d1eb64fb0.08703491-f5dc-4b00-bca6-486b7b293c17?q=90&w=480&h=270', 'https://en.bandainamcoent.eu/elden-ring/elden-ring'),

    -- DLC de Elden Ring
    ('Elden Ring: Shadow of the Erdtree', '2024-06-21', '1.00', '20GB', 'Expansão da história com novas áreas e desafios.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB8NuBEuxyQPvHryc549LN9A2OV6H7UO4xJg&s', 'https://en.bandainamcoent.eu/elden-ring/elden-ring-shadow-erdtree'),

    -- Outros jogos
    ('The Witcher 3: Wild Hunt', '2015-05-19', '1.32', '60GB', 'Jogo de RPG com narrativa envolvente em mundo aberto.', 'https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png', 'https://thewitcher.com/en/witcher3'),
    ('Hollow Knight', '2017-02-24', '1.4', '9GB', 'Jogo metroidvania com arte desenhada à mão.', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Hollow_Knight_first_cover_art.webp/274px-Hollow_Knight_first_cover_art.webp.png', 'https://www.hollowknight.com/'),
    ('Outlast', '2013-09-04', '1.0', '5GB', 'Jogo de terror psicológico em primeira pessoa.', 'https://upload.wikimedia.org/wikipedia/pt/9/9f/Outlast_Cover_Art.jpg', 'https://redbarrelsgames.com/games/outlast/'),
    ('Forza Horizon 5', '2021-11-09', '1.0', '100GB', 'Jogo de corrida em mundo aberto com carros realistas.', 'https://upload.wikimedia.org/wikipedia/pt/d/dc/Capa_de_Forza_Horizon_5.jpg', 'https://forza.net'),
    ('Civilization VI', '2016-10-21', '1.0', '12GB', 'Jogo de estratégia baseado em turnos.', 'https://upload.wikimedia.org/wikipedia/pt/3/3b/Civilization_VI_cover_art.jpg', 'https://civilization.com/');


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


INSERT INTO tbl_usuario (nome, senha_salt, senha_hash, email, data_de_nascimento, biografia, foto_perfil, id_sexo, id_paises)
    VALUES
    ('Lucas Ferreira', '29b94235b4ef57bfd5bcac2d1c337ff4', 'a8a3aaa5e1c3a3f9a572994d9f316673687d4b1927309884096ed4929fbe352aa72aa918a2222d992514b0cfc838dcea12c577a9b7390fe9600b4ad7b625cba7', 'lucas@email.com', '2000-05-12', 'Amante de RPGs e aventuras.', 'https://lncimg.lance.com.br/uploads/2025/01/Lucas-Moura-Bragantino-x-Sao-Paulo-scaled-aspect-ratio-512-320.jpg', 1, 4),
    ('Mariana Yamamoto', '29b94235b4ef57bfd5bcac2d1c337ff4', 'a8a3aaa5e1c3a3f9a572994d9f316673687d4b1927309884096ed4929fbe352aa72aa918a2222d992514b0cfc838dcea12c577a9b7390fe9600b4ad7b625cba7', 'mariana@email.com', '1998-11-20', 'Fã de jogos de terror e estratégia.', 'https://lncimg.lance.com.br/uploads/2025/01/Lucas-Moura-Bragantino-x-Sao-Paulo-scaled-aspect-ratio-512-320.jpg', 2, 2),
    ('André Kowalski', '29b94235b4ef57bfd5bcac2d1c337ff4', 'a8a3aaa5e1c3a3f9a572994d9f316673687d4b1927309884096ed4929fbe352aa72aa918a2222d992514b0cfc838dcea12c577a9b7390fe9600b4ad7b625cba7', 'andre@email.com', '2002-07-03', 'Apaixonado por jogos de corrida.', 'https://lncimg.lance.com.br/uploads/2025/01/Lucas-Moura-Bragantino-x-Sao-Paulo-scaled-aspect-ratio-512-320.jpg', 1, 3);


INSERT INTO tbl_preco (id_jogo, id_plataforma, id_paises, id_tipo_pagamento, valor)
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



INSERT INTO tbl_compra_jogo (data_compra, comprovante, id_usuario, id_preco)
    VALUES
    ('2022-03-01', 'https://meutudo.com.br/blog/wp-content/uploads/2024/09/comprovante-pagamento-pix-nubank.jpg', 1, 3), -- Lucas comprou Elden Ring no PC (Steam) com Cartão
    ('2015-06-01', 'https://meutudo.com.br/blog/wp-content/uploads/2024/09/comprovante-pagamento-pix-nubank.jpg', 2, 5), -- Mariana comprou Witcher 3 no PS5
    ('2023-01-10', 'https://meutudo.com.br/blog/wp-content/uploads/2024/09/comprovante-pagamento-pix-nubank.jpg', 3, 6); -- André comprou Forza no Xbox com boleto

INSERT INTO tbl_conquistas (nome, descricao, id_jogo)
    VALUES
    ('Derrote Margit', 'Vença o chefe Margit em Elden Ring.', 1),
    ('Final verdadeiro', 'Complete Hollow Knight com o final verdadeiro.', 4),
    ('Campeão mundial', 'Vença todos os campeonatos em Forza Horizon 5.', 6);


INSERT INTO tbl_usuario_conquistas (id_usuario, id_conquistas, data_de_conquista)
    VALUES
    (1, 1, '2022-03-10'), -- Lucas derrotou Margit
    (3, 3, '2023-03-01'); -- André venceu todos os campeonatos em Forza


INSERT INTO tbl_avaliacao (id_usuario, id_jogo, pontuacao, comentario)
    VALUES
    (1, 1, 9, 'Excelente mundo aberto e combate viciante!'),
    (2, 3, 10, 'Melhor RPG da década, narrativa impecável.'),
    (2, 5, 8, 'Muito assustador, mas às vezes repetitivo.'),
    (3, 6, 9, 'Ótimos gráficos e jogabilidade fluida.');


