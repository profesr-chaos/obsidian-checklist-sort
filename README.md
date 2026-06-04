# Checklist Sorter

An [Obsidian](https://obsidian.md) plugin that sorts checklists by unchecked items first, while preserving the order of nested items.

## How it works

Trigger the command **"Sort Checklist (unchecked first)"** via the command palette or a assigned hotkey. All top-level unchecked items will move to the top, checked items to the bottom — nested items always stay attached to their parent.

**Before:**
- [x] Buy groceries
  - [ ] Milk
- [ ] Walk the dog
- [x] Do laundry

**After:**
- [ ] Walk the dog
- [x] Buy groceries
  - [ ] Milk
- [x] Do laundry

## Installation

### Community Plugin List
Coming soon.

### Manual
Copy `main.js`, `styles.css`, and `manifest.json` to your vault at `.obsidian/plugins/checklist-sorter/`.

## Development

Requirements: Node.js v18+
```bash
npm i
npm run dev
