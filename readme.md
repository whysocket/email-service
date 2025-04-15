**Proprietary to Xceltutors | Developed by whysocket (CTO, Xceltutors)**

# Internal Email Service – Xceltutors

This is an internal email microservice developed by **Xceltutors**, intended for use within a private intranet. It provides a simple API for sending emails using predefined React templates and for discovering available templates and their structure.

---

## Features

- **Send Emails**  
  Send emails using dynamic React-based templates via a RESTful API.

- **Template Discovery**  
  Discover available templates and view their required properties and types.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) – required JavaScript runtime

### Installation

```bash
# Clone the repository
git clone https://github.com/xceltutors/email-service.git

# Navigate into the project directory
cd email-service

# Install dependencies using Bun
bun install
```

---

## Configuration

Create a `.env` file in the root of the project and set the following values:

```dotenv
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false # Set to true if using TLS/SSL
EMAIL_USER=your_username
EMAIL_PASS=your_password
EMAIL_FROM=no-reply@yourdomain.com
```

Replace the placeholder values with the actual credentials and settings from your intranet email server.

---

## Running the Service

```bash
bun dev
```

Once running, the following API endpoints will be available.

---

## API Endpoints

### POST `/send`

Sends an email using a specified template and input data.

#### Request Body

```json
{
  "to": "recipient@example.com",
  "subject": "Welcome to Xceltutors",
  "template": {
    "name": "WelcomeEmail",
    "data": {
      "username": "John Doe"
    }
  }
}
```

#### Response Codes

- `200 OK`: Email sent successfully  
- `400 Bad Request`: Invalid input or missing template data  
- `404 Not Found`: Template does not exist  
- `500 Internal Server Error`: Email sending or template rendering failed

---

### GET `/templates`

Returns a list of available email templates and their required properties.

#### Example Response

```json
[
  {
    "name": "WelcomeEmail",
    "props": [
      { "name": "username", "type": "string" }
    ]
  },
  {
    "name": "Notification",
    "props": [
      { "name": "message", "type": "string" },
      { "name": "link", "type": "string" }
    ]
  }
]
```

#### Response Codes

- `200 OK`: List returned successfully  
- `500 Internal Server Error`: Error accessing or parsing templates

---

## Internal Use Only

This service is intended for internal communication within the Xceltutors intranet. Ensure your network configuration allows access between this service and any consumers within your internal systems.
