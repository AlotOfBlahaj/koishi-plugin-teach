import { Context } from 'koishi-core';
import { TeachConfig } from './utils';
export * from './database';
export { TeachConfig };
export declare const name = "teach";
export declare function apply(ctx: Context, config?: TeachConfig): void;
