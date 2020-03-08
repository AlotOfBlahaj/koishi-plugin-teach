"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koishi_utils_1 = require("koishi-utils");
const utils_1 = require("./utils");
function escapeAnswer(message) {
    return message.replace(/\$/g, '@@__DOLLARS_PLACEHOLDER__@@');
}
function default_1(ctx, config) {
    ctx.intersect(ctx.app.groups).middleware(async (meta, next) => {
        const { groupId } = meta;
        const question = utils_1.simplifyQuestion(meta.message);
        if (!question)
            return next();
        const test = { question };
        if (config.useEnvironment) {
            test.envMode = 1;
            test.groups = [groupId];
        }
        const items = await ctx.database.getDialogues(test);
        if (!items.length)
            return next();
        const dialogue = koishi_utils_1.randomPick(items);
        if (!dialogue || dialogue.probability < 1 && dialogue.probability <= Math.random())
            return next();
        ctx.app.emitEvent(meta, 'dialogue', meta, dialogue);
        const answers = dialogue.answer
            .replace(/\$\$/g, '@@__DOLLARS_PLACEHOLDER__@@')
            .replace(/\$a/g, `[CQ:at,qq=${meta.userId}]`)
            .replace(/\$A/g, '[CQ:at,qq=all]')
            .replace(/\$m/g, koishi_utils_1.CQCode.stringify('at', { qq: meta.selfId }))
            .replace(/\$s/g, escapeAnswer(meta.sender.card || meta.sender.nickname)) // TODO: name support
            .replace(/\$0/g, escapeAnswer(meta.message))
            .split('$n')
            .map(str => str.trim().replace(/@@__DOLLARS_PLACEHOLDER__@@/g, '$'));
        for (const answer of answers) {
            await koishi_utils_1.sleep(answer.length * 50);
            await meta.$send(answer);
        }
        ctx.app.emitEvent(meta, 'after-dialogue', meta, dialogue);
    });
}
exports.default = default_1;
