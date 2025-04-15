**ℹ️ Proprietary to Xceltutors | Developed by whysocket (CTO, Xceltutors)**

# 📬 Internal Email Service – Xceltutors

This is an internal email microservice developed by **Xceltutors**, intended for use within a private intranet. It exposes a simple API for sending emails using predefined React templates, as well as discovering available templates and their structure.

---

## 🚀 Features

- **Send Emails**  
  Easily send emails using dynamic React-based templates via a RESTful API.

- **Template Discovery**  
  Discover available templates and view their required properties and types.

- **Environment-Driven Configuration**  
  SMTP and email service configuration are handled via environment variables for flexibility and security.

---

## ⚙️ Getting Started

### ✅ Prerequisites

- [Bun](https://bun.sh/) (JavaScript runtime)
- Node.js & npm (used for dependency installation)

### 📦 Installation

```bash
# Clone the repository
git clone https://your.repo.url

# Navigate to the project directory
cd internal-email-service

# Install dependencies
bun install
```

---

## 🔐 Configuration

Create a `.env` file in the root of the project and populate it with your SMTP/email settings:

```dotenv
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false # Set to true if using TLS/SSL
EMAIL_USER=your_username
EMAIL_PASS=your_password
EMAIL_FROM=no-reply@yourdomain.com
```

> ⚠️ Replace placeholder values with your actual email server credentials.

---

## ▶️ Running the Service

```bash
bun run index.ts
```

The server will start and expose the following API endpoints.

---

## 📡 API Endpoints

### `POST /send`

Sends an email using a specified template and dynamic data.

#### ✅ Request Body

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

#### 📥 Response Codes

- `200 OK`: Email sent successfully  
- `400 Bad Request`: Invalid input or missing template data  
- `404 Not Found`: Template does not exist  
- `500 Internal Server Error`: Email sending or template rendering failed

---

### `GET /templates`

Returns a list of available email templates along with their expected property names and types.

#### 📤 Sample Response

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

#### 📥 Response Codes

- `200 OK`: List returned successfully  
- `500 Internal Server Error`: Error accessing or parsing templates

---

## 🏢 Internal Use Only

This microservice is **intended solely for internal use within the Xceltutors intranet**. Please ensure your internal network and security rules allow communication between this service and your organization's other services.