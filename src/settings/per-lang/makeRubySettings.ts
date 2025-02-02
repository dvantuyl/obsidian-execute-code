import { Setting } from "obsidian";
import { SettingsTab } from "../SettingsTab";

export default (tab: SettingsTab, containerEl: HTMLElement) => {
	containerEl.createEl("h3", { text: "Ruby Settings" });
	new Setting(containerEl).setName("ruby path").addText((text) =>
		text.setValue(tab.plugin.settings.rubyPath).onChange(async (value) => {
			const sanitized = tab.sanitizePath(value);
			tab.plugin.settings.rubyPath = sanitized;
			console.log("ruby path set to: " + sanitized);
			await tab.plugin.saveSettings();
		})
	);
	new Setting(containerEl).setName("Ruby arguments").addText((text) =>
		text.setValue(tab.plugin.settings.rubyArgs).onChange(async (value) => {
			tab.plugin.settings.rubyArgs = value;
			console.log("Ruby args set to: " + value);
			await tab.plugin.saveSettings();
		})
	);
	tab.makeInjectSetting(containerEl, "ruby");
};
