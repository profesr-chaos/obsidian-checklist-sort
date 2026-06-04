import { App, PluginSettingTab } from 'obsidian';
import MyPlugin from './main';

export interface MyPluginSettings {
    // Ready for future settings
}

export const DEFAULT_SETTINGS: MyPluginSettings = {};

export class MyPluginSettingTab extends PluginSettingTab {
    plugin: MyPlugin;

    constructor(app: App, plugin: MyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Checklist Sorter' });
        containerEl.createEl('p', { text: 'Use the Hotkeys settings panel to assign a keybind to "Sort Checklist (unchecked first)".' });
    }
}
