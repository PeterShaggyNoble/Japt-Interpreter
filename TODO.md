# TO-DO LIST
The old wish list can be found at https://hackmd.io/Sqo_dbboR-iXNizDp1vDlg.

The following lists are in no particular order other than what was most likely to be done first at time of writing.

## GENERAL
- [ ] Find out if others are having caching issues with `v.1.4.6` and remove date versioning of CDN files if not.
- [ ] Create Slack workspace.
- [ ] Design a simple Japt logo & icons.
- [ ] Create a web application for Android devices.
- [ ] Split `main` into collapsible `section`s with headings for the interpreter, compressor & additional, future tools.
- [ ] Fix CSS media query for disabling tooltips on touchscreens (S9).
- [ ] Add the ability to prevent programmes from auto running and save setting to `localStorage`.
- [ ] Add pop-up notifications for confirmation & error messages?
- [x] Add `notranslate` `meta` tag for Google.
- [x] Hide tooltips for `:active` icons.

## HEADER
- [ ] Change the style of or animate the `play` icon while programme is running.
- [ ] Clip or redraw background `circle`s in `play` icon.
- [ ] Pick an alternative icon for copying Markdown (see: https://materialdesignicons.com/ or https://petershaggynoble.github.io/MDI-Sandbox/).
- [ ] Replace chat icon & link with Slack.
- [x] Move `undo` & `redo` to header.

## INTERPRETER
- [ ] Remove `min-height` from code & input fields?
- [ ] Replace checkbox for output caching with `cached` icon (or similar).
- [ ] Reduce the `opacity` of the icon when caching is disabled.
- [ ] Add `information` icon to open the documentation on flags.
- [x] Move flags field from header.

## KEYBOARD
- [ ] Come up with a solution for how to proceed after clicking a key on touchscreens (see https://chat.stackexchange.com/transcript/message/49610491#49610491).
- [ ] Add touch events to allow dragging open or closed.
- [ ] Add clipping path to tab.

## COMPRESSOR
- [ ] Update byte counts in results to factor in multi-byte characters.
- [ ] Separate output from the `textarea` and restyle it.
- [ ] Add byte counter above the `textarea`, similar to the code's.
- [ ] Disable and reduce the `opacity` of the `play` icon while input is invalid.
- [ ] Replace icon for permutations with `shuffle-variant`.
- [ ] Reduce the `opacity` of the icon when permutations are disabled.
- [ ] Add support for arrays of strings of equal length.
- [ ] Add `information` icon to open the compressor's documentation.

## DOCUMENTATION
- [ ] Add a `CONTRIBUTING.md` file.
- [ ] Figure out *exactly* what `F.b()` does(!) and add it to `functions.json`.
- [ ] Include method names when searching.
- [ ] Deemphasise, in some way, methods that are not supported in the currently selected version of Japt and remove highlighting.
- [ ] Collapse the content below each heading in `.html` docs.
- [ ] Add "alias" (array) & "summary" (string) keys to all method JSON files.
- [ ] Add aliases, as a `data` attribute, to each method's heading for search and update `hide` variable in `docs.search.exec()` to include them.
- [ ] Create an alternative design for method sections, allowing all methods to be collapsed to their headings, displaying only the method name, supported version & summary.
- [ ] Figure out if there's a better way to display the type of each method's return value.
- [ ] Add touch events to allow dragging open or closed.
- [ ] Add clipping path to tab.
- [ ] Decide whether or not to close documentation after clicking a character to insert.
- [x] Change the colour used in `text-decoration` for links.
- [x] Highlight which methods are and are not supported in the currently selected version of Japt.
- [x] Don't include object names in method names. Instead, wrap the first character in each section's title in `<code>` tags.

## PROJECTS
- [ ] Always show the sidebar when the window width is greater than `1200px`(?).
- [ ] Or *maybe* move projects to the right of the page?
  - [ ] Show projects & docs tabs above `800px`; clicking a tab toggles the `z-index`es.
  - [ ] Clicking either tab below `800px` opens both sidebars; clicking the active tab closes them again; clicking the inactive tab toggles the `z-index`es.
- [ ] Redesign projects list to allow the addition of icons to:
  - [ ] Copy link
  - [ ] Copy Markdown
  - [ ] Overwrite with current project
  - [ ] Download project
  - [ ] Rename project
- [ ] Add categories with collapsible "folders" (with support for custom icons?)
- [ ] Add touch events to allow dragging open or closed.
- [ ] Add clipping path to tab.
- [x] Change wording of import & export icons to upload & download.

## OTHER TOOLS
- [ ] Add a "scratchpad" field for writing notes, keeping copies of WIP programmes, etc.
- [ ] ~~Add a new sidebar with an `iframe` for the PPCG chatroom, if Stack Exchange allows it.~~ SE does, indeed, *not* allow it!

## GITHUB REPO
- [ ] Create issue labels.
- [ ] Finish writing `README.md`.
