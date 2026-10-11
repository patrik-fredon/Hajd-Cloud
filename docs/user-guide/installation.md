# Installation

This guide covers how to install and run Hajd.Cloud using Docker, and how to install the CLI client for terminal usage.

## Server (Docker)

### Prerequisites

- Docker Engine 20.10+
- Docker Compose v2+ (recommended)

::: tip Multi-Architecture Support
Hajd.Cloud images are available for **AMD64** (x86_64) and **ARM64** (aarch64) architectures.

Supports: Intel/AMD servers, Raspberry Pi 4+, Apple Silicon (M1/M2/M3), AWS Graviton
:::

## Docker Installation

::: code-group

```yaml [Docker Compose]
services:
  skysend:
    image: hajd-cloud/skysend:latest
    container_name: skysend
    restart: always
    ports:
      - "3000:3000"
    volumes:
      - ./data:/data
      - ./uploads:/uploads
    environment:
      - BASE_URL=http://localhost:3000
      # All environment variables: https://skysend.hajd.cloud/how
      # There are a lot of customization options available, so make sure to check the documentation for more details.
```

```bash [Docker Run]
docker run -d \
  --name skysend \
  --restart always \
  -p 3000:3000 \
  -e BASE_URL=http://localhost:3000 \
  -e DATA_DIR=/data \
  -e UPLOADS_DIR=/uploads \
  -v "$(pwd)/data:/data" \
  -v "$(pwd)/uploads:/uploads" \
  hajd-cloud/skysend:latest
```

:::

### Start & Access

```bash
docker compose up -d
```

Hajd.Cloud is now running at [http://localhost:3000](http://localhost:3000).

## Environment Variables

All environment variables are optional. Hajd.Cloud works out of the box with sensible defaults.

→ See the full **[Environment Variables](/user-guide/configuration/environment-variables)** reference for all options, default values and descriptions.

## Volume Mounts

| Mount Point | Required | Purpose                                                                      |
| :---------- | :------: | :--------------------------------------------------------------------------- |
| `/data`     |    ✅    | Database and persistent data. Also holds `/data/branding` for your own logo. |
| `/uploads`  |    ✅    | Encrypted file storage.                                                      |

::: warning Data Persistence
Always mount both `/data` and `/uploads` to host directories. Without volumes, all uploads and database state are lost when the container is recreated.
:::

## Health Check

Hajd.Cloud includes a built-in Docker health check:

```bash
curl http://localhost:3000/api/health
```

Response:

```json
{
  "status": "ok",
  "version": "2.11.3",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

The health check runs every 30 seconds. Docker marks the container as `unhealthy` if 3 consecutive checks fail.

## CLI Client

The Hajd.Cloud CLI client lets you upload and download files from the terminal with the same end-to-end encryption as the web interface. It is a standalone binary with no runtime dependencies.

### Linux / macOS

```bash
pnpm client:build
```

### Windows (PowerShell)

```powershell
pnpm client:build
```

### Verify Installation

```bash
skysend --version
skysend --help
```

See the full [CLI Client documentation](/user-guide/client-cli/) for setup, configuration, and all available commands.

## Next Steps

- [First Steps](/user-guide/first-steps) - Upload your first file
- [Docker Setup](/user-guide/self-hosting/docker) - Advanced Docker configuration
- [Reverse Proxy](/user-guide/self-hosting/reverse-proxy) - Set up Nginx, Caddy, or Traefik
- [Rate Limiting & Quotas](/user-guide/configuration/rate-limiting) - Configure upload quotas
