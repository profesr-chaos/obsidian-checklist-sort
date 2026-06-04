import { Editor, MarkdownView, Plugin } from 'obsidian';

export default class MyPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'sort-checklist',
			name: 'Sort Checklist (unchecked first)',
			editorCallback: (editor: Editor) => {
				this.sortChecklist(editor);
			},
		});
	}

	private sortChecklist(editor: Editor): void {
		const content = editor.getValue();
		const lines = content.split('\n');
		const result = this.sortChecklistLines(lines);
		editor.setValue(result.join('\n'));
	}

	private sortChecklistLines(lines: string[]): string[] {
		// Build a tree of checklist blocks, preserving non-checklist lines in place
		const result: string[] = [];
		let i = 0;

		while (i < lines.length) {
			const line = lines[i];
			if (line === undefined) break;
			const indent = this.getIndentLevel(line);
			const isTopLevelCheckbox = indent === 0 && this.isChecklistItem(line);

			if (isTopLevelCheckbox) {
				// Collect the full block of top-level checklist items (and their children)
				const block = this.collectChecklistBlock(lines, i, 0);
				const sorted = this.sortBlock(block);
				result.push(...sorted.map(entry => entry.lines).flat());
				i += block.reduce((sum, entry) => sum + entry.lines.length, 0);
			} else {
				result.push(line);
				i++;
			}
		}

		return result;
	}

	/**
	 * Collects consecutive top-level checklist items and their indented children
	 * into a list of entries, each containing the parent line + its child lines.
	 */
	private collectChecklistBlock(
		lines: string[],
		startIndex: number,
		parentIndent: number
	): ChecklistEntry[] {
		const entries: ChecklistEntry[] = [];
		let i = startIndex;

		while (i < lines.length) {
			const line = lines[i];
			if (line === undefined) break; // ← guard against undefined

			const indent = this.getIndentLevel(line);
			const isChecklist = this.isChecklistItem(line);

			if (indent <= parentIndent && !isChecklist) break;
			if (indent === parentIndent && !isChecklist) break;
			if (indent < parentIndent) break;
			if (indent === parentIndent && isChecklist) {
				const entryLines: string[] = [line];
				i++;

				while (i < lines.length) {
					const childLine = lines[i];
					if (childLine === undefined) break; // ← guard against undefined

					const childIndent = this.getIndentLevel(childLine);

					if (childIndent > parentIndent) {
						entryLines.push(childLine);
						i++;
					} else {
						break;
					}
				}

				entries.push({
					isChecked: this.isChecked(line),
					lines: entryLines,
				});
			} else {
				entries.push({
					isChecked: false,
					lines: [line],
				});
				i++;
			}
		}

		return entries;
	}


	/**
	 * Sorts entries: unchecked first, checked last.
	 * Relative order within each group is preserved (stable sort).
	 */
	private sortBlock(entries: ChecklistEntry[]): ChecklistEntry[] {
		const unchecked = entries.filter(e => !e.isChecked);
		const checked = entries.filter(e => e.isChecked);
		return [...unchecked, ...checked];
	}

	private isChecklistItem(line: string): boolean {
		return /^(\s*)-\s+\[( |x|X)\]/.test(line);
	}

	private isChecked(line: string): boolean {
		return /^(\s*)-\s+\[x\]/i.test(line);
	}

	private getIndentLevel(line: string): number {
		const match = line.match(/^(\s*)/);
		return match ? match[1]?.length ?? 0 : 0;
	}

}

interface ChecklistEntry {
	isChecked: boolean;
	lines: string[];    // Parent line + all its indented children
}
