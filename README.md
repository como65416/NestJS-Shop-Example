<p align="center">
  <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
</p>

a simple Nest JS project

Use：
- RESTFul API
- Validation
- JWT validation (Middleware)
- Guards (Role Check)
- Error Handler (Filter)
- Custom Repository
- Entity, DTO, Relation
- E2E test (alternative by SQLite)
- API doc (Swagger)
- Inject request id to logger example (`@Injectable({ scope: Scope.REQUEST })`)

## Environment

- NodeJS (has been tested on Node.js v15.0.1)

- MySQL >= 5.6 (Dataset : [database.sql](./other/database.sql))

## Usage

step 1. import database

step 2. set up `ormconfig.json`

step 3. install packages

```sh
npm ci
```

### Develop

```sh
npm run start:dev
```

### Build and Run as Production

```sh
npm run build
node --enable-source-maps dist/main.js
```

### Other

- [postman file](./other/postman_collection.json)

