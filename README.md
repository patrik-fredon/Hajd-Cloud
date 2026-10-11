# Hajd.Cloud

End-to-end encrypted file and note sharing, with encrypted upload requests. Files, filenames and notes are encrypted in the browser. The decryption key travels in the URL fragment and never reaches the server.

## Features

- Share individual files or multiple files as an encrypted ZIP.
- Compose notes from text, Markdown, password, code and SSH key blocks.
- Ask someone for files, a note, or both through an encrypted request and private inbox.
- Add an optional password and choose expiration and download or view limits.
- Keep links, request templates and form defaults locally in the browser.
- Use the Crimson palette in light, dark or system mode.
- Choose from 15 interface languages: English, Czech, Slovak, German, Spanish, Finnish, French, Italian, Japanese, Norwegian, Dutch, Polish, Brazilian Portuguese, Swedish and Chinese.

There are no application accounts, analytics or trackers. OIDC authentication is optional for self-hosted deployments. Data expires automatically.

## Deployment

The configured deployment runs at [Hajd.Cloud](https://hajd.cloud). See [deployment instructions](deploy/README.md), the [configuration reference](docs/user-guide/configuration/environment-variables.md) and the [R2 configuration guide](docs/user-guide/configuration/s3.md).

Build with Node 24 or newer and pnpm:

```bash
pnpm install --frozen-lockfile
pnpm --filter @skysend/server --filter @skysend/web build
docker build -f deploy/Dockerfile.localized -t hajd-cloud/skysend:v3.0.0-crimson.1 .
```

Use `CUSTOM_TITLE=Hajd.Cloud`, `DEFAULT_THEME=crimson` and `DEFAULT_COLOR_SCHEME=system`. The bundled cloud and lock mark is available at `/logo.svg` and `/logo.png`.

The current deployment uses Cloudflare R2 with path-style presigned URLs, a persistent data volume, and a reverse proxy behind Cloudflare Tunnel. Keep the data volume when replacing the container. Set storage credentials through the deployment environment, never in source files.

## Development and verification

```bash
pnpm dev
pnpm validate
pnpm changelog:check
```

The workspaces contain the React frontend, Hono server, shared encryption and note format libraries, terminal clients, documentation and companion marketing pages. Read [PHILOSOPHY.md](PHILOSOPHY.md) before changing the privacy model.

Package namespaces, crypto derivation labels and persisted storage identifiers remain compatible with existing shares and browser history. These implementation identifiers are not public branding.

## License

[GNU Affero General Public License v3.0](LICENSE).
