# command to setup eslint

npm init @eslint/config


# Formatting and lint
npm run lint        # Check code
npm run lint:fix    # Fix issues
npm run format      # Format all code


# Features
	Node.js, Express.js
	•	(DONE) TypeScript (DONE)
	•	(DONE) MongoDB with Mongoose
	•	(DONE) Zod for schema validation
	•	(DONE) Prettier + ESLint (code style & linting)
	•	(DONE) dotenv for environment variables
	•	(DONE) Swagger/OpenAPI for API docs
	•	(DONE) Helmet, CORS, morgan for security/logging
	•	(DONE) JWT Auth (access/refresh tokens)
	•	(DONE) Basic RBAC (Role Based Access Control)
	•	(DONE) Folder structure with Modules
	•	(DONE) Custom error & response handlers
	•	(DONE) Request validation middleware


# Notes
	If you’re using JWT, make sure only userId is stored — and always fetch user + role from DB to get the latest permissions.
    Permissions are dynamic — so changes to the role’s permissions reflect immediately.

# Logger Further Enhancements
	•	Add correlation ID support.
	•	Push logs to an external service (Elastic, Datadog, Loki).
	•	Customize log format (e.g., JSON for prod).
    🧠 Future Ideas
	•	Add correlation ID per request (with UUID).
	•	Add log level config from .env.
	•	Export logs to ELK, Datadog, or Sentry.

⸻

Would you like me to:
	•	Automatically log all uncaught errors or promise rejections?
	•	Add tests for the logger?
	•	Add correlation ID middleware?


# common password for all user
"password": "123456",