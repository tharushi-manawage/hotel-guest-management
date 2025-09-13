# Hotel Guest Management (Mini Project)

## Overview
Simple Guest Management module (React + TypeScript frontend; PocketBase backend).

## Setup

### Backend (PocketBase)
1. Download pocketbase binary from https://pocketbase.io/ and put it in `server/`.
2. Run server:
```cd server```
```./pocketbase serve```
4. Open admin UI at `http://127.0.0.1:8090` and create admin user.
5. Create collection `guests` with fields described in the project spec (first_name, last_name, email (unique), phone, address, date_of_birth).
6. Run `node seed.mjs` to add sample records.

### Frontend
```cd client```
```npm install```
```npm run dev```
Open the URL printed by Vite (http://localhost:5173).

## PocketBase admin credentials
Set admin email/password when first launch the PocketBase server:
```PB_URL=http://127.0.0.1:8090```
```ADMIN_EMAIL=admin@example.com```
```ADMIN_PASS=Admin```
