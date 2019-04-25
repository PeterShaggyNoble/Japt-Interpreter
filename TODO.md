# TO-DO LIST
The old wish list can be found at https://hackmd.io/Sqo_dbboR-iXNizDp1vDlg.

The following lists are in no particular order other than what was most likely to be done first at time of writing.

## GENERAL
- [ ] Find out if others are having caching issues with `v.1.4.6` and remove date versioning of CDN files if not.
- [ ] Add more `transition`s.
- [ ] Create Slack workspace.
- [ ] Design a simple Japt logo & icons.
- [ ] Create a web application for Android devices.
- [ ] Fix CSS media query for disabling tooltips on touchscreens (S9). (Or just replace custom tooltips with standard `title` attributes & tags?)
- [ ] Add the ability to prevent programmes from auto running and save setting to `localStorage`.
- [ ] Add pop-up notifications for confirmation & error messages?
- [ ] Investigate the viability of an offline version.

## HEADER
- [ ] Pick an alternative icon for copying Markdown (see: https://materialdesignicons.com/ or https://petershaggynoble.github.io/MDI-Sandbox/).
- [ ] Change icon order to be: copy link, undo, run, redo, copy Markdown.
- [ ] Clip or redraw background `circle`s in `play` icon.
- [ ] Replace chat icon & link with Slack.

## INTERPRETER
- [ ] Replace code's `textarea` with a `contenteditable` element when broader support for `plaintext-only` is available.
- [ ] Decide whether to continue using `localStorage` for output caching, switch to `sessionStorage` or use neither at all.

## HIGHLIGHTER
- [ ] Create custom themes.
- [ ] Create a custom mode to (try to) add syntax highlighting for Japt.

## KEYBOARD
- [ ] Come up with a solution for how to proceed after clicking a key on touchscreens (see https://chat.stackexchange.com/transcript/message/49610491#49610491).
- [ ] Add clipping path to tab.

## COMPRESSOR
- [ ] Add byte counter above the `textarea`, similar to the code's.
- [ ] Replace icon for permutations with `shuffle-variant`?
- [ ] Add support for arrays of strings of equal length.

## DOCUMENTATION
- [x] Add version highlighting for shortcuts & Regular Expressions.
- [ ] Figure out *exactly* what `F.b()` does(!) and add it to `functions.json`.
- [ ] Deemphasise, in some way, methods that are not supported in the currently selected version of Japt and remove highlighting.
- [ ] Collapse the content below each heading in `.html` docs.
- [ ] Add "alias" (array) & "summary" (string) keys to all method JSON files.
- [ ] Add aliases, as a `data` attribute, to each method's heading for search and update `hide` variable in `docs.search.exec()` to include them.
- [ ] Create an alternative design for method sections, allowing all methods to be collapsed to their headings, displaying only the method name, supported version & summary.
- [ ] Figure out if there's a better way to display the type of each method's return value.
- [ ] Add clipping path to tab.
- [ ] Decide whether or not to close documentation after clicking a character to insert.

## PROJECTS
- [ ] Always show the sidebar when the window width is greater than `1200px`(?)?
- [ ] Redesign projects list to allow the addition of icons to:
  - [ ] Copy link
  - [ ] Copy Markdown
  - [ ] Overwrite with current project
  - [ ] Download project
  - [ ] Rename project
- [ ] Add categories with collapsible "folders" (with support for custom icons?)
- [ ] Add clipping path to tab.

## GITHUB REPO
- [ ] Add a `CONTRIBUTING.md` file.
- [ ] Create issue labels.
- [ ] Finish writing `README.md`.

---
<details>
<summary>**COMPLETED**</summary>
	
### GENERAL
- [x] Show keyboard shortcut tooltips when Ctrl key is depressed.
- [x] When a field has focus but no selection, allow Ctrl+C to copy its entire contents.
- [x] Wrap each field in a container to allow them to be individually collapsed.
- [x] Change colours of tooltips.
- [x] Easter Egg: Change `--foreground` of dark theme and `--background` of light theme to `#e9e7e5`.
- [x] Move sidebar tabs to a new bottom bar when window width is below `600px`(?) and increase padding of `main` above that to properly accommodate the tabs.
- [x] Hide tooltips for `:active` icons.
- [x] Add `notranslate` `meta` tag for Google.

### HEADER
- [x] Ctrl+M copies the Markdown.
- [x] Ctrl+L copies the link.
- [x] Change the style of or animate the `play` icon while a programme is running.
- [x] Reduce `height`.
- [x] Move `undo` & `redo` to header.

### INTERPRETER
- [x] Collapse non-essential fields by default.
- [x] Add header & footer fields.
- [x] Return caret to the same position after auto-golfing.
- [x] Ctrl+G runs auto-golf.
- [x] Add `information` icon to open the documentation on flags.
- [x] Reduce the `opacity` of the icon when caching is disabled.
- [x] Replace checkbox for output caching with `cached` icon (or similar).
- [x] Remove `min-height` from code & input fields.
- [x] Move flags field from header.

### HIGHLIGHTER
- [x] Add a toggle to disable syntax highlighting.
- [x] Add syntax highlighting for JavaScript.

### KEYBOARD
- [x] Ctrl+K toggles the keyboard.

### COMPRESSOR
- [x] Add `information` icon to open the compressor's documentation.
- [x] Disable and reduce the `opacity` of the `play` icon while input is invalid.
- [x] Override Ctrl+Enter when compressor field has focus.
- [x] Reduce the `opacity` of the icon when permutations are disabled.
- [x] Add the ability to insert the compressed string directly into code.
- [x] Add support for multi-line strings.
- [x] Separate output from the `textarea` and restyle it.
- [x] Update byte counts in results to factor in multi-byte characters.

### DOCUMENTATION
- [x] Include method names when searching.
- [x] Don't include object names in method names. Instead, wrap the first character in each section's title in `<code>` tags.
- [x] Highlight which methods are and are not supported in the currently selected version of Japt.
- [x] Change the colour used in `text-decoration` for links.

### PROJECTS
- [x] Change wording of import & export icons to upload & download.

## OTHER TOOLS
- [x] Add a "scratchpad" field for writing notes, keeping copies of WIP programmes, etc.
</details>