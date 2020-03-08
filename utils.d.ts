import { Context, ParsedCommandLine, Meta, CommandConfig } from 'koishi-core';
export interface TeachConfig extends CommandConfig {
    useWriter?: boolean;
    useFrozen?: boolean;
    useEnvironment?: boolean;
}
export declare function stripPunctuation(source: string): string;
export declare function simplifyQuestion(source: string): string;
export declare function simplifyAnswer(source: string): string;
export declare function splitIds(source: string): number[];
export interface TeachOptions {
    ctx: Context;
    meta: Meta;
    args: string[];
    argc: number;
    options: Record<string, any>;
    config: TeachConfig;
    writer?: number;
    groups?: number[];
    envMode?: -2 | -1 | 0 | 1 | 2;
}
export default function parseOptions(ctx: Context, config: TeachConfig, argv: ParsedCommandLine): Promise<void | TeachOptions>;
