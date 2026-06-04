# Checklist Sort

An [Obsidian](https://obsidian.md) plugin that sorts checklists by unchecked items first, while preserving the order of nested items.

Created by Adam Tweedie ([profsr-chaos](https://github.com/profesr-chaos))

## Features

- Sorts checklist items so unchecked items appear at the top and checked items at the bottom
- Nested items always stay attached to their parent — they are never reordered independently
- Relative order within each group is preserved
- Non-checklist content (headings, paragraphs, etc.) is never affected

## Usage

### Command Palette

1. Open the command palette with `Ctrl+P` (or `Cmd+P` on Mac)
2. Search for **"Sort Checklist (unchecked first)"**
3. Press `Enter`

### Hotkey

1. Go to **Settings → Hotkeys**
2. Search for **"Sort Checklist"**
3. Assign any keybind you like

### Example

**Before:**

- [x] Buy groceries
  - [] Milk
- [] Walk the dog
- [x] Do laundry

**After:**

- [ ]Walk the dog
- [x] Buy groceries
  - [ ] Milk
- [x] Do laundry


