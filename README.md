# 22BFA33068 - Affordmed URL Shortener App

This is a React + TypeScript web application that shortens URLs, tracks statistics, and supports user login via token. It uses Material UI and includes middleware logging for all API requests.

## Features Implemented

- Login with Roll Number and token (stored securely)
- Shorten URLs with optional custom code and expiry
- Stats page showing:
  - Click count
  - Timestamps
  - Location and referrer (if available)
- Redirect handler for short URLs (`/:shortcode`)
- Logger middleware that logs every API request to `/log`
- Material UI styling for clean interface
- Protected routes (redirect to `/login` if token not present)

## How to Run

1. Clone the project  
2. Install dependencies:

```bash
npm install
