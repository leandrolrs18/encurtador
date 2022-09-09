insert_user = """INSERT INTO encurtador.USUARIOS (email, senha) VALUES (%s, %s)"""

insert_urls = """INSERT INTO encurtador.LINKS (URL_original, Data, udUser) VALUES (%s, %s, %s)"""
atualize_urls = """UPDATE encurtador.LINKS as L set L.URL_encurtada = %s where idLinks = %s"""

login_url = """SELECT U.idUser 
FROM encurtador.USUARIOS as U
WHERE UPPER(U.email) = %s and UPPER(U.senha) = %s"""

busca_urls = """SELECT * 
FROM encurtador.LINKS as L
WHERE L.udUser = %s"""