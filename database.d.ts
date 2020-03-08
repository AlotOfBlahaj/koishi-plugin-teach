declare module 'koishi-core/dist/database' {
    interface TableMethods {
        dialogue: DialogueMethods;
    }
    interface TableData {
        dialogue: Dialogue;
    }
}
interface DialogueMethods {
    _getDialogueTest(test: DialogueTest): string;
    _testDialogue(test: DialogueTest, data: Dialogue): boolean;
    createDialogue(options: Dialogue): Promise<Dialogue>;
    getDialogues(test: number[] | DialogueTest): Promise<Dialogue[]>;
    setDialogue(id: number, data: Partial<Dialogue>): Promise<any>;
    removeDialogues(ids: number[]): Promise<any>;
    getDialogueCount(test: DialogueTest): Promise<DialogueCount>;
}
export interface DialogueCount {
    questions: number;
    answers: number;
}
export interface Dialogue {
    id?: number;
    question: string;
    answer: string;
    writer: number;
    groups: string;
    flag: number;
    probability: number;
}
export declare enum DialogueFlag {
    frozen = 1,
    regexp = 2,
    keyword = 4,
    appellation = 8
}
export interface DialogueTest {
    envMode?: -2 | -1 | 0 | 1 | 2;
    groups?: number[];
    question?: string;
    answer?: string;
    writer?: number;
    keyword?: boolean;
    strict?: boolean;
    frozen?: boolean;
}
export {};
