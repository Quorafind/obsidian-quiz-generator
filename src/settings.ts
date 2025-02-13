import { App, PluginSettingTab, Setting } from "obsidian";
import QuizGenerator from "./main";

export default class QuizSettingsTab extends PluginSettingTab {
	private plugin: QuizGenerator;

	constructor(app: App, plugin: QuizGenerator) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("API key")
			.setDesc("Enter your OpenAI API key here.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value.trim();
						await this.plugin.saveSettings();
					}).inputEl.type = "password"
			);

		new Setting(containerEl)
			.setName("Model")
			.setDesc("Model used for question generation.")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("gpt-3.5-turbo-1106", "gpt-3.5-turbo-1106")
					.addOption("gpt-4-1106-preview", "gpt-4-1106-preview")
					.setValue(this.plugin.settings.model)
					.onChange(async (value) => {
						this.plugin.settings.model = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Show note path")
			.setDesc("Turn this off to only show note name.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showNotePath)
					.onChange(async (value) => {
						this.plugin.settings.showNotePath = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Show folder path")
			.setDesc("Turn this off to only show folder name.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showFolderPath)
					.onChange(async (value) => {
						this.plugin.settings.showFolderPath = value;
						await this.plugin.saveSettings();
					})
			);

		containerEl.createEl("h3", {text: `${("Generation")}`});

		new Setting(containerEl)
			.setName("Multiple choice")
			.setDesc("Generate multiple choice questions.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.generateMultipleChoice)
					.onChange(async (value) => {
						this.plugin.settings.generateMultipleChoice = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Multiple choice quantity")
			.setDesc("Number of multiple choice questions to generate.")
			.addSlider((slider) =>
				slider
					.setValue(this.plugin.settings.numberOfMultipleChoice)
					.setLimits(1, 10, 1)
					.onChange(async (value) => {
						this.plugin.settings.numberOfMultipleChoice = value;
						await this.plugin.saveSettings();
					})
					.setDynamicTooltip()
					.showTooltip()
			);

		new Setting(containerEl)
			.setName("True/false")
			.setDesc("Generate true/false questions.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.generateTrueFalse)
					.onChange(async (value) => {
						this.plugin.settings.generateTrueFalse = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("True/false quantity")
			.setDesc("Number of true/false questions to generate.")
			.addSlider((slider) =>
				slider
					.setValue(this.plugin.settings.numberOfTrueFalse)
					.setLimits(1, 10, 1)
					.onChange(async (value) => {
						this.plugin.settings.numberOfTrueFalse = value;
						await this.plugin.saveSettings();
					})
					.setDynamicTooltip()
					.showTooltip()
			);

		new Setting(containerEl)
			.setName("Short answer")
			.setDesc("Generate short answer questions.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.generateShortAnswer)
					.onChange(async (value) => {
						this.plugin.settings.generateShortAnswer = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Short answer quantity")
			.setDesc("Number of short answer questions to generate.")
			.addSlider((slider) =>
				slider
					.setValue(this.plugin.settings.numberOfShortAnswer)
					.setLimits(1, 10, 1)
					.onChange(async (value) => {
						this.plugin.settings.numberOfShortAnswer = value;
						await this.plugin.saveSettings();
					})
					.setDynamicTooltip()
					.showTooltip()
			);

		containerEl.createEl("h3", {text: `${("Saving")}`});

		new Setting(containerEl)
			.setName("Automatically save questions")
			.setDesc("Auto-save all questions upon generation.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.autoSave)
					.onChange(async (value) => {
						this.plugin.settings.autoSave = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Save location")
			.setDesc("Enter vault absolute path to folder where questions are saved (leave blank to save in vault root folder).")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.questionSavePath)
					.onChange(async (value) => {
						this.plugin.settings.questionSavePath = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Spaced repetition")
			.setDesc("Save questions in spaced repetition format.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.saveForSpacedRepetition)
					.onChange(async (value) => {
						this.plugin.settings.saveForSpacedRepetition = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Inline separator")
			.setDesc("Separator for spaced repetition inline flashcards.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.inlineSeparator)
					.onChange(async (value) => {
						this.plugin.settings.inlineSeparator = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Multiline separator")
			.setDesc("Separator for spaced repetition multiline flashcards.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.multilineSeparator)
					.onChange(async (value) => {
						this.plugin.settings.multilineSeparator = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Callout")
			.setDesc("Save questions as callouts.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.saveAsCallout)
					.onChange(async (value) => {
						this.plugin.settings.saveAsCallout = value;
						await this.plugin.saveSettings();
					})
			);

	}

}
