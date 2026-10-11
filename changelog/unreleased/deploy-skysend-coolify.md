### ✨ Features

- **web**: Add the Crimson palette with burgundy surfaces, red actions and light, dark and system color schemes.

- **web**: Add complete Czech and Slovak translations with language selection, browser detection and grammatical plural forms.
- **server**: Use the configured custom logo as the browser tab icon.

### 🐛 Bug Fixes

- **web**: Restore the approved generated Hajd.Cloud logo across the header, browser tab, installable app icons and link previews.

- **docker**: Use path-style Cloudflare R2 URLs so browser downloads are allowed by the Content Security Policy.

### 🎨 Improvements

- **web**: Use Hajd.Cloud in every locale, template export and installable app asset.
- **server**: Default new instances to the Hajd.Cloud title and Crimson theme.

- **web**: Add a custom Hajd.Cloud logo for the header and browser tab.
- **docker**: Open Hajd.Cloud directly in the text note editor.

### 🗑️ Removed

- **client**: Require a configured release endpoint instead of checking the upstream repository for updates.
- **infra**: Stop publishing upstream repository and sponsor identities in release helpers.

- **web**: Remove the upstream security contact asset.

- **web**: Remove upstream documentation links from errors.
- **website**: Remove public author credits, repository widgets and upstream service links.
- **docs**: Remove upstream project links and publisher credits from published documentation.

- **web**: Remove the source code link from the footer.

### 📝 Documentation

- **docs**: Document path-style R2 downloads and recovery after a failed download exhausts its limit.

### 🔧 CI/CD

- **docker**: Configure deployment behind the custom Traefik proxy with Cloudflare R2 storage and public file, note and file request services.
- **docker**: Build the localized frontend on the pinned official runtime image.
