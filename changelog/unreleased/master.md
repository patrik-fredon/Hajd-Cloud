### ✨ Features

- **web**: Add the Crimson palette with neutral surfaces, burgundy actions and light, dark and system color schemes.
- **web**: Add complete Czech and Slovak translations with language selection, browser detection and grammatical plural forms.
- **server**: Use the configured custom logo as the browser tab icon.

### 🐛 Bug Fixes

- **web**: Restore the approved generated Hajd.Cloud logo across the header, browser tab, installable app icons and link previews.
- **docker**: Use path-style Cloudflare R2 URLs so browser downloads are allowed by the Content Security Policy.
- **web**: The header stays in place when switching between pages on a computer that always shows scrollbars.
- **web**: Taps and tab switches on iPhones and iPads respond right away again instead of hanging for seconds.
- **website**: The site no longer freezes for seconds on iPhones and iPads, and taps there respond right away. On these devices the feature strips move again and plain frames replace the spinning borders.
- **web**: Remove visible seams in the page background and keep the sharing layout stable when switching between files and notes.

### 🎨 Improvements

- **web**: Use Hajd.Cloud in every locale, template export and installable app asset.
- **server**: Default new instances to the Hajd.Cloud title and Crimson theme.
- **web**: Add a custom Hajd.Cloud logo for the header and browser tab.
- **docker**: Open Hajd.Cloud directly in the text note editor.
- **web**: Start text notes with a larger editor and keep formatting, titles and block management behind an Advanced toggle without losing drafts.
- **web**: Match the generated logo, browser icon and installable app icons to the Crimson palette.
- **docs**: Use the Crimson logo in documentation branding.
- **website**: Use the Crimson logo in website branding.
- **web**: Use neutral light and graphite dark surfaces with restrained burgundy accents and a continuous subtle security pattern.
- **web**: Simplify the generated cloud logo to a standalone padlock with transparent surroundings and refresh browser and app icons.

### 🔄 Changed

- **docker**: Move the primary deployment to hajd.cloud while preserving existing links on the previous hostname.
- **website**: Update public links and default site metadata to hajd.cloud.

### 🗑️ Removed

- **client**: Require a configured release endpoint instead of checking the upstream repository for updates.
- **infra**: Stop publishing upstream repository and sponsor identities in release helpers.
- **web**: Remove the upstream security contact asset.
- **web**: Remove upstream documentation links from errors.
- **website**: Remove public author credits, repository widgets and upstream service links.
- **docs**: Remove upstream project links and publisher credits from published documentation.
- **web**: Remove the source code link from the footer.
- **website**: Remove empty contributor and repository counter components and obsolete logo variants.

### 📝 Documentation

- **docs**: Document path-style R2 downloads and recovery after a failed download exhausts its limit.
- **docs**: Update deployment links and document the domain migration, browser-local settings and master branch workflow.

### 🧪 Tests

- **server**: Tests for errors in the middle of an upload, like a storage or database failure at the start or the finalize, for the session layer of chunked uploads and for the inbox and WebSocket paths of file requests.
- **client**: Tests for a temporary file that cannot be created, a stream that delivers text and a file name with an extension too long to keep.
- **web**: Cover basic note submission, preserved advanced drafts and required password protection.

### 🔧 CI/CD

- **docker**: Configure deployment behind the custom Traefik proxy with Cloudflare R2 storage and public file, note and file request services.
- **docker**: Build the localized frontend on the pinned official runtime image.
- **infra**: Consolidate development and pull request checks on the master branch and remove the unused worker workspace glob.
- **infra**: The build of a pull request into `main` waits for one approval instead of one per Docker image and CLI binary, so a run sends a single review request.
