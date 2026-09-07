# JH Project Footer — v1.0.4

Canonical shared dark maker footer for Jay Hilwig projects.

## Current projects

- Tabum — https://tabum.org
- White House War — https://whitehousewar-production.up.railway.app/
- EatSafely — https://eatsafely.org
- Thurston Mobile Notary — https://thurstonnotary.com/
- DocuFormer — URL pending

## Local development

If another project is already using port 3000:

```powershell
cd C:\Users\Jayhilwig\PROJECTS\footer
$env:PORT=3001
npm start
```

Open:

```text
http://localhost:3001
```

## Railway

Create this as its own Railway project/service.

Recommended flow:

```text
C:\Users\Jayhilwig\PROJECTS\footer
        ↓
GitHub repo
        ↓
new Railway project
        ↓
footer.jhilwig.com
```

Railway start command:

```text
npm start
```

Recommended custom domain:

```text
footer.jhilwig.com
```

Verify:

```text
https://footer.jhilwig.com/
https://footer.jhilwig.com/jh-footer.min.js
```

## Production install

Use the minified script.

### EatSafely

```html
<script defer src="https://footer.jhilwig.com/jh-footer.min.js"></script>
<jh-project-footer project="eatsafely"></jh-project-footer>
```

### White House War

```html
<script defer src="https://footer.jhilwig.com/jh-footer.min.js"></script>
<jh-project-footer project="whitehousewar"></jh-project-footer>
```

### Tabum

```html
<script defer src="https://footer.jhilwig.com/jh-footer.min.js"></script>
<jh-project-footer project="tabum"></jh-project-footer>
```

### Thurston Mobile Notary

```html
<script defer src="https://footer.jhilwig.com/jh-footer.min.js"></script>
<jh-project-footer project="notary"></jh-project-footer>
```

### DocuFormer

```html
<script defer src="https://footer.jhilwig.com/jh-footer.min.js"></script>
<jh-project-footer project="docuformer"></jh-project-footer>
```

## Next.js

For Next.js projects, mount the custom element at the bottom of the root layout and load the remote script once.

A Codex implementation can use `next/script` or an equivalent script element. The component itself does not require React state.

## Production behavior

- Shadow DOM isolates footer styling from host-site CSS
- Dark maker bar stays visually consistent across projects
- Responsive desktop/mobile labels
- External links open in new tabs/windows
- Screen-reader text announces new-tab behavior
- Keyboard focus styles included
- `prefers-reduced-motion` respected
- Opening the project index scrolls to the new document bottom so the expanded content is visible
- No external font downloads
- CORS enabled
- JS cache: 5 minutes, with stale-while-revalidate
- HTML cache: 1 minute
- Demo page is `noindex`

## CSP note

If a host site later uses a restrictive Content Security Policy, allow:

```text
https://footer.jhilwig.com
```

under `script-src`.

## Update flow

Once all sites use the Railway-hosted script:

```text
edit footer
→ test locally
→ git commit
→ git push
→ Railway deploys
→ all sites pick up the update
```

No project repo changes are needed for ordinary footer content/style updates.
