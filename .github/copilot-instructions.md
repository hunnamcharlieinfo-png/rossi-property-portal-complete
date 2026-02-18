<!-- Workspace Copilot Instructions: Rossi Property Portal -->
# Copilot Workspace Instructions

Purpose
- Provide compact, actionable guidance so AI assistants (Copilot/agents) can be productive immediately.

How to use
- This file is read by automated agents and humans. Keep it short and focused on repository conventions, build/deploy commands, and pitfalls.

Project summary
- Static frontend property portal (HTML/CSS/JS) intended for Netlify deployment. Authentication is demo-only (localStorage). No backend included.

Key files and folders
- index.html, login.html, properties.html, favorites.html, profile.html
- css/ — stylesheets (styles.css, auth.css, properties.css)
- js/ — client scripts (main.js, auth.js, properties.js, dashboard.js)
- netlify.toml — Netlify deploy config
- Documentation: README.md, QUICK_START.md, DEPLOYMENT.md, DEBUG_GUIDE.md

Common workflows (what agents may automate)
- Local sanity checks: open index.html in browser; verify assets load
- Deploy to Netlify (from README):

```bash
# install netlify-cli if needed
# npm install -g netlify-cli
# in repo root
netlify deploy --prod
```

Build / test commands
- This repo is static; there are no build steps by default. If tests or bundlers are added, update this file.

Conventions and expectations
- Keep changes minimal and focused; this repo is a static site intended for demo/deployment.
- Authentication is client-side demo only — do not assume secure server-backed auth.

Environment pitfalls
- No backend API present; any server-side integration is out-of-scope until a backend is added.
- Demo credentials are permissive; treat production deployment carefully (set up real auth, DB, and secrets).

Where to look for context
- Start with README.md for deployment options and project overview.
- Use DEPLOYMENT.md and DEBUG_GUIDE.md for environment-specific notes and troubleshooting.

Example agent prompts
- "Run a quick consistency check: ensure all js/ and css/ files referenced in HTML exist and are loadable."
- "Update index.html to add a meta description and open-graph tags for social previews." 
- "Create a small script that validates static file links and reports 404s when served locally." 

Suggested agent customizations to add next
- create-deploy-agent: automate Netlify deploys and post-deploy smoke checks.
- create-link-validator: periodic check that all HTML asset links resolve (use a simple static server + HTTP checks).
- create-doc-sync: keep README, QUICK_START, and DEPLOYMENT in sync; generate toc where missing.

When updating this file
- Preserve the short, pragmatic style. Add only repository-specific instructions and commands. Keep general guidance in separate docs.

Contact
- For questions, refer to README.md or open an issue in the repo.

-- End of instructions --
