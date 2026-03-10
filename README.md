# lindsaybalfour.com

Source code for [lindsaybalfour.com](https://lindsaybalfour.com) — Lindsay Balfour's personal portfolio site.

## How the site works

The site is built with [Hugo](https://gohugo.io/), a static site generator. This means:

- You write content in plain text files (Markdown)
- Hugo combines those files with design templates to produce a finished website
- The finished site is a folder of plain HTML files that get published automatically

## Where content lives

All the editable content is in the `content/` folder:

| File/folder | What it controls |
|---|---|
| `content/about.md` | The About page |
| `content/work.md` | The Work landing page |
| `content/resume.md` | The Resume page |
| `content/event/` | Individual event/gathering entries |
| `content/art/` | Art gallery entries |
| `content/project/` | Project entries |

Each file starts with a block of metadata (called "front matter") between `---` lines, followed by the page text in Markdown. For example:

```
---
title: "My Event"
date: 2024-01-01
---

This is the description of the event.
```

## Adding or editing content

**To edit an existing page:** Open the `.md` file in `content/` and change the text below the front matter.

**To add a new event or project:** Create a new folder inside `content/event/` (or `content/project/`), and add an `index.md` file inside it. To include an image, put it in the same folder and name it `cover.jpg` (or `cover.png`).

## HTML templates

Templates control the design and layout of each page — the navigation, the visual structure, the fonts and colours. They live in the `layouts/` folder and are written in HTML. You wouldn't normally edit these to update content, but you would edit them to change how a page looks or is structured.

| File | What it controls |
|---|---|
| `layouts/_default/baseof.html` | The outer shell shared by every page: `<head>`, meta tags, navigation, footer |
| `layouts/index.html` | The home page layout |
| `layouts/_default/about.html` | The About page layout |
| `layouts/_default/work.html` | The Work page layout |
| `layouts/page/resume.html` | The Resume page layout |
| `layouts/_default/single.html` | Default layout for any individual event, project, or art entry |
| `layouts/_default/list.html` | Default layout for section index pages (e.g. a list of events) |
| `layouts/partials/header.html` | The site header/navigation (included in baseof) |
| `layouts/partials/footer.html` | The site footer (included in baseof) |

The styles (colours, typography, spacing) are written in SCSS and live in `assets/scss/`. `main.scss` covers most pages; `brand.scss` is used only by the home page.

## How publishing works

The site publishes automatically — you never need to manually upload files or trigger a deploy.

Here's what happens when you push a change to the `main` branch on GitHub:

1. **GitHub notices the change** and starts an automated process (called a GitHub Actions workflow)
2. **The site is built** — Hugo combines your content files with the design templates to produce finished HTML
3. **The finished files are published** to GitHub Pages, which hosts the live site at lindsaybalfour.com

The whole process takes about a minute. You can watch it happen in real time under the **Actions** tab in the GitHub repository. A green checkmark means it succeeded; a red X means something went wrong and the previous version of the site is still live.

Changes to any branch *other than* `main` do not affect the live site, so it's safe to work on a branch and review before merging.

## Running locally

```bash
hugo server
```

Open `http://localhost:1313` in a browser. The page reloads automatically when you save a file.
