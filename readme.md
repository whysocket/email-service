# Internal Email Service - From Xceltutors

This is a simple internal email service, developed by the Xceltutors company, designed for use within an intranet environment. It provides an external API to send emails using pre-defined React email templates and to discover these templates.

## Features

* **Send Emails:** An API endpoint to send emails to specified recipients using dynamic React email templates.
* **Template Discovery:** An API endpoint to list available email templates and their expected property names and types.
* **Environment-Based Configuration:** Email server settings are configured via environment variables for flexibility.

## Getting Started

### Prerequisites

* Bun (JavaScript runtime) installed.
* Node.js and npm (for installing dependencies).

### Installation

1.  Clone the repository (if applicable).
2.  Navigate to the project directory in your terminal.
3.  Install dependencies:
    ```bash
    bun install
    ```

### Configuration

1.  Create a `.env` file in the root of your project.
2.  Configure the email server settings in the `.env` file:
    ```dotenv
    EMAIL_HOST=your_smtp_host.com
    EMAIL_PORT=your_smtp_port
    EMAIL_SECURE=false # Set to true for secure connections
    EMAIL_USER=your_smtp_username
    EMAIL_PASS=your_smtp_password
    EMAIL_FROM=your_sending_email@yourdomain.com
    ```
    **Replace the placeholder values with your intranet email server details.**

### Running the Service

```bash
bun run index.ts
```

The service will start, and the API endpoints will be available.

## API Endpoints

### `POST /send`

Sends an email based on the provided template and data.

**Request Body:**

```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "template": {
    "name": "WelcomeEmail",
    "data": {
      "username": "John Doe"
    }
  }
}
```

**Response:**

* `200 OK`: `{ "status": "Email sent" }`
* `400 Bad Request`: For invalid request data or missing template component.
* `404 Not Found`: If the specified email template is not found.
* `500 Internal Server Error`: For issues during email sending or template loading.

### `GET /templates`

Lists the available email templates and their expected property names and types (extracted from TypeScript interfaces/types within the template files). **Note:** Default values for properties are not included in this response.

**Response:**

```json
[
  {
    "name": "WelcomeEmail",
    "props": [
      {
        "name": "username",
        "type": "string"
      }
    ]
  },
  {
    "name": "Notification",
    "props": [
      {
        "name": "message",
        "type": "string"
      },
      {
        "name": "link",
        "type": "string"
      }
    ]
  }
]
```

**Response:**

* `200 OK`: An array of template information.
* `500 Internal Server Error`: If there's an error reading the templates directory.

## Internal Use

This service, developed by **Xceltutors company**, is intended for internal communication within the intranet. Ensure that the network is properly configured to allow communication between the service and the external API consumers within your organization.
```