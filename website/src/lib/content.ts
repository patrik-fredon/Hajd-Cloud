import type { MessageKey } from "@/i18n/translate";

export const GITHUB_REPO = "";
export const GITHUB_URL = "/how";
export const SPONSOR_URL = "/how";
export const SECURITY_URL = "/how";
export const DISCORD_URL = "/how";

export const DOCS_URL = "https://skysend.hajd.cloud/how";
export const INSTANCES_DOCS_URL = `${DOCS_URL}/instances`;
export const CHANGELOG_URL = `${DOCS_URL}/changelog`;
export const CRYPTO_URL = `${DOCS_URL}/developer-guide/crypto/`;
export const ENV_VARS_URL = `${DOCS_URL}/user-guide/configuration/environment-variables`;
export const REVERSE_PROXY_URL = `${DOCS_URL}/user-guide/self-hosting/reverse-proxy`;
export const S3_URL = `${DOCS_URL}/user-guide/configuration/s3`;
export const CLI_URL = `${DOCS_URL}/user-guide/client-cli/`;

/** The page of the official instance that encrypts a sample text step by step. */
export const HOW_IT_WORKS_URL = "https://skysend.hajd.cloud/how";

export const INSTALL_COMMANDS = [
  {
    id: "unix",
    prompt: "$",
    command: "pnpm client:build",
  },
  {
    id: "windows",
    prompt: "PS>",
    command: "pnpm client:build",
  },
] as const;

export const COMPOSE_SNIPPET = `services:
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
      - BASE_URL=http://localhost:3000`;

export const DOCKER_RUN_SNIPPET = `docker run -d --name skysend \\
  -p 3000:3000 \\
  -v ./data:/data \\
  -v ./uploads:/uploads \\
  -e BASE_URL=http://localhost:3000 \\
  hajd-cloud/skysend:latest`;

/** The questions of the FAQ in order, shared by the section and the structured data of the home page. */
export const FAQ_KEYS: { q: MessageKey; a: MessageKey }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
];
