# Checklist Sorter

An [Obsidian](https://obsidian.md) plugin that sorts checklists by unchecked items first, while preserving the order of nested items.

## How it works

Trigger the command **"Sort Checklist (unchecked first)"** via the command palette or an assigned hotkey. All top-level unchecked items will move to the top, checked items to the bottom — nested items always stay attached to their parent.

**Before:**
- [x] Buy groceries
  - [x] Milk
- [ ] Walk the dog
- [x] Do laundry

**After:**
- [ ] Walk the dog
- [x] Buy groceries
  - [x] Milk
- [x] Do laundry

## Installation

### Community Plugin List
Coming soon.

### Manual
Copy `main.js` and `manifest.json` to your vault at `.obsidian/plugins/checklist-sorter/`.

## Development

Requirements: Node.js v18+

```bash
npm i
npm run dev
```

## Releasing

1. Update the version in `manifest.json` and `versions.json`
2. Create a GitHub release with the version as the tag (e.g. `1.0.0`)
3. The GitHub Actions workflow will automatically attach the built files to the release
