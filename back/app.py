INSERT INTO encurtador.USUARIOS (email, senha) VALUES ('leandro.rn.souza@hotmail.com', '12345678')

INSERT INTO encurtador.LINKS (URL_original, Data, udUser) VALUES ('www.suareceita.com.br/5/mais/2', '2022-09-07', '2')

UPDATE encurtador.LINKS as L set L.URL_encurtada = 'localhost.123' where idLinks = 1

SELECT U.idUser 
FROM encurtador.USUARIOS as U
WHERE UPPER(U.email) = 'leandro.rn.souza@hotmail.com' and UPPER(U.senha) = '12345678'

SELECT U.idUser 
FROM encurtador.USUARIOS as U
WHERE UPPER(U.email) = 'jason@hotmail.com' and UPPER(U.senha) = '123456'

SELECT * 
FROM encurtador.LINKS as L
WHERE L.udUser = 1