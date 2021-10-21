<p align="center">
  <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
</p>

一個簡單的 Nest JS 範例

包含：
- RESTFul API
- Validation
- JWT 驗證 (Middleware)
- Guards (Role 檢查)
- Custom Reposity
- Entity, DTO

## 所需環境

- NodeJS (測試使用為 v15.0.1)

- MySQL >= 5.6 (資料 : [database.sql](./other/database.sql))

## 使用方法

step 1. 匯入資料庫

step 2. 更新資料庫連線設定 `ormconfig.json`

step 3. 啟動

```sh
npm ci
npm run start:dev
```

