# express-blog-api-crud

# inizialization

    - npm install
    - create .env file containing PORT = 3000 (arbitrary value)
    - create inside "public" a folder named "uploads"
    - the homepage is {host}:PORT -> example: http://localhost:3000

# .env

PORT= #### -> valore arbitrario consigliato 3000

# api doc

endpoints GET methods: - "/posts": index - "/posts/?[id, contenuto, immagine, tags]: index.
Vuoi strict filtering? : aggiungere nella query string come ultimo param "filter=strict" - "/posts/:id" : show

# per upload di foto personali in nuove cards nella homepage

    - creare una cartella "uploads" dentro "public"
    - questa cartella conterrà le vostre foto che rimarranno salvate nel progetto
    - assicurarsi di gitignorare l'intera cartella uploads
