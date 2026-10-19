# FUNfolio

**Live site → [leonardosfunfolio.com](https://leonardosfunfolio.com)**

A personal portfolio website built from scratch with plain HTML, CSS, and JavaScript — no frameworks, no libraries, no templates. It's meant to be a portfolio that's actually fun to use: a button that runs away from you, a whack-a-mole game with a persistent high score, and a working contact form, all wrapped in a responsive layout that holds up from a widescreen monitor down to a phone.

---

## Highlights

- **Zero dependencies.** Every interaction, animation, and layout is hand-written in vanilla HTML/CSS/JS.
- **Whack-a-mole** with three mole types, difficulty scaling, enemy spawning rules, and a high score saved across visits.
- **A working contact form** on a static site, with validation, spam protection, and in-page feedback.
- **Fully responsive** across desktop, tablet, and mobile.
- **Deployed with a custom domain** and automatic redeploys on every push.

---

## Pages

| Page | What's on it |
|---|---|
| **Home** | Animated welcome banner, About Me section, contact form, and a "Browse Projects" button that dodges your cursor |
| **Projects** | Grid of project cards linking to their repos and demos |
| **Game** | Whack-a-mole with score, high score, and a custom hammer cursor |
| **Playlists** | Curated Spotify playlists |

---

## Features in Detail

### The dodging button
The "Browse Projects" button jumps to a random spot on screen each time you click it. Its position is clamped so it never lands behind the fixed header or off the edge of the viewport, and the bounds are recalculated on each click so it stays on screen even after a window resize. After six clicks it gives up, turns red, and stays put. The next click takes you to the Projects page.

### Whack-a-mole
- **Three mole types.** Normal moles are worth +10. Gold moles (1-in-40 chance) are worth +50. Evil moles cost −100, and three evil hits in a session resets your score to zero.
- **Escalating difficulty.** Mole visibility shrinks from 1500 ms to a 400 ms floor as your score rises, reaching max speed at exactly 500 points. The rate was derived from `(start − floor) / (targetScore / interval)` so the curve lands on its cap precisely.
- **Enemy spawning rules.** A new evil mole joins every 150 points, up to a maximum of 8. Each mole runs its own self-perpetuating spawn loop, and a shared free-hole check guarantees no two moles ever occupy the same hole.
- **Persistent high score.** Saved to `localStorage` and updated the instant you set a new record, so it survives refreshes, tab closes, and return visits.
- **Polish.** Custom animated hammer cursor, rise-up animation on each mole, double-click protection on hits, and disabled image dragging/selection so clicks always register as hits.

### Contact form
- Built on a static site using [Web3Forms](https://web3forms.com) as the email backend.
- Native HTML `required` validation enforces name, email, and message before anything is sent.
- Submits in the background with `fetch` and shows inline sending / success / error states instead of redirecting away.
- Hidden honeypot field filters out bot submissions.
- The message box grows as you type and is capped at 2,600 characters.

### Responsive design
- Fluid typography and spacing with `clamp()` and `min()`, using the original desktop sizes as upper bounds.
- `flex-wrap` layouts that reflow project cards from 3 → 2 → 1 per row.
- The game board scales with the viewport while staying square, with percentage-based gaps so spacing stays proportional to the holes.
- Full-bleed section backgrounds with no horizontal overflow.
- Pulse animations use `transform: scale()` instead of animating `font-size`, which keeps them smooth and avoids layout recalculation on every frame.

---

## Tech Stack

| Area | Tools |
|---|---|
| Markup & styling | HTML5, CSS3 (Flexbox, Grid, `clamp()`, keyframe animations, `@font-face`) |
| Interactivity | Vanilla JavaScript (DOM manipulation, events, timers, `fetch`, `localStorage`) |
| Forms | Web3Forms |
| Fonts | Self-hosted WOFF2 ([Monocraft](https://github.com/IdreesInc/Monocraft)) |
| Graphics | SVG (logo and icons designed in Inkscape) |
| Hosting | Vercel, with a custom domain via Porkbun DNS |
| Workflow | Git, GitHub, VS Code, Live Server |

---

## What I Learned

Building this end to end taught me as much about debugging and shipping as it did about writing code. A few lessons that stuck:

- **Script loading order matters.** An early bug crashed the whole script because JavaScript ran before the DOM existed and `getElementById` returned `null`. Loading scripts with `defer` fixed it for the entire file.
- **JavaScript fails quietly in surprising ways.** Duplicate function declarations silently override each other, and naming a variable `status` shadows a legacy `window` property. Both taught me to check for name collisions when something "just isn't doing anything."
- **CSS drops invalid rules without warning.** A single stray space in `scale (1)` silently disabled an entire animation. Now I check values character by character when a style stops applying.
- **The box model is easy to get wrong.** A section set to `width: 100vw` with padding overflowed the page until I switched to `box-sizing: border-box`.
- **"Works on my machine" is a real trap.** My laptop had custom fonts installed, which hid the fact that visitors' devices didn't. I fixed it by self-hosting the fonts with `@font-face`, and converted the text in my SVG logo to vector paths, since an SVG loaded through `<img>` is sandboxed and can't use the page's fonts at all.
- **Static sites still need a server for some things.** Browsers can't send email, so the contact form needed a form backend. That also taught me where the line is between values that are safe to expose in client-side code (a public form key) and true secrets that should never be committed.
- **Testing on a real device catches what the dev tools don't.** Serving the site over my local network to my phone surfaced font, path, and viewport issues before they reached production.
- **Deployment is its own skill.** Setting up the root entry point, fixing case-sensitive file paths, configuring DNS records, and connecting a custom domain were all new to me.

---

## Project Structure

```
funfolio/
├── index.html          # Entry point, redirects to home
├── home/               # Landing page, About Me, contact form
│   ├── home.html
│   ├── home.js
│   └── css/
├── projects/           # Project showcase
├── game/               # Whack-a-mole
├── playlist/           # Spotify playlists
├── img/                # Images, icons, and game sprites
└── fonts/              # Self-hosted WOFF2 fonts
```

Each page folder contains its own HTML, a `css/` folder, and a script where needed.

---

## Running Locally

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Then serve the folder with any local server, for example the VS Code **Live Server** extension or:

```bash
python3 -m http.server 8000
```

and open `http://localhost:8000`.

---

## Credits

- [Monocraft](https://github.com/IdreesInc/Monocraft) by IdreesInc, licensed under the SIL Open Font License 1.1
- Contact form delivery by [Web3Forms](https://web3forms.com)
