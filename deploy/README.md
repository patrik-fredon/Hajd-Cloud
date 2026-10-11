# Hajd.Cloud deployment

The Coolify service runs on server 003 behind the host's custom Traefik proxy and Cloudflare Tunnel. Keep the Coolify Domains field empty because the Compose labels define the route. Apply `traefik-tunnel-forwarded-headers.patch` to the host proxy and `r2-cors.json` to the bucket.

## Localized image

The deployment image adds the Czech and Slovak frontend and customized footer to a content-addressed v3.0.0 runtime. It also replaces the HTML renderer so the configured logo appears in the browser tab. Build the server and frontend from this checkout before creating the image:

```bash
pnpm --filter @skysend/server --filter @skysend/web build
docker build -f deploy/Dockerfile.localized -t hajd-cloud/skysend:v3.0.0-entry.1 .
```

Make that image available in the Docker daemon on server 003 before restarting the service. `pull_policy: never` keeps Coolify from replacing the local image. Load the verified runtime image into the local Docker daemon before building. The Dockerfile addresses it by its immutable SHA256 image ID. Update that ID only after verifying a replacement runtime, rebuild the frontend, and repeat the browser download check.

Enter S3 credentials in Coolify's environment variables. Never put them in Git. Use `S3_FORCE_PATH_STYLE=true` for this R2 endpoint so presigned downloads stay on the origin allowed by the application's CSP.

The named `/data` volume contains the database and encrypted notes. Retain it when replacing the container. File ciphertext is stored in R2.

The home page opens the text note editor with `DEFAULT_TAB=text`. The generated logo variant is `branding/hajd_cloud_logo_crimson.webp`. It is bundled as `/hajd-cloud-logo-crimson.webp` and does not require a persistent volume copy. Set `CUSTOM_LOGO=/hajd-cloud-logo-crimson.webp` to use it in the header and browser tab. The transparent WebP asset was generated with the built-in image generator. Its recoloring prompt and export metadata are recorded in `branding/crimson-export.json`.

## Browser verification

Create a test share with a single allowed download, open it in a browser, download it, and compare the saved file with the original bytes. An API-only test does not exercise CSP, CORS or Service Worker streaming. Check Czech and Slovak in the language menu, then reload to verify that the selected language persists.

## Crimson branding

Set `CUSTOM_TITLE=Hajd.Cloud`, `DEFAULT_THEME=crimson` and `DEFAULT_COLOR_SCHEME=system`. The header offers Light, Dark and System. Set `CUSTOM_LOGO=/hajd-cloud-logo-crimson.webp` and `CUSTOM_OG_IMAGE=/hajd-cloud-logo-crimson.webp` for the Crimson recoloring of the approved generated cloud, document and padlock logo. The bundled fallback logo, browser icon, installable app icons and preview image use this same artwork. The distinct WebP URL avoids cached earlier branding assets. The localized image overlays the compiled configuration defaults as well as the HTML renderer. Package namespaces, crypto derivation labels and persisted storage identifiers remain compatible with existing shares.

## Simple note entry

Text notes start with a wider responsive editor. The Advanced button in the note settings reveals formatting, the optional title and block management. Toggling it preserves every draft value and added block. File uploads, request templates, reading existing notes and specialized block defaults keep their existing controls.
