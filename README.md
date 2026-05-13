# SABIR7718 WhatsApp Pair API

Simple WhatsApp Pair Code API using Baileys.

## Features

- WhatsApp Pair Code Generator
- Multi Session Support
- Firebase Session Upload
- Auto Session Cleanup
- Fast Express API
- Custom Logging Support
- Temporary Auth Folder System

## Installation

```bash
git clone https://github.com/SABIR7718/whatsapp-pair-api
cd whatsapp-pair-api
npm install
```

## Required Packages

```bash
npm install express @whiskeysockets/baileys pino axios crypto fs path @sabir7718/log
```

## Start Server

```bash
node index.js
```

## API Endpoint

### Generate Pair Code

```http
GET /pair?number=91xxxxxxxxxx
```

## Example Request

```bash
curl "http://localhost:3000/pair?number=91xxxxxxxxxx"
```

## Example Response

```json
{
  "status": true,
  "creator": "SABIR7718",
  "number": "91xxxxxxxxxx",
  "code": "ABCD-EFGH",
  "session_id": "sayan_x_milky_xxxxxxxxx"
}
```

## Root Endpoint

```http
GET /
```

### Response

```json
{
  "creator": "SABIR7718",
  "status": true,
  "message": "Pair API Running"
}
```

## Firebase Structure

```text
zoropair/
 └── session_id
      └── base64_session
```

## Notes

- Enter the pair code inside WhatsApp linked devices.
- Session uploads automatically after successful connection.
- Temporary auth folders are deleted automatically.
- Use valid country code with number.

## Credits

- Baileys
- SABIR7718

## License

MIT License
