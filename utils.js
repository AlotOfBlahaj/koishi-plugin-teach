"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koishi_utils_1 = require("koishi-utils");
const prefixPunctuation = /^([()\]]|\[(?!cq:))*/;
const suffixPunctuation = /([.,?!()[~]|(?<!\[cq:[^\]]+)\])*$/;
function stripPunctuation(source) {
    source = source.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/，/g, ',')
        .replace(/、/g, ',')
        .replace(/。/g, '.')
        .replace(/？/g, '?')
        .replace(/！/g, '!')
        .replace(/（/g, '(')
        .replace(/）/g, ')')
        .replace(/【/g, '[')
        .replace(/】/g, ']')
        .replace(/～/g, '~');
    return source
        .replace(prefixPunctuation, '')
        .replace(suffixPunctuation, '') || source;
}
exports.stripPunctuation = stripPunctuation;
function simplifyQuestion(source) {
    return koishi_utils_1.simplify(stripPunctuation(String(source || '')));
}
exports.simplifyQuestion = simplifyQuestion;
function simplifyAnswer(source) {
    return (String(source || '')).trim();
}
exports.simplifyAnswer = simplifyAnswer;
function splitIds(source) {
    return source ? source.split(',').map(i => parseInt(i)) : [];
}
exports.splitIds = splitIds;
async function parseOptions(ctx, config, argv) {
    const { options, meta, args } = argv;
    const argc = args.length;
    if (typeof options.chance === 'number' && (options.chance <= 0 || options.chance > 1)) {
        return meta.$send('参数 -c, --chance 应为不超过 1 的正数。');
    }
    const parsedOptions = { ctx, meta, argc, args, options, config };
    if (config.useWriter) {
        if (options.noWriter) {
            parsedOptions.writer = 0;
        }
        else if (options.writer) {
            if (koishi_utils_1.isInteger(options.writer) && options.writer > 0) {
                parsedOptions.writer = options.writer;
            }
            else {
                return meta.$send('参数 -w, --writer 错误，请检查指令语法。');
            }
        }
    }
    if (config.useEnvironment) {
        if (options.globalEnv) {
            parsedOptions.envMode = -2;
            parsedOptions.groups = [];
        }
        else if (options.noEnv) {
            parsedOptions.envMode = 2;
            parsedOptions.groups = [];
        }
        else if (typeof options.env === 'string') {
            if (options.env.match(/^(\*?(\d{9}(,\d{9})*)?|[#~]\d{9}(,\d{9})*)$/)) {
                parsedOptions.groups = splitIds(options.env.replace(/^[#~*]/, '')).sort();
                parsedOptions.envMode = options.env.startsWith('*') ? -2
                    : options.env.startsWith('#') ? 1
                        : options.env.startsWith('~') ? -1
                            : 2;
            }
            else {
                return meta.$send('参数 -e, --env 错误，请检查指令语法。');
            }
        }
    }
    if (String(options.question).includes('[CQ:image,')) {
        return meta.$send('问题不能包含图片。');
    }
    options.question = simplifyQuestion(options.question);
    if (!options.question)
        delete options.question;
    options.answer = simplifyAnswer(options.answer);
    if (!options.answer)
        delete options.answer;
    return parsedOptions;
}
exports.default = parseOptions;
