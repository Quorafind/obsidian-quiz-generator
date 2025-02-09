import { App, TFile, normalizePath } from "obsidian";
import { ParsedMC, ParsedTF, ParsedSA } from "../utils/types";
import QuizGenerator from "../main";

export default class QuestionSaver {
	private app: App;
	private readonly plugin: QuizGenerator;
	private readonly question: ParsedMC | ParsedTF | ParsedSA;
	private path: string;
	private readonly fileName: string;
	private readonly validPath: boolean;
	private readonly fileCreated: boolean;
	private file: TFile;

	constructor(app: App, plugin: QuizGenerator, question: ParsedMC | ParsedTF | ParsedSA,
				fileName: string, validPath: boolean, fileCreated: boolean) {
		this.app = app;
		this.plugin = plugin;
		this.question = question;
		this.fileName = fileName;
		this.validPath = validPath;
		this.fileCreated = fileCreated;
	}

	public async saveQuestion() {
		if (this.validPath) {
			this.path = normalizePath(this.plugin.settings.questionSavePath.trim() + "/" + this.fileName);
		} else {
			this.path = this.fileName;
		}

		if (!this.fileCreated) {
			this.file = await this.app.vault.create(this.path, "#flashcards");
		} else {
			this.file = this.app.vault.getAbstractFileByPath(this.path) as TFile;
		}

		if (this.plugin.settings.saveForSpacedRepetition) {
			await this.saveForSpacedRepetition();
		}
		if (this.plugin.settings.saveAsCallout) {
			await this.saveAsCallout();
		}
	}

	private async saveForSpacedRepetition() {
		await this.app.vault.append(this.file, "\n\n" + this.formatSpacedRepQuestion(this.question));
	}

	private async saveAsCallout() {
		await this.app.vault.append(this.file, "\n\n" + this.formatCalloutQuestion(this.question));
	}

	private formatSpacedRepQuestion(question: ParsedMC | ParsedTF | ParsedSA) {
		if ("QuestionMC" in question) {
			return "**Multiple Choice:** " + question.QuestionMC +
				`\na) ${question["1"]}` + `\nb) ${question["2"]}` +
				`\nc) ${question["3"]}` + `\nd) ${question["4"]}` +
				`\n${this.plugin.settings.multilineSeparator}\n` +
				this.numberToAnswer(question.Answer, question);
		} else if ("QuestionTF" in question) {
			return "**True/False:** " + question.QuestionTF +
				` ${this.plugin.settings.inlineSeparator} ` + question.Answer;
		} else if ("QuestionSA" in question) {
			return "**Short Answer:** " + question.QuestionSA +
				` ${this.plugin.settings.inlineSeparator} ` + question.Answer;
		} else {
			return "Error saving question.";
		}
	}

	private formatCalloutQuestion(question: ParsedMC | ParsedTF | ParsedSA) {
		if ("QuestionMC" in question) {
			return `> [!question] ${question.QuestionMC}` +
				`\n> a) ${question["1"]}` + `\n> b) ${question["2"]}` +
				`\n> c) ${question["3"]}` + `\n> d) ${question["4"]}` +
				`\n>> [!success]- Answer\n>> ` + this.numberToAnswer(question.Answer, question);
		} else if ("QuestionTF" in question) {
			return `> [!question] ${question.QuestionTF}` + `\n> True or false?` +
				`\n>> [!success]- Answer\n>> ${question.Answer}`;
		} else if ("QuestionSA" in question) {
			return `> [!question] ${question.QuestionSA}` + `\n>> [!success]- Answer\n>> ${question.Answer}`;
		} else {
			return "> [!failure] Error saving question.";
		}
	}

	private numberToAnswer(input: number, question: ParsedMC) {
		switch (input) {
			case 1:
				return "a) " + question["1"];
			case 2:
				return "b) " + question["2"];
			case 3:
				return "c) " + question["3"];
			case 4:
				return "d) " + question["4"];
			default:
				return "Error saving answer.";
		}
	}

}
