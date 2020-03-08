"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function apply({ envMode, groups, ctx, meta, options, config }) {
    if (config.useEnvironment && !envMode && !options.allEnv) {
        envMode = 1;
        groups = [meta.groupId];
    }
    const { questions, answers } = await ctx.database.getDialogueCount({ envMode, groups });
    return meta.$send(`共收录了 ${questions} 个问题和 ${answers} 个回答。`);
}
exports.default = apply;
