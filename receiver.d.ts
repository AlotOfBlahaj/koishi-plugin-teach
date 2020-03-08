import { Context, Meta } from 'koishi-core';
import { TeachConfig } from './utils';
import { Dialogue } from './database';
declare module 'koishi-core/dist/context' {
    interface EventMap {
        'dialogue'(meta: Meta, dialogue: Dialogue): any;
        'after-dialogue'(meta: Meta, dialogue: Dialogue): any;
    }
}
export default function (ctx: Context, config: TeachConfig): void;
