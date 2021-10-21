# jwp

jwp college projects

## Installation

```bash
# install npm packages
npm install
```

Alterar URL de coneção do mongodb no arquivo **.example.env**.

## Run

```bash
# run project on development mode
npm run start:dev
```

```bash
# run project on development mode
npm run start
```

> É necessário copiar o arquivo **.example.env** e nomealo **.env**.
> Neste novo arquivo deve ser alterada as variaveis de ambiente de produção.

## Index

1.  [Authentication](#Authentication)
2.  Users
    1.  [GET /api/users](#list-users)
    2.  [POST /api/users](#create-user)
    3.  [GET /api/users/:_id](#get-user)
    4.  [PUT /api/users/:_id](#update-user)
    5.  [DELETE /api/users/:_id](#delete-user)
2.  Comics
    1.  [GET /api/comics](#list-comics)
    2.  [POST /api/comics](#create-comic)
    3.  [GET /api/comics/:_id](#get-comic)
    4.  [PUT /api/comics/:_id](#update-comic)
    5.  [DELETE /api/comics/:_id](#delete-comic)
3.  Chapters
    1.  [GET /api/chapters](#list-chapters)
    2.  [POST /api/chapters](#create-chapter)
    3.  [GET /api/chapters/:_id](#get-chapter)
    4.  [PUT /api/chapters/:_id](#update-chapter)
    5.  [DELETE /api/chapters/:_id](#delete-chapter)

## API

### Authentication
---

Retorn um token JWT para acesso.

+   **Endpoint:** `/api/auth`

+   **Method:** `POST`

+   **Body:**

```json
{
    "email": "pedro@email.com",
    "password": "123456"
}
```

+   **Success Response:**
    - Status: `200`
    - Content: `{ "token": "eyJhb..." }`

+   **Error Response:**
    - Status: `401`
    - Content: `{ "message": "User not found." }`

### List Users
---

Retorna uma lista de usuários.

+   **Endpoint:** `/api/users`

+   **Method:** `GET`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`

> token obtido na rota de autenticação.

+   **Params:**
    -   **page**: page number.
    -   **rpp**: rows per page.
    -   **q**: query string to filter by **name** or **email**.

+   **Success Response:**
    -   Status: `200`
    -   Content:
    
```json
{
    "users": [
        {
            "_id": "615fa88da51a2b1d6f70c2d5",
            "name": "pedrozc90",
            "email": "pedrozc90@email.com",
            "admin": true,
            "__v": 0
        },
        {
            "_id": "615fa8d4a51a2b1d6f70c2da",
            "name": "john",
            "email": "john@email.com",
            "admin": false,
            "__v": 0
        }
    ]
}
```

### Create User
---

Cria um novo usuário e retorna o objeto usuário criado.

+   **Endpoint:** `/api/users`

+   **Method:** `POST`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Body:**

```json
{
    "name": "pedrozc90",
    "email": "pedrozc90@email.com",
    "password": "jwp"
}
```

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "name": "john",
    "email": "john@email.com",
    "password": "123",
    "admin": false,
    "_id": "616b53543098fc9916134c6f",
    "__v": 0
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "User ${{ email }} already registered" }`

### Get User
---

Busca um usuário pelo _id.

+   **Endpoint:** `/api/users/:_id`

+   **Method:** `GET`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "_id": "615fa88da51a2b1d6f70c2d5",
    "name": "pedrozc90",
    "email": "pedrozc90@email.com",
    "password": "jwp",
    "admin": true,
    "__v": 0
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "User ${{ _id }} not found." }`

### Update User
---

Atualiza os campos de um usuário. Retorno o usuário atualizado.

+   **Endpoint:** `/api/users/:id`

+   **Method:** `PUT`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Body:**

```json
{
    "name": "pedrozc90",
    "email": "pedrozc90@email.com",
    "password": "jwp"
}
```

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "name": "john",
    "email": "john@email.com",
    "password": "123",
    "admin": false,
    "_id": "616b53543098fc9916134c6f",
    "__v": 0
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Unable to update user ${{ _id }}." }`

### Delete User
---

Deleta um usuário.

+   **Endpoint:** `/api/users/:id`

+   **Method:** `PUT`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Body:**

```json
{
    "name": "pedrozc90",
    "email": "pedrozc90@email.com",
    "password": "jwp"
}
```

+   **Success Response:**
    - Status: `200`
    - Content: `{ message: "User ${{ _id }} successfully deleted." }`

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Unable to update user ${{ _id }}." }`

### List Comics
---

Return a list of comics.

+   **Endpoint:** `/api/comics`

+   **Method:** `GET`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`

> token obtido na rota de autenticação.

+   **Params:**
    -   **page**: page number.
    -   **rpp**: rows per page.
    -   **q**: query string to filter by **title**.
    -   **status**: filter by status [ "Ongoing", "Dropped", "Completed" ]
    -   **type**: filter by type [ "Manhwa", "Manga" ]
    -   **genre**: filter by genres [ "Action", "Adventure", etc. ]. Can be repeate to pass a array of genres.

> Example: ?page=1&rpp=15&type=Manhwa&status=Ongoing&genre=Action&genre=Adventure&genre=History

+   **Success Response:**
    -   Status: `200`
    -   Content:
    
```json
{
    "comics": [
        {
            "_id": "6168d87544069de7bd57ff6e",
            "url": "https://www.asurascans.com/comics/solo-leveling/",
            "title": "Solo Leveling",
            "type": "Manhwa",
            "status": "Ongoing",
            "genres": [
                "Action",
                "Adventure",
                "Fantasy",
                "Shounen"
            ],
            "authors": [],
            "artists": [],
            "__v": 0
        }
    ]
}
```

### Create Comic
---

Cria um novo quadrinho e retorna o objeto criado.

+   **Endpoint:** `/api/comics`

+   **Method:** `POST`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Body:**

```json
{
    "url": "https://reaperscans.com/series/rankers-return/",
    "title": "Ranker’s Return (Remake)",
    "type": "Manhwa",
    "status": "Ongoing",
    "genres": [
        "Action",
        "Adventure",
        "Comedy",
        "Fantasy",
        "Manhwa",
        "Shounen"
    ],
    "authors": [
        "Yeong Biram (영비람)"
    ],
    "artists": [
        "박준호 (Redice Studio)"
    ]
}
```

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "comic": {
        "url": "https://reaperscans.com/series/rankers-return/",
        "title": "Ranker’s Return (Remake)",
        "type": "Manhwa",
        "status": "Ongoing",
        "genres": [
            "Action",
            "Adventure",
            "Comedy",
            "Fantasy",
            "Manhwa",
            "Shounen"
        ],
        "authors": [
            "Yeong Biram (영비람)"
        ],
        "artists": [
            "박준호 (Redice Studio)"
        ],
        "_id": "616b59d80a9498f8b3a69f4a",
        "__v": 0
    }
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Comic ${{ url }} already registered" }`

### Get Comic
---

Busca um quadrinho pelo _id.

+   **Endpoint:** `/api/comics/:_id`

+   **Method:** `GET`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "_id": "616b59d80a9498f8b3a69f4a",
    "url": "https://reaperscans.com/series/rankers-return/",
    "title": "Ranker’s Return (Remake)",
    "type": "Manhwa",
    "status": "Ongoing",
    "genres": [
        "Action",
        "Adventure",
        "Comedy",
        "Fantasy",
        "Manhwa",
        "Shounen"
    ],
    "authors": [
        "Yeong Biram (영비람)"
    ],
    "artists": [
        "박준호 (Redice Studio)"
    ],
    "__v": 0
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Comic ${{ _id }} not found." }`

### Update Comic
---

Atualiza os campos de um quadrinho e retorna o objeto atualizado.

+   **Endpoint:** `/api/comics/:id`

+   **Method:** `PUT`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Body:**

```json
{
    "url": "https://reaperscans.com/series/rankers-return/",
    "title": "Ranker’s Return (Remake)",
    "type": "Manhwa",
    "status": "Ongoing",
    "genres": [
        "Action",
        "Adventure",
        "Comedy",
        "Fantasy",
        "Manhwa"
    ],
    "authors": [
        "Yeong Biram (영비람)"
    ],
    "artists": [
        "박준호 (Redice Studio)"
    ]
}
```

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "_id": "616b59d80a9498f8b3a69f4a",
    "url": "https://reaperscans.com/series/rankers-return/",
    "title": "Ranker’s Return (Remake)",
    "type": "Manhwa",
    "status": "Ongoing",
    "genres": [
        "Action",
        "Adventure",
        "Comedy",
        "Fantasy",
        "Manhwa",
        "Shounen"
    ],
    "authors": [
        "Yeong Biram (영비람)"
    ],
    "artists": [
        "박준호 (Redice Studio)"
    ],
    "__v": 0
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Unable to update comic ${{ _id }}." }`

### Delete Comic
---

Deleta um usuário.

+   **Endpoint:** `/api/comics/:id`

+   **Method:** `PUT`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Success Response:**
    - Status: `200`
    - Content: `{ message: "Comic ${{ _id }} successfully deleted." }`

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Unable to update comic ${{ _id }}." }`

### List Chapters
---

Return a list of comics.

+   **Endpoint:** `/api/chapters`

+   **Method:** `GET`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`

> token obtido na rota de autenticação.

+   **Params:**
    -   **page**: page number.
    -   **rpp**: rows per page.
    -   **q**: query string to filter by **title**.
    -   **from**: filter chapters by released_at >= **from**
    -   **to**: filter chapters by released_at <=> **to**

> Example: ?page=1&rpp=15&from=2021-09-01&to=2021-10-16

+   **Success Response:**
    -   Status: `200`
    -   Content:
    
```json
{
    "chapters": [
        {
            "_id": "616b15b4a783c14b1a411379",
            "url": "https://www.asurascans.com/solo-leveling-chapter-169/",
            "number": 169,
            "released_at": "2021-10-13T03:00:00.000Z"
        },
        {
            "_id": "616b17e87a61e232504cad88",
            "url": "https://www.asurascans.com/solo-leveling-chapter-168/",
            "number": 168,
            "released_at": "2021-09-22T03:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "616b18147a61e232504cad8c",
            "url": "https://www.asurascans.com/solo-leveling-chapter-167/",
            "number": 167,
            "released_at": "2021-09-15T03:00:00.000Z",
            "__v": 0
        },
        {
            "_id": "616b18257a61e232504cad90",
            "url": "https://www.asurascans.com/solo-leveling-chapter-166/",
            "number": 166,
            "released_at": "2021-09-08T03:00:00.000Z",
            "__v": 0
        }
    ]
}
```

### Create Chapter
---

Cria um novo capítulo e retorna o objeto criado.

+   **Endpoint:** `/api/chapter`

+   **Method:** `POST`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Body:**

```json
{
    "url": "https://www.asurascans.com/solo-leveling-chapter-160/",
    "number": 160,
    "released_at": "2021-07-28T03:00:00.000Z"
}
```
> Sem referenciar o quadrinho.

```json
{
    "url": "https://www.asurascans.com/solo-leveling-chapter-160/",
    "number": 160,
    "released_at": "2021-07-28T03:00:00.000Z",
    "comic": "6168d87544069de7bd57ff6e"
}
```
> Referenciando o quadrinho pelo ObjectID.

```json
{
    "url": "https://www.asurascans.com/solo-leveling-chapter-160/",
    "number": 160,
    "released_at": "2021-07-28T03:00:00.000Z",
    "comic": {
        "_id": "6168d87544069de7bd57ff6e",
        "url": "https://www.asurascans.com/comics/solo-leveling/",
        "title": "Solo Leveling",
        ...
    }
}
```
> Referenciando o quadrinho pelo objeto.

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
            "_id": "616b18797a61e232504cada8",
            "url": "https://www.asurascans.com/solo-leveling-chapter-160/",
            "number": 160,
            "released_at": "2021-07-28T03:10:00.000Z",
            "__v": 0
        }
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Chapter ${{ url }} already registered." }`

### Get Chapter
---

Busca um capitulo pelo _id.

+   **Endpoint:** `/api/chapters/:_id`

+   **Method:** `GET`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "_id": "616b18797a61e232504cada8",
    "url": "https://www.asurascans.com/solo-leveling-chapter-160/",
    "number": 160,
    "released_at": "2021-07-28T03:10:00.000Z",
    "__v": 0
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Chapter ${{ _id }} not found." }`

### Update Chapter
---

Atualiza os campos de um chapter e retorna o objeto atualizado.

+   **Endpoint:** `/api/chaoters/:id`

+   **Method:** `PUT`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Body:**

```json
// _id: 616b18797a61e232504cada8
{
    "url": "https://www.asurascans.com/solo-leveling-chapter-160/",
    "number": 160,
    "released_at": "2021-07-28T03:10:00.000Z"
}
```

+   **Success Response:**
    - Status: `200`
    - Content:
    
```json
{
    "_id": "616b18797a61e232504cada8",
    "url": "https://www.asurascans.com/solo-leveling-chapter-160/",
    "number": 160,
    "released_at": "2021-07-28T03:10:00.000Z",
    "__v": 0
}
```

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Unable to update comic ${{ _id }}." }`

### Delete Chapter
---

Deleta um capitulo.

+   **Endpoint:** `/api/chapters/:_id`

+   **Method:** `PUT`

+   **Headers:**
    -   **Authorization**: `Bearer {{ token }}`
> token obtido na rota de autenticação.

+   **Success Response:**
    - Status: `200`
    - Content: `{ message: "Chapter ${{ _id }} successfully deleted." }`

+   **Error Response:**
    -   Status: `400`
    -   Content: `{ "message": "Unable to update chapter ${{ _id }}." }`
