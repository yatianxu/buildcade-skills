#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/error.js
var require_error = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/error.js"(exports2) {
    var CommanderError2 = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError2 = class extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/argument.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Argument2 = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       *
       * @returns {Argument}
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       *
       * @returns {Argument}
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports2.Argument = Argument2;
    exports2.humanReadableArgName = humanReadableArgName;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/help.js
var require_help = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/help.js"(exports2) {
    var { humanReadableArgName } = require_argument();
    var Help2 = class {
      constructor() {
        this.helpWidth = void 0;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        const helpCommand = cmd._getHelpCommand();
        if (helpCommand && !helpCommand._hidden) {
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns {number}
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const helpOption = cmd._getHelpOption();
        if (helpOption && !helpOption.hidden) {
          const removeShort = helpOption.short && cmd._findOption(helpOption.short);
          const removeLong = helpOption.long && cmd._findOption(helpOption.long);
          if (!removeShort && !removeLong) {
            visibleOptions.push(helpOption);
          } else if (helpOption.long && !removeLong) {
            visibleOptions.push(
              cmd.createOption(helpOption.long, helpOption.description)
            );
          } else if (helpOption.short && !removeShort) {
            visibleOptions.push(
              cmd.createOption(helpOption.short, helpOption.description)
            );
          }
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter(
            (option) => !option.hidden
          );
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(
              `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
            );
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(", ")})`;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          );
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2;
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(
              fullText,
              helpWidth - itemIndentWidth,
              termWidth + itemSeparatorWidth
            );
          }
          return term;
        }
        function formatList(textArray) {
          return textArray.join("\n").replace(/^/gm, " ".repeat(itemIndentWidth));
        }
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ""];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([
            helper.wrap(commandDescription, helpWidth, 0),
            ""
          ]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(
            helper.argumentTerm(argument),
            helper.argumentDescription(argument)
          );
        });
        if (argumentList.length > 0) {
          output = output.concat(["Arguments:", formatList(argumentList), ""]);
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(
            helper.optionTerm(option),
            helper.optionDescription(option)
          );
        });
        if (optionList.length > 0) {
          output = output.concat(["Options:", formatList(optionList), ""]);
        }
        if (this.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return formatItem(
              helper.optionTerm(option),
              helper.optionDescription(option)
            );
          });
          if (globalOptionList.length > 0) {
            output = output.concat([
              "Global Options:",
              formatList(globalOptionList),
              ""
            ]);
          }
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return formatItem(
            helper.subcommandTerm(cmd2),
            helper.subcommandDescription(cmd2)
          );
        });
        if (commandList.length > 0) {
          output = output.concat(["Commands:", formatList(commandList), ""]);
        }
        return output.join("\n");
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */
      wrap(str, width, indent, minColumnWidth = 40) {
        const indents = " \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF";
        const manualIndent = new RegExp(`[\\n][${indents}]+`);
        if (str.match(manualIndent)) return str;
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth) return str;
        const leadingStr = str.slice(0, indent);
        const columnText = str.slice(indent).replace("\r\n", "\n");
        const indentString = " ".repeat(indent);
        const zeroWidthSpace = "\u200B";
        const breaks = `\\s${zeroWidthSpace}`;
        const regex = new RegExp(
          `
|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`,
          "g"
        );
        const lines = columnText.match(regex) || [];
        return leadingStr + lines.map((line, i2) => {
          if (line === "\n") return "";
          return (i2 > 0 ? indentString : "") + line.trimEnd();
        }).join("\n");
      }
    };
    exports2.Help = Help2;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/option.js
var require_option = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/option.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Option2 = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {(string | string[])} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       */
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ""));
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @package
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @package
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1]))
        shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = void 0;
      }
      return { shortFlag, longFlag };
    }
    exports2.Option = Option2;
    exports2.DualOptions = DualOptions;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/suggestSimilar.js"(exports2) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i2 = 0; i2 <= a.length; i2++) {
        d[i2] = [i2];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i2 = 1; i2 <= a.length; i2++) {
          let cost = 1;
          if (a[i2 - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i2][j] = Math.min(
            d[i2 - 1][j] + 1,
            // deletion
            d[i2][j - 1] + 1,
            // insertion
            d[i2 - 1][j - 1] + cost
            // substitution
          );
          if (i2 > 1 && j > 1 && a[i2 - 1] === b[j - 2] && a[i2 - 2] === b[j - 1]) {
            d[i2][j] = Math.min(d[i2][j], d[i2 - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports2.suggestSimilar = suggestSimilar;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/command.js
var require_command = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/command.js"(exports2) {
    var EventEmitter = require("node:events").EventEmitter;
    var childProcess = require("node:child_process");
    var path12 = require("node:path");
    var fs = require("node:fs");
    var process2 = require("node:process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command2 = class _Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._outputConfiguration = {
          writeOut: (str) => process2.stdout.write(str),
          writeErr: (str) => process2.stderr.write(str),
          getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : void 0,
          getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : void 0,
          outputError: (str, write) => write(str)
        };
        this._hidden = false;
        this._helpOption = void 0;
        this._addImplicitHelpCommand = void 0;
        this._helpCommand = void 0;
        this._helpConfiguration = {};
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._helpOption = sourceCommand._helpOption;
        this._helpCommand = sourceCommand._helpCommand;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {(boolean|string)} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd._checkForBrokenPassThrough();
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {(Function|*)} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === "function") {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(
            `only the last argument can be variadic '${previousArgument.name()}'`
          );
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          );
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
       *
       * @example
       *    program.helpCommand('help [cmd]');
       *    program.helpCommand('help [cmd]', 'show help');
       *    program.helpCommand(false); // suppress default help command
       *    program.helpCommand(true); // add help command even if no subcommands
       *
       * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
       * @param {string} [description] - custom description
       * @return {Command} `this` command for chaining
       */
      helpCommand(enableOrNameAndArgs, description) {
        if (typeof enableOrNameAndArgs === "boolean") {
          this._addImplicitHelpCommand = enableOrNameAndArgs;
          return this;
        }
        enableOrNameAndArgs = enableOrNameAndArgs ?? "help [command]";
        const [, helpName, helpArgs] = enableOrNameAndArgs.match(/([^ ]+) *(.*)/);
        const helpDescription = description ?? "display help for command";
        const helpCommand = this.createCommand(helpName);
        helpCommand.helpOption(false);
        if (helpArgs) helpCommand.arguments(helpArgs);
        if (helpDescription) helpCommand.description(helpDescription);
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Add prepared custom help command.
       *
       * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
       * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(helpCommand, deprecatedDescription) {
        if (typeof helpCommand !== "object") {
          this.helpCommand(helpCommand, deprecatedDescription);
          return this;
        }
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Lazy create help command.
       *
       * @return {(Command|null)}
       * @package
       */
      _getHelpCommand() {
        const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
        if (hasImplicitHelpCommand) {
          if (this._helpCommand === void 0) {
            this.helpCommand(void 0, void 0);
          }
          return this._helpCommand;
        }
        return null;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err2) => {
            if (err2.code !== "commander.executeSubCommandAsync") {
              throw err2;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process2.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {(Option | Argument)} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err2) {
          if (err2.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err2.message}`;
            this.error(message, { exitCode: err2.exitCode, code: err2.code });
          }
          throw err2;
        }
      }
      /**
       * Check for option flag conflicts.
       * Register option if no conflicts found, or throw on conflict.
       *
       * @param {Option} option
       * @private
       */
      _registerOption(option) {
        const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
        if (matchingOption) {
          const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
          throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
        }
        this.options.push(option);
      }
      /**
       * Check for command name and alias conflicts with existing commands.
       * Register command if no conflicts found, or throw on conflict.
       *
       * @param {Command} command
       * @private
       */
      _registerCommand(command) {
        const knownBy = (cmd) => {
          return [cmd.name()].concat(cmd.aliases());
        };
        const alreadyUsed = knownBy(command).find(
          (name) => this._findCommand(name)
        );
        if (alreadyUsed) {
          const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
          const newCmd = knownBy(command).join("|");
          throw new Error(
            `cannot add command '${newCmd}' as already have command '${existingCmd}'`
          );
        }
        this.commands.push(command);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        this._registerOption(option);
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(
              name,
              option.defaultValue === void 0 ? true : option.defaultValue,
              "default"
            );
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @return {Command} `this` command for chaining
       * @private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error(
            "To add an Option object use addOption() instead of option() or requiredOption()"
          );
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('-p, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
      /**
       * Add a required option which must have a value after parsing. This usually means
       * the option must be specified on the command line. (Otherwise the same as .option().)
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx(
          { mandatory: true },
          flags,
          description,
          parseArg,
          defaultValue
        );
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
       * @return {Command} `this` command for chaining
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
       * @return {Command} `this` command for chaining
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
       * @return {Command} `this` command for chaining
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {boolean} [positional]
       * @return {Command} `this` command for chaining
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {boolean} [passThrough] for unknown options.
       * @return {Command} `this` command for chaining
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        this._checkForBrokenPassThrough();
        return this;
      }
      /**
       * @private
       */
      _checkForBrokenPassThrough() {
        if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
          throw new Error(
            `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
          );
        }
      }
      /**
       * Whether to store option values as properties on command object,
       * or store separately (specify false). In both cases the option values can be accessed using .opts().
       *
       * @param {boolean} [storeAsProperties=true]
       * @return {Command} `this` command for chaining
       */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        if (Object.keys(this._optionValues).length) {
          throw new Error(
            "call .storeOptionsAsProperties() before setting option values"
          );
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
       * Store option value and where the value came from.
       *
       * @param {string} key
       * @param {object} value
       * @param {string} source - expected values are default/config/env/cli/implied
       * @return {Command} `this` command for chaining
       */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
       * Get source of option value.
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
       * Get source of option value. See also .optsWithGlobals().
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0 && parseOptions.from === void 0) {
          if (process2.versions?.electron) {
            parseOptions.from = "electron";
          }
          const execArgv = process2.execArgv ?? [];
          if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
            parseOptions.from = "eval";
          }
        }
        if (argv === void 0) {
          argv = process2.argv;
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process2.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          case "eval":
            userArgs = argv.slice(1);
            break;
          default:
            throw new Error(
              `unexpected parse option { from: '${parseOptions.from}' }`
            );
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * program.parse(); // parse process.argv and auto-detect electron and special node flags
       * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
       * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Execute a sub-command executable.
       *
       * @private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path12.resolve(baseDir, baseName);
          if (fs.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path12.extname(baseName))) return void 0;
          const foundExt = sourceExt.find(
            (ext) => fs.existsSync(`${localBin}${ext}`)
          );
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs.realpathSync(this._scriptPath);
          } catch (err2) {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path12.resolve(
            path12.dirname(resolvedScriptPath),
            executableDir
          );
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path12.basename(
              this._scriptPath,
              path12.extname(this._scriptPath)
            );
            if (legacyName !== this._name) {
              localFile = findFile(
                executableDir,
                `${legacyName}-${subcommand._name}`
              );
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path12.extname(executableFile));
        let proc;
        if (process2.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process2.execArgv).concat(args);
            proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process2.execArgv).concat(args);
          proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process2.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        proc.on("close", (code) => {
          code = code ?? 1;
          if (!exitCallback) {
            process2.exit(code);
          } else {
            exitCallback(
              new CommanderError2(
                code,
                "commander.executeSubCommandAsync",
                "(close)"
              )
            );
          }
        });
        proc.on("error", (err2) => {
          if (err2.code === "ENOENT") {
            const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
            const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
            throw new Error(executableMissing);
          } else if (err2.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process2.exit(1);
          } else {
            const wrappedError = new CommanderError2(
              1,
              "commander.executeSubCommandAsync",
              "(error)"
            );
            wrappedError.nestedError = err2;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(
          promiseChain,
          subCommand,
          "preSubcommand"
        );
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(
          subcommandName,
          [],
          [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
        );
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i2) => {
          if (arg.required && this.args[i2] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(
              argument,
              value,
              previous,
              invalidValueMessage
            );
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {(Promise|undefined)} promise
       * @param {Function} fn
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          this._outputHelpIfRequested(unknown);
          return this._dispatchSubcommand(
            this._defaultCommandName,
            operands,
            unknown
          );
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        this._outputHelpIfRequested(parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(
            promiseChain,
            () => this._actionHandler(this.processedArgs)
          );
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @private
       * @return {Command | undefined}
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find(
          (cmd) => cmd._name === name || cmd._aliases.includes(name)
        );
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @package
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter((option) => {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === void 0) {
            return false;
          }
          return this.getOptionValueSource(optionKey) !== "default";
        });
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {string[]} argv
       * @return {{operands: string[], unknown: string[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (maybeOption(arg)) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i2 = 0; i2 < len; i2++) {
            const key = this.options[i2].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        );
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process2.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
              this.getOptionValueSource(optionKey)
            )) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter(
          (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
            this.getOptionValue(option.attributeName()),
            option
          )
        ).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(
              impliedKey,
              option.implied[impliedKey],
              "implied"
            );
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(
            (target) => target.negate && optionKey === target.attributeName()
          );
          const positiveOption = this.options.find(
            (target) => !target.negate && optionKey === target.attributeName()
          );
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
       */
      version(str, flags, description) {
        if (str === void 0) return this._version;
        this._version = str;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this._registerOption(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {object} [argsDescription]
       * @return {(string|Command)}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      summary(str) {
        if (str === void 0) return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {(string|Command)}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        const matchingCommand = this.parent?._findCommand(alias);
        if (matchingCommand) {
          const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
          throw new Error(
            `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
          );
        }
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {(string[]|Command)}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage;
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._helpOption !== null ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      name(str) {
        if (str === void 0) return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path12.basename(filename, path12.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {(string|null|Command)}
       */
      executableDir(path13) {
        if (path13 === void 0) return this._executableDir;
        this._executableDir = path13;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === void 0) {
          helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      }
      /**
       * @private
       */
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = (arg) => this._outputConfiguration.writeErr(arg);
        } else {
          write = (arg) => this._outputConfiguration.writeOut(arg);
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const context = this._getHelpContext(contextOptions);
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", context));
        this.emit("beforeHelp", context);
        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        context.write(helpInformation);
        if (this._getHelpOption()?.long) {
          this.emit(this._getHelpOption().long);
        }
        this.emit("afterHelp", context);
        this._getCommandAndAncestors().forEach(
          (command) => command.emit("afterAllHelp", context)
        );
      }
      /**
       * You can pass in flags and a description to customise the built-in help option.
       * Pass in false to disable the built-in help option.
       *
       * @example
       * program.helpOption('-?, --help' 'show help'); // customise
       * program.helpOption(false); // disable
       *
       * @param {(string | boolean)} flags
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          if (flags) {
            this._helpOption = this._helpOption ?? void 0;
          } else {
            this._helpOption = null;
          }
          return this;
        }
        flags = flags ?? "-h, --help";
        description = description ?? "display help for command";
        this._helpOption = this.createOption(flags, description);
        return this;
      }
      /**
       * Lazy create help option.
       * Returns null if has been disabled with .helpOption(false).
       *
       * @returns {(Option | null)} the help option
       * @package
       */
      _getHelpOption() {
        if (this._helpOption === void 0) {
          this.helpOption(void 0, void 0);
        }
        return this._helpOption;
      }
      /**
       * Supply your own option to use for the built-in help option.
       * This is an alternative to using helpOption() to customise the flags and description etc.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addHelpOption(option) {
        this._helpOption = option;
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process2.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {(string | Function)} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
      /**
       * Output help information if help flags specified
       *
       * @param {Array} args - array of options to search for help flags
       * @private
       */
      _outputHelpIfRequested(args) {
        const helpOption = this._getHelpOption();
        const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
        if (helpRequested) {
          this.outputHelp();
          this._exit(0, "commander.helpDisplayed", "(outputHelp)");
        }
      }
    };
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    exports2.Command = Command2;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/index.js
var require_commander = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/index.js"(exports2) {
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports2.program = new Command2();
    exports2.createCommand = (name) => new Command2(name);
    exports2.createOption = (flags, description) => new Option2(flags, description);
    exports2.createArgument = (name, description) => new Argument2(name, description);
    exports2.Command = Command2;
    exports2.Option = Option2;
    exports2.Argument = Argument2;
    exports2.Help = Help2;
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
    exports2.InvalidOptionArgumentError = InvalidArgumentError2;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/esm.mjs
var import_index = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  // deprecated old name
  Command,
  Argument,
  Option,
  Help
} = import_index.default;

// ../../packages/validator/src/diagnostics.ts
var BC_ERROR_CODES = {
  BC1001: "buildcade.json not found at artifact root.",
  BC1002: "Manifest is not valid JSON.",
  BC1003: "Unsupported or missing spec version.",
  BC1004: "Entry is invalid.",
  BC1005: "Unknown manifest field.",
  BC1006: "Invalid display configuration.",
  BC1007: "Invalid input configuration.",
  BC1008: "Invalid permissions configuration.",
  BC2001: "Entry file not found.",
  BC2002: "Unsafe artifact path.",
  BC2003: "Filesystem link not allowed.",
  BC2004: "Package resource limit exceeded.",
  BC2005: "File resource limit exceeded.",
  BC2006: "File count limit exceeded.",
  BC2007: "Unsupported server or native executable.",
  BC2008: "Case-colliding paths.",
  BC3001: "Remote executable code is not allowed.",
  BC3002: "Worker is not supported.",
  BC3003: "Service worker is not supported.",
  BC3004: "Embedded frame is not supported.",
  BC3005: "Unsupported navigation capability.",
  BC5001: "Invalid network origin.",
  BC5002: "Network wildcard is not allowed.",
  BC5003: "Undeclared external network dependency.",
  BC5004: "Capability not declared.",
  BC6001: "Potential secret detected.",
  BC9001: "Internal CLI error.",
  BC9002: "Invalid CLI usage."
};
function createDiagnostic(code, overrides = {}) {
  const diagnostic = {
    code,
    severity: "error",
    message: BC_ERROR_CODES[code]
  };
  for (const [key, value] of Object.entries(overrides)) {
    if (value !== void 0) {
      diagnostic[key] = value;
    }
  }
  return diagnostic;
}
var SEVERITY_ORDER = {
  error: 0,
  warning: 1,
  info: 2
};
function sortDiagnostics(diagnostics) {
  return [...diagnostics].sort((a, b) => {
    const severity = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    if (severity !== 0) return severity;
    const file = (a.file ?? "").localeCompare(b.file ?? "");
    if (file !== 0) return file;
    const field = (a.field ?? "").localeCompare(b.field ?? "");
    if (field !== 0) return field;
    return a.code.localeCompare(b.code);
  });
}

// ../../packages/validator/src/validate.ts
var import_promises4 = require("node:fs/promises");
var import_node_path3 = __toESM(require("node:path"), 1);

// ../../packages/game-spec/src/manifest.ts
var MANIFEST_FILE_NAME = "buildcade.json";
var GAME_SPEC_VERSION = 1;
var SUPPORTED_SPEC_VERSIONS = [1];
var INPUT_DEVICES = ["keyboard", "mouse", "touch", "gamepad"];
var ORIENTATIONS = ["any", "portrait", "landscape"];
var ASPECT_RATIO_PATTERN = /^[1-9][0-9]*:[1-9][0-9]*$/;
function dedupe(values) {
  return [...new Set(values)];
}
function parseManifest(text) {
  const withoutBom = text.charCodeAt(0) === 65279 ? text.slice(1) : text;
  let parsed;
  try {
    parsed = JSON.parse(withoutBom);
  } catch (err2) {
    return {
      ok: false,
      error: `Manifest is not valid JSON: ${err2.message}`
    };
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return {
      ok: false,
      error: "Manifest must be a top-level JSON object"
    };
  }
  return { ok: true, manifest: parsed };
}
function normalizeManifest(manifest) {
  const normalized = {
    spec: manifest.spec,
    entry: manifest.entry
  };
  const display = manifest.display;
  if (display !== void 0) {
    normalized.display = {
      ...display,
      orientation: display.orientation ?? "any"
    };
  }
  if (manifest.input !== void 0) {
    normalized.input = dedupe(manifest.input);
  }
  const permissions = manifest.permissions;
  if (permissions !== void 0) {
    const normalizedPermissions = {};
    if (permissions.network !== void 0) {
      normalizedPermissions.network = dedupe(permissions.network);
    }
    if (permissions.fullscreen === true) {
      normalizedPermissions.fullscreen = true;
    }
    if (Object.keys(normalizedPermissions).length > 0) {
      normalized.permissions = normalizedPermissions;
    }
  }
  return normalized;
}

// ../../packages/validator/src/artifact.ts
var import_promises = require("node:fs/promises");
var import_node_path = __toESM(require("node:path"), 1);
var DEFAULT_ARTIFACT_LIMITS = {
  maxPackageBytes: 50 * 1024 * 1024,
  maxFileBytes: 25 * 1024 * 1024,
  maxFileCount: 1e3
};
var UNSUPPORTED_EXECUTABLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".exe",
  ".dll",
  ".so",
  ".dylib",
  ".php",
  ".py",
  ".rb",
  ".jar",
  ".war",
  ".class",
  ".bat",
  ".cmd",
  ".ps1",
  ".sh"
]);
async function collectArtifactEntries(root) {
  const entries = [];
  async function walk(current, rel) {
    let names;
    try {
      names = await (0, import_promises.readdir)(current);
    } catch {
      return;
    }
    for (const name of names) {
      const abs = import_node_path.default.join(current, name);
      const relPath = rel === "" ? name : `${rel}/${name}`;
      const linkInfo = await (0, import_promises.lstat)(abs);
      if (linkInfo.isSymbolicLink()) {
        entries.push({
          relPath,
          absPath: abs,
          isSymbolicLink: true,
          nlink: linkInfo.nlink,
          size: linkInfo.size
        });
        continue;
      }
      if (linkInfo.isDirectory()) {
        await walk(abs, relPath);
        continue;
      }
      if (linkInfo.isFile()) {
        entries.push({
          relPath,
          absPath: abs,
          isSymbolicLink: false,
          nlink: linkInfo.nlink,
          size: linkInfo.size
        });
      }
    }
  }
  await walk(root, "");
  return entries;
}
function validateArtifact(entries, limits = {}) {
  const resolved = { ...DEFAULT_ARTIFACT_LIMITS, ...limits };
  const diagnostics = [];
  const lowerToPath = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    if (entry.isSymbolicLink) {
      diagnostics.push(
        createDiagnostic("BC2003", {
          file: entry.relPath,
          actual: entry.relPath,
          suggestion: "Symlinks are not allowed in a Build Artifact."
        })
      );
      continue;
    }
    if (entry.nlink > 1) {
      diagnostics.push(
        createDiagnostic("BC2003", {
          file: entry.relPath,
          actual: entry.relPath,
          suggestion: "Hard links are not allowed in a Build Artifact."
        })
      );
    }
    const lower = entry.relPath.toLowerCase();
    const existing = lowerToPath.get(lower);
    if (existing !== void 0) {
      diagnostics.push(
        createDiagnostic("BC2008", {
          file: entry.relPath,
          actual: entry.relPath,
          expected: "unique case-insensitive path",
          suggestion: `Collides with ${existing}`
        })
      );
    } else {
      lowerToPath.set(lower, entry.relPath);
    }
    const ext = import_node_path.default.posix.extname(entry.relPath).toLowerCase();
    if (UNSUPPORTED_EXECUTABLE_EXTENSIONS.has(ext)) {
      diagnostics.push(
        createDiagnostic("BC2007", {
          file: entry.relPath,
          actual: entry.relPath
        })
      );
    }
    if (entry.size > resolved.maxFileBytes) {
      diagnostics.push(
        createDiagnostic("BC2005", {
          file: entry.relPath,
          actual: `${entry.size} bytes`,
          expected: `<= ${resolved.maxFileBytes} bytes`,
          suggestion: "Reduce the file size or split assets."
        })
      );
    }
  }
  if (entries.length > resolved.maxFileCount) {
    diagnostics.push(
      createDiagnostic("BC2006", {
        actual: `${entries.length} files`,
        expected: `<= ${resolved.maxFileCount}`
      })
    );
  }
  const total = entries.reduce((sum, entry) => sum + entry.size, 0);
  if (total > resolved.maxPackageBytes) {
    diagnostics.push(
      createDiagnostic("BC2004", {
        actual: `${total} bytes`,
        expected: `<= ${resolved.maxPackageBytes} bytes`
      })
    );
  }
  return sortDiagnostics(diagnostics);
}

// ../../packages/validator/src/entry.ts
var import_promises2 = require("node:fs/promises");
var import_node_path2 = __toESM(require("node:path"), 1);
function validateEntrySyntax(entry) {
  const diagnostics = [];
  if (typeof entry !== "string" || entry.length === 0) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        expected: "non-empty artifact-relative path"
      })
    );
    return diagnostics;
  }
  if (entry.includes("?") || entry.includes("#")) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        actual: entry,
        expected: "path without query or fragment"
      })
    );
  }
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(entry) || entry.startsWith("\\\\")) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        actual: entry,
        suggestion: "Entry must be an artifact-relative path, not a URL."
      })
    );
  }
  if (entry.includes("\\")) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        actual: entry,
        expected: "POSIX forward-slash path",
        suggestion: "Use / separators."
      })
    );
  }
  if (import_node_path2.default.posix.isAbsolute(entry)) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        actual: entry,
        suggestion: "Entry must be relative to the artifact root."
      })
    );
  }
  const segments = entry.split("/");
  if (segments.some((segment) => segment === "..")) {
    diagnostics.push(
      createDiagnostic("BC2002", {
        field: "entry",
        actual: entry,
        suggestion: "Entry must not leave the artifact root."
      })
    );
  }
  if (segments.some((segment) => segment === "")) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        actual: entry,
        suggestion: "Empty path segments are not allowed."
      })
    );
  }
  const ext = import_node_path2.default.posix.extname(entry).toLowerCase();
  if (ext !== ".html" && ext !== ".htm") {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        actual: entry,
        expected: ".html or .htm"
      })
    );
  }
  return diagnostics;
}
async function resolveEntryExact(root, relPath) {
  let current = root;
  for (const segment of relPath.split("/")) {
    let entries;
    try {
      entries = await (0, import_promises2.readdir)(current);
    } catch {
      return null;
    }
    const exact = entries.find((name) => name === segment);
    if (exact === void 0) {
      return null;
    }
    current = import_node_path2.default.join(current, exact);
  }
  return current;
}
async function validateEntry(root, entry) {
  const diagnostics = validateEntrySyntax(entry);
  if (typeof entry !== "string" || entry.length === 0) {
    return diagnostics;
  }
  const usable = !/^[a-z][a-z0-9+.-]*:\/\//i.test(entry) && !entry.includes("\\") && !entry.split("/").includes("..") && !import_node_path2.default.posix.isAbsolute(entry);
  if (!usable) {
    return diagnostics;
  }
  const resolved = await resolveEntryExact(root, entry);
  if (resolved === null) {
    diagnostics.push(
      createDiagnostic("BC2001", {
        file: entry,
        field: "entry",
        actual: entry
      })
    );
    return diagnostics;
  }
  const info = await (0, import_promises2.stat)(resolved);
  if (!info.isFile()) {
    diagnostics.push(
      createDiagnostic("BC2001", {
        file: entry,
        field: "entry",
        actual: entry,
        expected: "file"
      })
    );
  }
  return diagnostics;
}

// ../../packages/validator/src/network.ts
function parseNetworkOrigin(value) {
  if (value.includes("*")) {
    return { ok: false, code: "BC5002", reason: "Wildcards are not allowed." };
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    return { ok: false, code: "BC5001", reason: "Not a valid URL." };
  }
  if (url.protocol !== "https:") {
    return {
      ok: false,
      code: "BC5001",
      reason: "Spec 1 network permissions require HTTPS."
    };
  }
  if (url.username !== "" || url.password !== "") {
    return {
      ok: false,
      code: "BC5001",
      reason: "Credentials are not allowed in an origin."
    };
  }
  if (url.pathname !== "" && url.pathname !== "/") {
    return {
      ok: false,
      code: "BC5001",
      reason: "Path is not allowed in an origin."
    };
  }
  if (url.search !== "" || url.hash !== "") {
    return {
      ok: false,
      code: "BC5001",
      reason: "Query and fragment are not allowed in an origin."
    };
  }
  if (url.hostname === "") {
    return { ok: false, code: "BC5001", reason: "Host is required." };
  }
  const isDefaultPort = url.port === "" || url.port === "443";
  return {
    ok: true,
    origin: isDefaultPort ? `https://${url.hostname}` : `https://${url.hostname}:${url.port}`
  };
}
function validateNetworkEntries(values) {
  const diagnostics = [];
  const seen = /* @__PURE__ */ new Set();
  values.forEach((value, index) => {
    const field = `permissions.network[${index}]`;
    if (typeof value !== "string" || value.length === 0) {
      diagnostics.push(
        createDiagnostic("BC5001", {
          field,
          actual: typeof value === "string" ? value : String(value),
          expected: "canonical HTTPS origin"
        })
      );
      return;
    }
    const result = parseNetworkOrigin(value);
    if (!result.ok) {
      diagnostics.push(
        createDiagnostic(result.code, {
          field,
          actual: value,
          expected: "https://host or https://host:port",
          suggestion: result.reason
        })
      );
      return;
    }
    if (seen.has(result.origin)) {
      diagnostics.push(
        createDiagnostic("BC5001", {
          severity: "warning",
          field,
          actual: value,
          suggestion: "Duplicate network origins are removed by normalization."
        })
      );
    }
    seen.add(result.origin);
  });
  return diagnostics;
}

// ../../packages/validator/src/manifest-validation.ts
var TOP_LEVEL_FIELDS = /* @__PURE__ */ new Set([
  "spec",
  "entry",
  "display",
  "input",
  "permissions"
]);
var DISPLAY_FIELDS = /* @__PURE__ */ new Set(["orientation", "aspectRatio"]);
var PERMISSION_FIELDS = /* @__PURE__ */ new Set(["network", "fullscreen"]);
var ORIENTATION_SET = new Set(ORIENTATIONS);
var INPUT_SET = new Set(INPUT_DEVICES);
function validateManifest(manifest) {
  const diagnostics = [];
  if (typeof manifest !== "object" || manifest === null || Array.isArray(manifest)) {
    diagnostics.push(createDiagnostic("BC1002"));
    return diagnostics;
  }
  const record = manifest;
  for (const key of Object.keys(record)) {
    if (!TOP_LEVEL_FIELDS.has(key)) {
      diagnostics.push(
        createDiagnostic("BC1005", {
          severity: "warning",
          field: key,
          actual: key,
          suggestion: "Unknown fields are ignored."
        })
      );
    }
  }
  const spec = record["spec"];
  if (spec === void 0) {
    diagnostics.push(
      createDiagnostic("BC1003", {
        field: "spec",
        message: "spec is required; only spec 1 is supported."
      })
    );
  } else if (typeof spec !== "number" || !Number.isInteger(spec)) {
    diagnostics.push(
      createDiagnostic("BC1003", {
        field: "spec",
        actual: String(spec),
        expected: "integer"
      })
    );
  } else if (!SUPPORTED_SPEC_VERSIONS.includes(spec)) {
    diagnostics.push(
      createDiagnostic("BC1003", {
        field: "spec",
        actual: String(spec),
        expected: "1"
      })
    );
  }
  const entry = record["entry"];
  if (entry === void 0) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        message: "entry is required."
      })
    );
  } else if (typeof entry !== "string" || entry.length === 0) {
    diagnostics.push(
      createDiagnostic("BC1004", {
        field: "entry",
        actual: entry === void 0 ? void 0 : String(entry),
        expected: "non-empty string"
      })
    );
  }
  const display = record["display"];
  if (display !== void 0) {
    if (typeof display !== "object" || display === null || Array.isArray(display)) {
      diagnostics.push(
        createDiagnostic("BC1006", { field: "display", expected: "object" })
      );
    } else {
      const d = display;
      for (const key of Object.keys(d)) {
        if (!DISPLAY_FIELDS.has(key)) {
          diagnostics.push(
            createDiagnostic("BC1005", {
              severity: "warning",
              field: `display.${key}`,
              actual: key
            })
          );
        }
      }
      const orientation = d["orientation"];
      if (orientation !== void 0 && (typeof orientation !== "string" || !ORIENTATION_SET.has(orientation))) {
        diagnostics.push(
          createDiagnostic("BC1006", {
            field: "display.orientation",
            actual: String(orientation),
            expected: ORIENTATIONS.join(" | ")
          })
        );
      }
      const aspectRatio = d["aspectRatio"];
      if (aspectRatio !== void 0 && (typeof aspectRatio !== "string" || !ASPECT_RATIO_PATTERN.test(aspectRatio))) {
        diagnostics.push(
          createDiagnostic("BC1006", {
            field: "display.aspectRatio",
            actual: typeof aspectRatio === "string" ? aspectRatio : String(aspectRatio),
            expected: "positiveInteger:positiveInteger"
          })
        );
      }
    }
  }
  const input = record["input"];
  if (input !== void 0) {
    if (!Array.isArray(input)) {
      diagnostics.push(
        createDiagnostic("BC1007", { field: "input", expected: "array" })
      );
    } else {
      input.forEach((value, index) => {
        if (typeof value !== "string" || !INPUT_SET.has(value)) {
          diagnostics.push(
            createDiagnostic("BC1007", {
              field: `input[${index}]`,
              actual: typeof value === "string" ? value : String(value),
              expected: INPUT_DEVICES.join(" | ")
            })
          );
        }
      });
      const seen = /* @__PURE__ */ new Set();
      for (const value of input) {
        if (typeof value === "string" && seen.has(value)) {
          diagnostics.push(
            createDiagnostic("BC1007", {
              severity: "warning",
              field: "input",
              actual: value,
              suggestion: "Duplicate input values are removed by normalization."
            })
          );
        }
        if (typeof value === "string") {
          seen.add(value);
        }
      }
    }
  }
  const permissions = record["permissions"];
  if (permissions !== void 0) {
    if (typeof permissions !== "object" || permissions === null || Array.isArray(permissions)) {
      diagnostics.push(
        createDiagnostic("BC1008", {
          field: "permissions",
          expected: "object"
        })
      );
    } else {
      const p = permissions;
      for (const key of Object.keys(p)) {
        if (!PERMISSION_FIELDS.has(key)) {
          diagnostics.push(
            createDiagnostic("BC1005", {
              severity: "warning",
              field: `permissions.${key}`,
              actual: key,
              suggestion: "Unknown permissions never grant capability."
            })
          );
        }
      }
      if (p["network"] !== void 0) {
        if (!Array.isArray(p["network"])) {
          diagnostics.push(
            createDiagnostic("BC1008", {
              field: "permissions.network",
              expected: "array"
            })
          );
        } else {
          diagnostics.push(...validateNetworkEntries(p["network"]));
        }
      }
      if (p["fullscreen"] !== void 0 && typeof p["fullscreen"] !== "boolean") {
        diagnostics.push(
          createDiagnostic("BC1008", {
            field: "permissions.fullscreen",
            actual: String(p["fullscreen"]),
            expected: "boolean"
          })
        );
      }
    }
  }
  return sortDiagnostics(diagnostics);
}

// ../../packages/validator/src/runtime.ts
var import_promises3 = require("node:fs/promises");
var SCAN_SIZE_LIMIT = 1024 * 1024;
var REMOTE_SCRIPT_SRC_RE = /<script\b[^>]*\bsrc\s*=\s*["'](https?:\/\/[^"']+)["']/gi;
var REMOTE_IMPORT_RE = /(?:import\s*\(\s*["']|from\s*["'])(https?:\/\/[^"']+)/gi;
var SERVICE_WORKER_RE = /(?:navigator\s*\.\s*)?serviceWorker\s*\.\s*register\s*\(/i;
var WORKER_RE = /new\s+Worker\s*\(/i;
var IFRAME_RE = /<iframe\b|<frame\b/i;
var WINDOW_OPEN_RE = /window\s*\.\s*open\s*\(/i;
var SECRET_FILE_SUFFIXES = [".env", ".pem", ".key", ".p12", ".pfx"];
var PRIVATE_KEY_RE = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i;
async function validateRuntimeCompatibility(entries, _entryAbsPath) {
  const diagnostics = [];
  const scanTargets = entries.filter((entry) => {
    const lower = entry.relPath.toLowerCase();
    return lower.endsWith(".html") || lower.endsWith(".htm") || lower.endsWith(".js") || lower.endsWith(".mjs");
  });
  for (const entry of scanTargets) {
    if (entry.size > SCAN_SIZE_LIMIT) {
      continue;
    }
    let text;
    try {
      text = await (0, import_promises3.readFile)(entry.absPath, "utf8");
    } catch {
      continue;
    }
    const file = entry.relPath;
    for (const match of text.matchAll(REMOTE_SCRIPT_SRC_RE)) {
      diagnostics.push(
        createDiagnostic("BC3001", {
          file,
          actual: match[1],
          suggestion: "Executable code must ship inside the artifact."
        })
      );
    }
    for (const match of text.matchAll(REMOTE_IMPORT_RE)) {
      diagnostics.push(
        createDiagnostic("BC3001", {
          file,
          actual: match[1],
          suggestion: "Remote imports are not allowed."
        })
      );
    }
    if (SERVICE_WORKER_RE.test(text)) {
      diagnostics.push(
        createDiagnostic("BC3003", {
          file,
          suggestion: "Service workers are not supported in Spec 1."
        })
      );
    }
    if (WORKER_RE.test(text)) {
      diagnostics.push(
        createDiagnostic("BC3002", {
          file,
          suggestion: "Dedicated workers are not supported yet."
        })
      );
    }
    if (IFRAME_RE.test(text)) {
      diagnostics.push(
        createDiagnostic("BC3004", {
          file,
          suggestion: "Embedded frames are not supported."
        })
      );
    }
    if (WINDOW_OPEN_RE.test(text)) {
      diagnostics.push(
        createDiagnostic("BC3005", {
          severity: "warning",
          file,
          suggestion: "Top/popup navigation is restricted at runtime."
        })
      );
    }
  }
  return sortDiagnostics(diagnostics);
}
async function detectSecrets(entries) {
  const diagnostics = [];
  for (const entry of entries) {
    const lower = entry.relPath.toLowerCase();
    const name = lower.split("/").pop() ?? lower;
    if (SECRET_FILE_SUFFIXES.some((suffix) => name.endsWith(suffix))) {
      diagnostics.push(
        createDiagnostic("BC6001", {
          severity: "warning",
          file: entry.relPath,
          message: "Potential secret detected. Verify this file must ship in a browser game."
        })
      );
      continue;
    }
    if (entry.size <= SCAN_SIZE_LIMIT && (lower.endsWith(".js") || lower.endsWith(".json") || lower.endsWith(".html") || lower.endsWith(".txt"))) {
      try {
        const head = (await (0, import_promises3.readFile)(entry.absPath, "utf8")).slice(0, 4096);
        if (PRIVATE_KEY_RE.test(head)) {
          diagnostics.push(
            createDiagnostic("BC6001", {
              severity: "warning",
              file: entry.relPath,
              message: "Potential private key material detected."
            })
          );
        }
      } catch {
      }
    }
  }
  return diagnostics;
}

// ../../packages/validator/src/validate.ts
async function validateProject(dir, options = {}) {
  const diagnostics = [];
  const manifestPath = import_node_path3.default.join(dir, MANIFEST_FILE_NAME);
  let rawManifest;
  let manifest;
  try {
    const text = await (0, import_promises4.readFile)(manifestPath, "utf8");
    const parsed = parseManifest(text);
    if (!parsed.ok) {
      diagnostics.push(
        createDiagnostic("BC1002", {
          file: MANIFEST_FILE_NAME,
          message: parsed.error
        })
      );
    } else {
      rawManifest = parsed.manifest;
      manifest = normalizeManifest(parsed.manifest);
      diagnostics.push(...validateManifest(rawManifest));
    }
  } catch (err2) {
    if (err2.code === "ENOENT") {
      diagnostics.push(
        createDiagnostic("BC1001", { file: MANIFEST_FILE_NAME })
      );
    } else {
      diagnostics.push(
        createDiagnostic("BC9001", {
          file: MANIFEST_FILE_NAME,
          message: `Cannot read manifest: ${err2.message}`
        })
      );
    }
  }
  let entries = [];
  try {
    entries = await collectArtifactEntries(dir);
  } catch (err2) {
    diagnostics.push(
      createDiagnostic("BC9001", {
        message: `Cannot walk artifact root: ${err2.message}`
      })
    );
  }
  diagnostics.push(...validateArtifact(entries, options.limits));
  if (rawManifest !== void 0 && manifest !== void 0) {
    diagnostics.push(...await validateEntry(dir, manifest.entry));
    diagnostics.push(
      ...await validateRuntimeCompatibility(
        entries,
        import_node_path3.default.join(dir, ...manifest.entry.split("/"))
      )
    );
    if (options.detectSecrets !== false) {
      diagnostics.push(...await detectSecrets(entries));
    }
  }
  const sorted = sortDiagnostics(diagnostics);
  const errors = sorted.filter((d) => d.severity === "error").length;
  const warnings = sorted.filter((d) => d.severity === "warning").length;
  const infos = sorted.filter((d) => d.severity === "info").length;
  const validation = errors > 0 ? "fail" : warnings > 0 ? "pass_with_warnings" : "pass";
  return {
    validation,
    diagnostics: sorted,
    manifest,
    errors,
    warnings,
    infos
  };
}

// ../../packages/validator/src/index.ts
var VALIDATOR_VERSION = "0.1.0";

// src/version.ts
var CLI_VERSION = "0.1.0";

// src/commands/init.ts
var import_promises5 = require("node:fs/promises");
var import_node_path4 = __toESM(require("node:path"), 1);
var import_promises6 = require("node:readline/promises");

// src/output/result.ts
function printJson(envelope) {
  process.stdout.write(JSON.stringify(envelope, null, 2) + "\n");
}

// src/commands/init-contract.ts
function commaSeparated(value) {
  return value.split(",").map((part) => part.trim()).filter(Boolean);
}
function parseInputDevices(value) {
  if (value.trim().toLowerCase() === "none") return [];
  const values = commaSeparated(value);
  const invalid = values.filter(
    (candidate) => !INPUT_DEVICES.includes(candidate)
  );
  if (values.length === 0 || invalid.length > 0) {
    throw new Error(
      `input must be a comma-separated subset of ${INPUT_DEVICES.join(", ")}, or none`
    );
  }
  return values;
}
function parseOrientation(value) {
  const normalized = value.trim().toLowerCase();
  if (!ORIENTATIONS.includes(normalized)) {
    throw new Error(`orientation must be one of ${ORIENTATIONS.join(", ")}`);
  }
  return normalized;
}
function parseFullscreen(value) {
  const normalized = value.trim().toLowerCase();
  if (["yes", "true", "required"].includes(normalized)) return true;
  if (["no", "false", "not-required"].includes(normalized)) return false;
  throw new Error("fullscreen must be yes or no");
}
function parseNetworkOrigins(value) {
  if (value.trim().toLowerCase() === "none") return [];
  const origins = commaSeparated(value);
  if (origins.length === 0) {
    throw new Error("network must be comma-separated HTTPS origins, or none");
  }
  for (const origin of origins) {
    let url;
    try {
      url = new URL(origin);
    } catch {
      throw new Error(`network origin is not a valid URL: ${origin}`);
    }
    if (url.protocol !== "https:" || url.origin !== origin || url.username || url.password) {
      throw new Error(
        `network origin must be a canonical HTTPS origin: ${origin}`
      );
    }
  }
  return origins;
}
function buildRuntimeContractManifest(entry, answers) {
  const fullscreen = parseFullscreen(answers.fullscreen);
  const network = parseNetworkOrigins(answers.network);
  const permissions = {};
  if (fullscreen) permissions.fullscreen = true;
  if (network.length > 0) permissions.network = network;
  return normalizeManifest({
    spec: 1,
    entry,
    display: { orientation: parseOrientation(answers.orientation) },
    input: parseInputDevices(answers.input),
    permissions
  });
}
function starterManifest(entry) {
  return buildRuntimeContractManifest(entry, {
    input: "none",
    orientation: "any",
    fullscreen: "no",
    network: "none"
  });
}

// src/commands/init.ts
var STARTER_INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Buildcade Game</title>
  </head>
  <body>
    <canvas id="game" width="640" height="360"></canvas>
    <script src="game.js"></script>
  </body>
</html>
`;
var STARTER_GAME_JS = `// Buildcade starter game (Spec 1)
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let frame = 0;
function loop() {
  ctx.fillStyle = "#101820";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f2aa4c";
  ctx.fillRect(frame % (canvas.width - 40), 160, 40, 40);
  frame += 2;
  requestAnimationFrame(loop);
}
loop();
`;
var ZERO_CONFIG_CANDIDATES = [
  "index.html",
  "dist/index.html",
  "build/index.html"
];
async function isFile(target) {
  try {
    return (await (0, import_promises5.stat)(target)).isFile();
  } catch {
    return false;
  }
}
var CONTRACT_FIELDS = [
  "input",
  "orientation",
  "fullscreen",
  "network"
];
async function runtimeContractAnswers(opts) {
  const answers = {
    input: opts.input,
    orientation: opts.orientation,
    fullscreen: opts.fullscreen,
    network: opts.network
  };
  const missing = CONTRACT_FIELDS.filter((field) => !answers[field]?.trim());
  const interactive = !opts.json && process.stdin.isTTY && process.stdout.isTTY;
  if (missing.length > 0 && !interactive) {
    throw new Error(
      `Existing projects require explicit Runtime Contract declarations: ${missing.join(
        ", "
      )}. Use --input, --orientation, --fullscreen, and --network.`
    );
  }
  if (missing.length > 0) {
    const prompt = (0, import_promises6.createInterface)({
      input: process.stdin,
      output: process.stdout
    });
    try {
      if (!answers.input?.trim()) {
        answers.input = await prompt.question(
          "Input devices (keyboard,mouse,touch,gamepad; comma-separated, or none): "
        );
      }
      if (!answers.orientation?.trim()) {
        answers.orientation = await prompt.question(
          "Display orientation (any, portrait, landscape): "
        );
      }
      if (!answers.fullscreen?.trim()) {
        answers.fullscreen = await prompt.question(
          "Fullscreen required (yes or no): "
        );
      }
      if (!answers.network?.trim()) {
        answers.network = await prompt.question(
          "Network origins (comma-separated HTTPS origins, or none): "
        );
      }
    } finally {
      prompt.close();
    }
  }
  return answers;
}
function registerInitCommand(program3) {
  program3.command("init [dir]").description("Create buildcade.json for a local project").option("--json", "machine-readable output").option(
    "--input <devices>",
    "comma-separated keyboard,mouse,touch,gamepad; or none"
  ).option(
    "--orientation <orientation>",
    "display orientation: any, portrait, or landscape"
  ).option(
    "--fullscreen <required>",
    "whether fullscreen is required: yes or no"
  ).option(
    "--network <origins>",
    "comma-separated canonical HTTPS origins; or none"
  ).action(async (dirArg, opts) => {
    const root = import_node_path4.default.resolve(process.cwd(), dirArg ?? ".");
    const manifestPath = import_node_path4.default.join(root, MANIFEST_FILE_NAME);
    if (await isFile(manifestPath)) {
      const text = await (0, import_promises5.readFile)(manifestPath, "utf8");
      const parsed = parseManifest(text);
      if (opts.json) {
        printJson({
          schemaVersion: 1,
          command: "init",
          ok: parsed.ok,
          result: {
            manifest: MANIFEST_FILE_NAME,
            created: false,
            valid: parsed.ok
          },
          diagnostics: parsed.ok ? void 0 : [
            {
              code: "BC1002",
              severity: "error",
              message: parsed.error,
              file: MANIFEST_FILE_NAME
            }
          ]
        });
        process.exitCode = parsed.ok ? 0 : 1;
      } else {
        console.log("buildcade.json already exists.");
        if (!parsed.ok) {
          console.error(`error: ${parsed.error}`);
          process.exitCode = 1;
        }
      }
      return;
    }
    const candidates = [];
    for (const candidate of ZERO_CONFIG_CANDIDATES) {
      if (await isFile(import_node_path4.default.join(root, candidate))) {
        candidates.push(candidate);
      }
    }
    if (candidates.length > 1) {
      const message = `Multiple build outputs detected: ${candidates.join(", ")}. Choose one artifact root explicitly.`;
      if (opts.json) {
        printJson({
          schemaVersion: 1,
          command: "init",
          ok: false,
          result: {},
          diagnostics: [
            {
              code: "BC9002",
              severity: "error",
              message,
              actual: candidates.join(", ")
            }
          ]
        });
      } else {
        console.error(message);
        console.error(
          "Hint: run buildcade init inside the intended output directory."
        );
      }
      process.exitCode = 1;
      return;
    }
    const entry = candidates.length === 1 ? candidates[0] : "index.html";
    let createdStarter = false;
    if (candidates.length === 0) {
      createdStarter = true;
      await (0, import_promises5.mkdir)(root, { recursive: true });
      await (0, import_promises5.writeFile)(
        import_node_path4.default.join(root, "index.html"),
        STARTER_INDEX_HTML,
        "utf8"
      );
      await (0, import_promises5.writeFile)(import_node_path4.default.join(root, "game.js"), STARTER_GAME_JS, "utf8");
    }
    let manifest;
    try {
      manifest = createdStarter ? starterManifest(entry) : buildRuntimeContractManifest(
        entry,
        await runtimeContractAnswers(opts)
      );
    } catch (error) {
      const message = error.message;
      if (opts.json) {
        printJson({
          schemaVersion: 1,
          command: "init",
          ok: false,
          result: {},
          diagnostics: [{ code: "BC9003", severity: "error", message }]
        });
      } else {
        console.error(`error: ${message}`);
      }
      process.exitCode = 1;
      return;
    }
    await (0, import_promises5.writeFile)(
      manifestPath,
      JSON.stringify(manifest, null, 2) + "\n",
      "utf8"
    );
    if (opts.json) {
      printJson({
        schemaVersion: 1,
        command: "init",
        ok: true,
        result: {
          manifest: MANIFEST_FILE_NAME,
          spec: GAME_SPEC_VERSION,
          entry,
          input: manifest.input,
          display: manifest.display,
          permissions: manifest.permissions,
          created: true
        }
      });
    } else {
      console.log("Created buildcade.json");
      console.log(`Spec: ${GAME_SPEC_VERSION}`);
      console.log(`Entry: ${entry}`);
      console.log(`Input: ${manifest.input?.join(", ") || "none"}`);
      console.log(`Orientation: ${manifest.display?.orientation ?? "any"}`);
      console.log(
        `Fullscreen: ${manifest.permissions?.fullscreen ? "required" : "not required"}`
      );
      console.log(
        `Network: ${manifest.permissions?.network?.join(", ") || "none"}`
      );
      if (createdStarter) {
        console.log("Starter files: index.html, game.js");
      }
      console.log("Next:");
      console.log("  buildcade validate");
    }
  });
}

// src/commands/validate.ts
var import_node_path5 = __toESM(require("node:path"), 1);

// src/output/render.ts
function renderDiagnostics(diagnostics, stream) {
  for (const diagnostic of diagnostics) {
    stream.write(
      `${diagnostic.severity.toUpperCase()} ${diagnostic.code}  ${diagnostic.file ?? ""}
`
    );
    stream.write(`  ${diagnostic.message}
`);
    if (diagnostic.field !== void 0) {
      stream.write(`  field: ${diagnostic.field}
`);
    }
    if (diagnostic.actual !== void 0) {
      stream.write(`  actual: ${diagnostic.actual}
`);
    }
    if (diagnostic.expected !== void 0) {
      stream.write(`  expected: ${diagnostic.expected}
`);
    }
    if (diagnostic.suggestion !== void 0) {
      stream.write(`  fix: ${diagnostic.suggestion}
`);
    }
    stream.write("\n");
  }
}

// src/commands/validate.ts
function registerValidateCommand(program3) {
  program3.command("validate [dir]").description("Validate a game artifact root").option("--json", "machine-readable output").option("--quiet", "suppress success output").action(
    async (dirArg, opts) => {
      const root = import_node_path5.default.resolve(process.cwd(), dirArg ?? ".");
      let result;
      try {
        result = await validateProject(root);
      } catch (err2) {
        console.error(`error: ${err2.message}`);
        process.exitCode = 9;
        return;
      }
      const ok = result.validation !== "fail";
      if (opts.json) {
        printJson({
          schemaVersion: 1,
          command: "validate",
          ok,
          result: {
            validation: result.validation,
            spec: result.manifest?.spec ?? GAME_SPEC_VERSION,
            artifactRoot: root,
            errors: result.errors,
            warnings: result.warnings,
            infos: result.infos
          },
          diagnostics: result.diagnostics
        });
        process.exitCode = ok ? 0 : 1;
        return;
      }
      if (!ok) {
        process.stderr.write(
          `Buildcade validation failed.

${result.errors} errors, ${result.warnings} warnings

`
        );
        renderDiagnostics(result.diagnostics, process.stderr);
        process.stderr.write("Validation failed.\n");
        process.exitCode = 1;
        return;
      }
      if (result.warnings > 0) {
        process.stderr.write(
          `Buildcade validation passed with warnings (${result.warnings} warnings).
`
        );
        renderDiagnostics(result.diagnostics, process.stderr);
        if (!opts.quiet) {
          console.log("Buildcade validation passed with warnings.");
        }
      } else if (!opts.quiet) {
        console.log("Buildcade validation passed.");
      }
    }
  );
}

// src/commands/pack.ts
var import_node_crypto = require("node:crypto");
var import_promises7 = require("node:fs/promises");
var import_node_path6 = __toESM(require("node:path"), 1);

// ../../node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/index.mjs
var import_module = require("module");
var require2 = (0, import_module.createRequire)("/");
var _a;
var Worker;
var isMarkedAsUntransferable;
try {
  _a = require2("worker_threads"), Worker = _a.Worker, isMarkedAsUntransferable = _a.isMarkedAsUntransferable;
} catch (e) {
}
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b[i2] = start += 1 << eb[i2 - 1];
  }
  var r = new i32(b[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j = b[i2]; j < b[i2 + 1]; ++j) {
      r[j] = j - b[i2] << 5 | i2;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i2 = 0;
  var l = new u16(mb);
  for (; i2 < s; ++i2) {
    if (cd[i2])
      ++l[cd[i2] - 1];
  }
  var le = new u16(mb);
  for (i2 = 1; i2 < mb; ++i2) {
    le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0; i2 < s; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v = le[cd[i2] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i2 = 0; i2 < s; ++i2) {
      if (cd[i2]) {
        co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
      }
    }
  }
  return co;
});
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i2 = 0; i2 < d.length; ++i2) {
    if (d[i2])
      t.push({ s: i2, f: d[i2] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i22].f ? i0++ : i22++];
    r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i2 = 1; i2 < s; ++i2) {
    if (t2[i2].s > maxSym)
      maxSym = t2[i2].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i2 = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i2 < s; ++i2) {
      var i2_1 = t2[i2].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i2].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i2;
    }
    for (; i2 >= 0 && dt; --i2) {
      var i2_3 = t2[i2].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i2 = 1; i2 <= s; ++i2) {
    if (c[i2] == cln && i2 != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i2];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i2 = 0; i2 < cl.length; ++i2)
    l += cf[i2] * cl[i2];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i2 = 0; i2 < s; ++i2)
    out[o + i2 + 4] = dat[i2];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i2 = 0; i2 < lclt.length; ++i2)
    ++lcfreq[lclt[i2] & 31];
  for (var i2 = 0; i2 < lcdt.length; ++i2)
    ++lcfreq[lcdt[i2] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i2 = 0; i2 < nlcc; ++i2)
      wbits(out, p + 3 * i2, lct[clim[i2]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i2 = 0; i2 < clct.length; ++i2) {
        var len = clct[i2] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i2] >> 5 & 127), p += clct[i2] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i2 = 0; i2 < li; ++i2) {
    var sym = syms[i2];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i3) {
      return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i2 + 2 < s; ++i2) {
      var hv = hsh(i2);
      var imod = i2 & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i2) {
        var rem = s - i2;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
          li = lc_1 = eb = 0, bs = i2;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i2 - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i2);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i2 + l] == dat[i2 + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i2 - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i2 + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i2];
          ++lf[dat[i2]];
        }
      }
    }
    for (i2 = Math.max(i2, wi); i2 < s; ++i2) {
      syms[li++] = dat[i2];
      ++lf[dat[i2]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i2, st.w = wi;
    }
  } else {
    for (var i2 = st.w || 0; i2 < s + lst; i2 += 65535) {
      var e = i2 + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i2, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ (function() {
  var t = new Int32Array(256);
  for (var i2 = 0; i2 < 256; ++i2) {
    var c = i2, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i2] = c;
  }
  return t;
})();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i2 = 0; i2 < d.length; ++i2)
        cr = crct[cr & 255 ^ d[i2]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var fltn = function(d, p, t, o) {
  for (var k in d) {
    var val = d[k], n = p + k, op = o;
    if (Array.isArray(val))
      op = mrg(o, val[1]), val = val[0];
    if (ArrayBuffer.isView(val))
      t[n] = [val, op];
    else {
      t[n += "/"] = [new u8(0), op];
      fltn(val, n, t, o);
    }
  }
};
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i2 = 0; i2 < str.length; ++i2)
      ar_1[i2] = str.charCodeAt(i2);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i2 = 0; i2 < l; ++i2) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i2 << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i2);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i2) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
  if (y < 0 || y > 119)
    err(10);
  wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
  if (c != -1) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e);
};
function zipSync(data, opts) {
  if (!opts)
    opts = {};
  var r = {};
  var files = [];
  fltn(data, "", r, opts);
  var o = 0;
  var tot = 0;
  for (var fn in r) {
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var compression = p.level == 0 ? 0 : 8;
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    if (s > 65535)
      err(11);
    var d = compression ? deflateSync(file, p) : file, l = d.length;
    var c = crc();
    c.p(file);
    files.push(mrg(p, {
      size: file.length,
      crc: c.d(),
      c: d,
      f,
      m,
      u: s != fn.length || m && com.length != ms,
      o,
      compression
    }));
    o += 30 + s + exl + l;
    tot += 76 + 2 * (s + exl) + (ms || 0) + l;
  }
  var out = new u8(tot + 22), oe = o, cdl = tot - o;
  for (var i2 = 0; i2 < files.length; ++i2) {
    var f = files[i2];
    wzh(out, f.o, f, f.f, f.u, f.c.length);
    var badd = 30 + f.f.length + exfl(f.extra);
    out.set(f.c, f.o + badd);
    wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
  }
  wzf(out, o, files.length, cdl, oe);
  return out;
}

// src/commands/pack.ts
var ZIP_EPOCH = /* @__PURE__ */ new Date("1980-01-01T00:00:00Z");
var EXCLUDED_TOP_LEVEL = /* @__PURE__ */ new Set([".git", ".buildcade", "node_modules"]);
function isExcluded(relPath) {
  const first = relPath.split("/")[0] ?? relPath;
  if (EXCLUDED_TOP_LEVEL.has(first)) {
    return true;
  }
  const lower = relPath.toLowerCase();
  return lower.startsWith(".env") || lower.startsWith(".env.");
}
function slugify(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "game";
}
async function createArtifactZip(root) {
  const entries = (await collectArtifactEntries(root)).filter(
    (entry) => !entry.isSymbolicLink && !isExcluded(entry.relPath)
  );
  const files = {};
  for (const entry of entries.sort(
    (a, b) => a.relPath.localeCompare(b.relPath)
  )) {
    files[entry.relPath] = new Uint8Array(await (0, import_promises7.readFile)(entry.absPath));
  }
  const bytes = zipSync(files, {
    level: 9,
    mtime: ZIP_EPOCH
  });
  return { bytes, entries: entries.length };
}
function registerPackCommand(program3) {
  program3.command("pack [dir]").description("Pack a validated artifact into a deterministic ZIP").option("-o, --output <path>", "output zip path").option("--json", "machine-readable output").action(
    async (dirArg, opts) => {
      const root = import_node_path6.default.resolve(process.cwd(), dirArg ?? ".");
      const result = await validateProject(root);
      if (result.validation === "fail") {
        if (opts.json) {
          printJson({
            schemaVersion: 1,
            command: "pack",
            ok: false,
            result: {},
            diagnostics: result.diagnostics
          });
        } else {
          process.stderr.write(
            `Pack blocked: validation failed (${result.errors} errors).

`
          );
          renderDiagnostics(result.diagnostics, process.stderr);
        }
        process.exitCode = 1;
        return;
      }
      try {
        const zip = await createArtifactZip(root);
        const zipBytes = zip.bytes;
        const hash = (0, import_node_crypto.createHash)("sha256").update(zipBytes).digest("hex");
        const defaultName = `${slugify(import_node_path6.default.basename(root))}.zip`;
        const outputPath = opts.output ? import_node_path6.default.resolve(process.cwd(), opts.output) : import_node_path6.default.join(root, ".buildcade", defaultName);
        await (0, import_promises7.mkdir)(import_node_path6.default.dirname(outputPath), { recursive: true });
        await (0, import_promises7.writeFile)(outputPath, zipBytes);
        if (opts.json) {
          printJson({
            schemaVersion: 1,
            command: "pack",
            ok: true,
            result: {
              artifactPath: outputPath,
              artifactHash: `sha256:${hash}`,
              sizeBytes: zipBytes.byteLength,
              spec: result.manifest?.spec ?? GAME_SPEC_VERSION,
              warnings: result.warnings
            }
          });
        } else {
          console.log(`Packed ${zip.entries} file(s) -> ${outputPath}`);
          console.log(`SHA-256: ${hash}`);
          if (result.warnings > 0) {
            console.log(`Warnings: ${result.warnings}`);
          }
        }
      } catch (err2) {
        console.error(`error: ${err2.message}`);
        process.exitCode = 3;
      }
    }
  );
}

// src/commands/preview.ts
var import_node_child_process = require("node:child_process");
var import_node_path8 = __toESM(require("node:path"), 1);

// src/preview/server.ts
var import_node_http = require("node:http");
var import_promises8 = require("node:fs/promises");
var import_node_path7 = __toESM(require("node:path"), 1);

// ../../packages/runtime-policy/src/index.ts
var BASE_SANDBOX_TOKENS = ["allow-scripts", "allow-same-origin"];
var DENIED_PERMISSIONS = [
  "camera",
  "microphone",
  "geolocation",
  "payment",
  "usb",
  "xr-spatial-tracking"
];
function dedupe2(values) {
  return [...new Set(values)];
}
function compilePolicy(manifest, options = {}) {
  const environment = options.environment ?? "preview";
  const networkAllowlist = dedupe2(manifest.permissions?.network ?? []);
  const capabilities = [];
  if (manifest.permissions?.fullscreen === true) {
    capabilities.push("fullscreen");
  }
  const csp = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'wasm-unsafe-eval'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "media-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", ...networkAllowlist],
    "frame-src": ["'none'"],
    "object-src": ["'none'"],
    "worker-src": ["'none'"],
    "base-uri": ["'none'"],
    "form-action": ["'none'"]
  };
  return {
    sandboxTokens: [...BASE_SANDBOX_TOKENS],
    csp,
    permissionsPolicy: DENIED_PERMISSIONS.map((feature) => `${feature}=()`),
    networkAllowlist,
    capabilities,
    environment
  };
}
function cspHeader(csp) {
  return Object.entries(csp).map(([directive, values]) => `${directive} ${values.join(" ")};`).join(" ");
}

// src/preview/shell.ts
function buildShellHtml(policy, gameUrl) {
  const sandbox = policy.sandboxTokens.join(" ");
  const frameOrigin = new URL(gameUrl).origin;
  const frameSrc = `frame-src ${frameOrigin};`;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Buildcade Preview</title>
    <style>
      html, body { margin: 0; height: 100%; background: #0b0f14; color: #e8e8e8; font-family: system-ui, sans-serif; }
      #shell { display: flex; flex-direction: column; height: 100%; }
      #viewport { flex: 1; position: relative; }
      #game-frame { width: 100%; height: 100%; border: 0; display: block; }
      #watermark { padding: 6px 12px; background: rgba(11, 15, 20, 0.92); font-size: 12px; letter-spacing: 0.04em; text-align: center; color: #9aa4af; user-select: none; }
    </style>
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; style-src 'unsafe-inline'; ${frameSrc}"
    />
  </head>
  <body>
    <div id="shell">
      <div id="viewport">
        <iframe
          id="game-frame"
          src="${gameUrl}"
          sandbox="${sandbox}"
          title="Buildcade preview"
        ></iframe>
      </div>
      <div id="watermark">Buildcade Preview \xB7 local runtime</div>
    </div>
  </body>
</html>
`;
}

// src/preview/server.ts
var MIME_TYPES = {
  html: "text/html; charset=utf-8",
  htm: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  mjs: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  map: "application/json; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",
  wasm: "application/wasm",
  wav: "audio/wav",
  mp3: "audio/mpeg",
  ogg: "audio/ogg",
  webm: "video/webm",
  mp4: "video/mp4",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf"
};
function mimeFor(target) {
  const ext = import_node_path7.default.extname(target).toLowerCase().replace(".", "");
  return MIME_TYPES[ext] ?? "application/octet-stream";
}
function listen(server, port) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve());
  });
}
function isUnsafeRawPath(rawPath) {
  if (rawPath === void 0) {
    return false;
  }
  let decoded;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch {
    return true;
  }
  return decoded.includes("..") || decoded.includes("\0") || decoded.includes("\\") || rawPath.startsWith("//");
}
function closeServer(server) {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}
function resolveInside(root, pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded.includes("\0") || decoded.includes("..")) {
    return null;
  }
  const rel = decoded.replace(/^\/+/, "");
  const target = import_node_path7.default.resolve(root, rel);
  if (target !== root && !target.startsWith(root + import_node_path7.default.sep)) {
    return null;
  }
  return target;
}
async function serveStatic(root, pathname, entry, req, res, headers) {
  const isHead = req.method === "HEAD";
  const normalized = pathname === "/" || pathname === "" ? entry : pathname.replace(/^\/+/, "");
  const target = resolveInside(root, `/${normalized}`);
  if (target === null) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }
  let info;
  try {
    info = await (0, import_promises8.stat)(target);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  if (!info.isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  res.writeHead(200, {
    "Content-Type": mimeFor(target),
    "Content-Length": info.size,
    ...headers
  });
  if (isHead) {
    res.end();
    return;
  }
  const data = await (0, import_promises8.readFile)(target);
  res.end(data);
}
async function startPreviewServer(root, manifest, options = {}) {
  const policy = compilePolicy(manifest, { environment: "preview" });
  let shellUrl = "";
  let gameUrl = "";
  let shellOrigin = "";
  const shellServer = (0, import_node_http.createServer)((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end("Method Not Allowed");
      return;
    }
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname !== "/") {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(buildShellHtml(policy, gameUrl));
  });
  const gameServer = (0, import_node_http.createServer)((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end("Method Not Allowed");
      return;
    }
    if (isUnsafeRawPath(req.url)) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }
    const url = new URL(req.url ?? "/", "http://localhost");
    void serveStatic(root, url.pathname, manifest.entry, req, res, {
      "Content-Security-Policy": `${cspHeader(policy.csp)} frame-ancestors ${shellOrigin};`,
      "Permissions-Policy": policy.permissionsPolicy.join(", "),
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Cross-Origin-Opener-Policy": "same-origin"
    });
  });
  await Promise.all([
    listen(shellServer, options.shellPort ?? 0),
    listen(gameServer, options.gamePort ?? 0)
  ]);
  const shellPort = shellServer.address().port;
  const gamePort = gameServer.address().port;
  shellUrl = `http://127.0.0.1:${shellPort}`;
  gameUrl = `http://127.0.0.1:${gamePort}`;
  shellOrigin = shellUrl;
  return {
    shellUrl,
    gameUrl,
    shellPort,
    gamePort,
    policy,
    async close() {
      await Promise.all([closeServer(shellServer), closeServer(gameServer)]);
    }
  };
}

// src/commands/preview.ts
function openBrowser(url) {
  let command;
  let args;
  if (process.platform === "win32") {
    command = "cmd";
    args = ["/c", "start", "", url];
  } else if (process.platform === "darwin") {
    command = "open";
    args = [url];
  } else {
    command = "xdg-open";
    args = [url];
  }
  try {
    const child = (0, import_node_child_process.spawn)(command, args, {
      detached: true,
      stdio: "ignore"
    });
    child.unref();
  } catch {
  }
}
function registerPreviewCommand(program3) {
  program3.command("preview [dir]").description("Serve the artifact in a production-like sandboxed preview").option("--no-open", "do not auto-open the browser").option("--json", "machine-readable startup output").action(
    async (dirArg, opts) => {
      const root = import_node_path8.default.resolve(process.cwd(), dirArg ?? ".");
      const result = await validateProject(root);
      if (result.validation === "fail") {
        process.stderr.write("Preview not started.\nValidation failed.\n\n");
        renderDiagnostics(result.diagnostics, process.stderr);
        process.exitCode = 1;
        return;
      }
      const manifest = result.manifest;
      if (manifest === void 0) {
        console.error("error: manifest unavailable");
        process.exitCode = 9;
        return;
      }
      let preview;
      try {
        preview = await startPreviewServer(root, manifest);
      } catch (err2) {
        console.error(
          `error: preview startup failed: ${err2.message}`
        );
        process.exitCode = 7;
        return;
      }
      if (opts.json) {
        printJson({
          schemaVersion: 1,
          command: "preview",
          ok: true,
          result: {
            status: "running",
            url: preview.shellUrl,
            pid: process.pid,
            spec: manifest.spec ?? GAME_SPEC_VERSION
          }
        });
      } else {
        console.log("Preview running:");
        console.log(preview.shellUrl);
        console.log("");
        console.log("Press Ctrl+C to stop.");
      }
      if (opts.open && !opts.json) {
        openBrowser(preview.shellUrl);
      }
      let stopped = false;
      const stop = (signal) => {
        if (stopped) {
          return;
        }
        stopped = true;
        void preview.close().catch(() => void 0).then(() => {
          if (!opts.json) {
            process.stderr.write(`
Preview stopped (${signal}).
`);
          }
          process.exit(0);
        });
      };
      process.once("SIGINT", () => stop("SIGINT"));
      process.once("SIGTERM", () => stop("SIGTERM"));
    }
  );
}

// src/commands/login.ts
var import_node_readline = require("node:readline");

// src/auth/api.ts
var ApiError = class extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = "ApiError";
  }
  status;
  code;
};
function defaultApiUrl() {
  return process.env["BUILDCADE_API_URL"] ?? "http://127.0.0.1:3000";
}
async function apiRequest(apiUrl, pathname, options = {}) {
  const headers = {};
  if (options.token) {
    headers["authorization"] = `Bearer ${options.token}`;
  }
  let body;
  if (options.rawBody) {
    headers["content-type"] = options.contentType ?? "application/octet-stream";
    body = options.rawBody;
  } else if (options.body !== void 0) {
    headers["content-type"] = "application/json";
    body = JSON.stringify(options.body);
  }
  let response;
  try {
    const base = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;
    response = await fetch(new URL(pathname.replace(/^\//, ""), base), {
      method: options.method ?? "GET",
      headers,
      body
    });
  } catch (err2) {
    throw new ApiError(`Network error: ${err2.message}`, 0);
  }
  if (response.status === 204) {
    return void 0;
  }
  const text = await response.text();
  const data = text ? JSON.parse(text) : void 0;
  if (!response.ok) {
    throw new ApiError(
      data?.error?.message ?? `Request failed (${response.status})`,
      response.status,
      data?.error?.code
    );
  }
  return data;
}

// src/auth/credentials.ts
var import_promises9 = require("node:fs/promises");
var import_node_os = __toESM(require("node:os"), 1);
var import_node_path9 = __toESM(require("node:path"), 1);
var DEFAULT_CREDENTIALS_DIR = import_node_path9.default.join(import_node_os.default.homedir(), ".buildcade");
var CREDENTIALS_FILE_NAME = "credentials.json";
async function loadCredentials(dir = DEFAULT_CREDENTIALS_DIR) {
  try {
    const text = await (0, import_promises9.readFile)(import_node_path9.default.join(dir, CREDENTIALS_FILE_NAME), "utf8");
    return JSON.parse(text);
  } catch {
    return null;
  }
}
async function saveCredentials(credentials, dir = DEFAULT_CREDENTIALS_DIR) {
  const file = import_node_path9.default.join(dir, CREDENTIALS_FILE_NAME);
  await (0, import_promises9.mkdir)(dir, { recursive: true });
  await (0, import_promises9.writeFile)(file, JSON.stringify(credentials, null, 2) + "\n", "utf8");
  try {
    await (0, import_promises9.chmod)(file, 384);
  } catch {
  }
}

// src/commands/login.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function readTokenFromStdin() {
  return new Promise((resolve) => {
    const rl = (0, import_node_readline.createInterface)({
      input: process.stdin,
      output: process.stderr
    });
    rl.question("Token: ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
function fail(err2) {
  const error = err2;
  console.error(`error: ${error.message}`);
  process.exitCode = error.status === 401 || error.status === 403 ? 4 : 5;
}
async function finishLogin(apiUrl, data, json) {
  await saveCredentials({
    apiUrl,
    token: data.token,
    user: data.user,
    workspace: data.workspace
  });
  if (json) {
    printJson({
      schemaVersion: 1,
      command: "login",
      ok: true,
      result: {
        authenticated: true,
        user: data.user,
        workspace: data.workspace
      }
    });
  } else {
    console.log(
      `Signed in as ${data.user?.displayName ?? data.user?.id ?? "unknown"}`
    );
  }
}
async function deviceFlowLogin(opts) {
  try {
    const start = await apiRequest(opts.apiUrl, "/api/auth/device/github/start", {
      method: "POST",
      body: {}
    });
    if (opts.json) {
      printJson({
        schemaVersion: 1,
        command: "login",
        ok: true,
        result: {
          status: "awaiting_authorization",
          userCode: start.userCode,
          verificationUri: start.verificationUri
        }
      });
    } else {
      console.log("Open this URL in your browser:");
      console.log(start.verificationUri);
      console.log(`Enter code: ${start.userCode}`);
      console.log("Waiting for authorization...");
    }
    const intervalMs = Math.max(start.interval, 5) * 1e3;
    const deadline = Date.now() + start.expiresIn * 1e3;
    while (Date.now() < deadline) {
      await sleep(intervalMs);
      const poll = await apiRequest(opts.apiUrl, "/api/auth/device/github/poll", {
        method: "POST",
        body: { stateHash: start.stateHash }
      });
      const token = poll.token;
      if (poll.status === "authorized" && token) {
        await finishLogin(
          opts.apiUrl,
          { token, user: poll.user, workspace: poll.workspace },
          opts.json ?? false
        );
        return;
      }
    }
    console.error("error: authorization timed out");
    process.exitCode = 5;
  } catch (err2) {
    fail(err2);
  }
}
async function magicLinkLogin(opts) {
  try {
    await apiRequest(opts.apiUrl, "/api/auth/magic-link/request", {
      method: "POST",
      body: { email: opts.email }
    });
    if (!opts.json) {
      console.log(`Verification link sent to ${opts.email}.`);
      console.log("Open the link, or paste the token below:");
    }
    const token = opts.json ? "" : await readTokenFromStdin();
    if (!token) {
      console.error(
        "error: email verification token required (non-interactive)"
      );
      process.exitCode = 2;
      return;
    }
    const verified = await apiRequest(opts.apiUrl, "/api/auth/magic-link/verify", {
      method: "POST",
      body: { token }
    });
    await finishLogin(opts.apiUrl, verified, opts.json ?? false);
  } catch (err2) {
    fail(err2);
  }
}
function registerLoginCommand(program3) {
  program3.command("login").description("Sign in to Buildcade (GitHub device flow by default)").option("--json", "machine-readable output").option("--api-url <url>", "API base URL", defaultApiUrl()).option("--email <email>", "sign in with an email verification link").option("--dev", "use the local developer credential endpoint").action(
    async (opts) => {
      if (opts.dev) {
        await devLogin(opts.apiUrl, opts.json ?? false);
        return;
      }
      if (opts.email) {
        await magicLinkLogin({
          apiUrl: opts.apiUrl,
          email: opts.email,
          json: opts.json
        });
        return;
      }
      await deviceFlowLogin(opts);
    }
  );
}
async function devLogin(apiUrl, json) {
  try {
    const data = await apiRequest(apiUrl, "/api/auth/cli/login", { method: "POST", body: {} });
    await finishLogin(apiUrl, data, json);
  } catch (err2) {
    fail(err2);
  }
}

// src/commands/whoami.ts
function registerWhoamiCommand(program3) {
  program3.command("whoami").description("Show the current CLI identity and workspace").option("--json", "machine-readable output").action(async (opts) => {
    const credentials = await loadCredentials();
    if (!credentials?.token) {
      if (opts.json) {
        printJson({
          schemaVersion: 1,
          command: "whoami",
          ok: false,
          result: { authenticated: false }
        });
      } else {
        console.log("Not signed in.");
        console.log("Run:");
        console.log("  buildcade login");
      }
      process.exitCode = 4;
      return;
    }
    try {
      const me = await apiRequest(credentials.apiUrl, "/api/me", { token: credentials.token });
      if (opts.json) {
        printJson({
          schemaVersion: 1,
          command: "whoami",
          ok: true,
          result: {
            authenticated: true,
            user: me.user,
            workspace: me.workspace
          }
        });
      } else {
        console.log(`Signed in as ${me.user.displayName ?? me.user.id}`);
        console.log(`Workspace: ${me.workspace.id}`);
      }
    } catch (err2) {
      console.error(`error: ${err2.message}`);
      process.exitCode = 5;
    }
  });
}

// src/commands/upload.ts
var import_node_crypto2 = require("node:crypto");
var import_node_path10 = __toESM(require("node:path"), 1);
async function waitForBuild(apiUrl, token, buildId, timeoutMs = 12e4) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const status = await apiRequest(
      apiUrl,
      `/api/builds/${buildId}`,
      { token }
    );
    if (["ready", "failed", "quarantined"].includes(status.build.status)) {
      return status;
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
  }
  throw new ApiError("Timed out waiting for build processing.", 0);
}
function registerUploadCommand(program3) {
  program3.command("upload [dir]").description("Validate, pack and upload an artifact to Buildcade").requiredOption("--game <id>", "target game id").option("--json", "machine-readable output").option("--wait", "wait for build processing to finish").option("--api-url <url>", "API base URL").action(
    async (dirArg, opts) => {
      const root = import_node_path10.default.resolve(process.cwd(), dirArg ?? ".");
      const validation = await validateProject(root);
      if (validation.validation === "fail") {
        process.stderr.write(
          `Upload blocked: validation failed (${validation.errors} errors).

`
        );
        renderDiagnostics(validation.diagnostics, process.stderr);
        process.exitCode = 1;
        return;
      }
      const manifest = validation.manifest;
      if (!manifest) {
        console.error("error: manifest unavailable");
        process.exitCode = 9;
        return;
      }
      const credentials = await loadCredentials();
      if (!credentials?.token) {
        console.error("Not signed in. Run: buildcade login");
        process.exitCode = 4;
        return;
      }
      const apiUrl = opts.apiUrl ?? credentials.apiUrl;
      try {
        const zip = await createArtifactZip(root);
        const sha256 = (0, import_node_crypto2.createHash)("sha256").update(zip.bytes).digest("hex");
        const sizeBytes = zip.bytes.length;
        const session = await apiRequest(apiUrl, "/api/upload-sessions", {
          method: "POST",
          token: credentials.token,
          body: {
            gameId: opts.game,
            expectedSizeBytes: sizeBytes,
            expectedHash: sha256
          }
        });
        await apiRequest(
          apiUrl,
          `/api/upload-sessions/${session.session.id}/body`,
          {
            method: "PUT",
            token: credentials.token,
            rawBody: Buffer.from(zip.bytes)
          }
        );
        const completed = await apiRequest(apiUrl, `/api/upload-sessions/${session.session.id}/complete`, {
          method: "POST",
          token: credentials.token,
          body: {
            sha256,
            sizeBytes,
            manifest
          }
        });
        if (opts.wait) {
          const status = await waitForBuild(
            apiUrl,
            credentials.token,
            completed.build.id
          );
          const terminal = status.build.status;
          if (terminal === "ready") {
            if (opts.json) {
              printJson({
                schemaVersion: 1,
                command: "upload",
                ok: true,
                result: {
                  gameId: completed.gameId,
                  buildId: completed.build.id,
                  buildNumber: completed.build.buildNumber,
                  artifactHash: completed.artifactHash,
                  status: terminal
                },
                diagnostics: []
              });
            } else {
              console.log(`Build #${completed.build.buildNumber} is Ready.`);
            }
            return;
          }
          if (opts.json) {
            printJson({
              schemaVersion: 1,
              command: "upload",
              ok: false,
              result: {
                gameId: completed.gameId,
                buildId: completed.build.id,
                buildNumber: completed.build.buildNumber,
                artifactHash: completed.artifactHash,
                status: terminal
              },
              diagnostics: status.diagnostics
            });
          } else {
            process.stderr.write(
              `Build #${completed.build.buildNumber} ${terminal}.
`
            );
            renderDiagnostics(status.diagnostics, process.stderr);
          }
          process.exitCode = 6;
          return;
        }
        if (opts.json) {
          printJson({
            schemaVersion: 1,
            command: "upload",
            ok: true,
            result: {
              gameId: completed.gameId,
              buildId: completed.build.id,
              buildNumber: completed.build.buildNumber,
              artifactHash: completed.artifactHash,
              status: "processing"
            }
          });
        } else {
          console.log(`Build #${completed.build.buildNumber} uploaded.`);
          console.log("");
          console.log("Status:");
          console.log("Processing");
          console.log("");
          console.log(`View: ${apiUrl}/api/builds/${completed.build.id}`);
        }
      } catch (err2) {
        const error = err2;
        console.error(`error: ${error.message}`);
        process.exitCode = error.status === 401 || error.status === 403 ? 4 : 5;
      }
    }
  );
}

// src/commands/skill.ts
var import_node_crypto3 = require("node:crypto");
var import_promises10 = require("node:fs/promises");
var import_node_os2 = require("node:os");
var import_node_path11 = __toESM(require("node:path"), 1);
var SKILL_NAME = "buildcade-creator";
async function exists(target) {
  try {
    await (0, import_promises10.stat)(target);
    return true;
  } catch {
    return false;
  }
}
function packageRoot() {
  const override = process.env["BUILDCADE_PUBLIC_PACKAGE_ROOT"];
  if (override) return import_node_path11.default.resolve(override);
  const executable = process.argv[1];
  if (!executable) throw new Error("Unable to locate the public package root.");
  return import_node_path11.default.resolve(import_node_path11.default.dirname(executable), "..");
}
function agentSkillRoot(agent) {
  switch (agent.toLowerCase()) {
    case "codex": {
      const codexHome = process.env["CODEX_HOME"];
      return codexHome ? import_node_path11.default.join(import_node_path11.default.resolve(codexHome), "skills") : import_node_path11.default.join((0, import_node_os2.homedir)(), ".codex", "skills");
    }
    case "claude":
      return import_node_path11.default.join((0, import_node_os2.homedir)(), ".claude", "skills");
    case "cursor":
      return import_node_path11.default.join((0, import_node_os2.homedir)(), ".cursor", "skills");
    case "agents":
      return import_node_path11.default.join((0, import_node_os2.homedir)(), ".agents", "skills");
    default:
      throw new Error(
        `Unsupported agent preset: ${agent}. Use --target <agent-skill-directory>.`
      );
  }
}
function destinationRoot(options) {
  if (options.target && options.agent) {
    throw new Error("Use either --agent or --target, not both.");
  }
  if (options.target) return import_node_path11.default.resolve(options.target);
  return agentSkillRoot(options.agent ?? "codex");
}
async function releaseVersion(root) {
  const manifest = JSON.parse(
    await (0, import_promises10.readFile)(import_node_path11.default.join(root, "RELEASE-MANIFEST.json"), "utf8")
  );
  if (typeof manifest.release !== "string" || !/^v\d+\.\d+\.\d+$/.test(manifest.release)) {
    throw new Error("Public release manifest has an invalid version.");
  }
  return manifest.release;
}
async function verifyRelease(root) {
  const checksumFile = import_node_path11.default.join(root, "SHA256SUMS");
  const lines = (await (0, import_promises10.readFile)(checksumFile, "utf8")).split(/\r?\n/u).filter(Boolean);
  if (lines.length === 0)
    throw new Error("Public release checksum list is empty.");
  const verified = /* @__PURE__ */ new Set();
  for (const line of lines) {
    const match = /^(?<hash>[0-9a-f]{64}) {2}(?<relative>.+)$/u.exec(line);
    if (!match?.groups)
      throw new Error("Public release checksum list is malformed.");
    const relative = match.groups["relative"];
    const target = import_node_path11.default.resolve(root, ...relative.split("/"));
    const prefix = `${import_node_path11.default.resolve(root)}${import_node_path11.default.sep}`;
    if (!target.startsWith(prefix))
      throw new Error("Release checksum path escaped its root.");
    if (!await exists(target)) continue;
    const actual = (0, import_node_crypto3.createHash)("sha256").update(await (0, import_promises10.readFile)(target)).digest("hex");
    if (actual !== match.groups["hash"]) {
      throw new Error(`Release checksum mismatch: ${relative}`);
    }
    verified.add(relative);
  }
  for (const required of [
    "package.json",
    "RELEASE-MANIFEST.json",
    "dist/buildcade.cjs",
    "skills/buildcade-creator/SKILL.md",
    "skills/buildcade-creator/agents/openai.yaml",
    "skills/buildcade-creator/references/workflow.md"
  ]) {
    if (!verified.has(required)) {
      throw new Error(
        `Required release file was not checksum-verified: ${required}`
      );
    }
  }
}
async function unusedBackupPath(target, version) {
  const base = `${target}.backup-${version}`;
  if (!await exists(base)) return base;
  for (let index = 2; index < 1e3; index += 1) {
    const candidate = `${base}-${index}`;
    if (!await exists(candidate)) return candidate;
  }
  throw new Error("Unable to allocate a safe Skill backup path.");
}
async function installSkill(options) {
  const root = packageRoot();
  await verifyRelease(root);
  const release = await releaseVersion(root);
  const source = import_node_path11.default.join(root, "skills", SKILL_NAME);
  const skillRoot = destinationRoot(options);
  const target = import_node_path11.default.join(skillRoot, SKILL_NAME);
  if (!await exists(import_node_path11.default.join(source, "SKILL.md"))) {
    throw new Error("Packaged Buildcade Creator Skill is missing.");
  }
  await (0, import_promises10.mkdir)(skillRoot, { recursive: true });
  let backup;
  if (await exists(target)) {
    if (!options.upgrade) {
      throw new Error(
        `Skill already exists at ${target}. Re-run with --upgrade to create a backup and replace it.`
      );
    }
    backup = await unusedBackupPath(target, release);
    await (0, import_promises10.rename)(target, backup);
  }
  try {
    await (0, import_promises10.cp)(source, target, {
      recursive: true,
      errorOnExist: true,
      force: false
    });
    await (0, import_promises10.writeFile)(
      import_node_path11.default.join(target, ".buildcade-install.json"),
      `${JSON.stringify({ schemaVersion: 1, release, source: "github:yatianxu/buildcade-skills" }, null, 2)}
`,
      "utf8"
    );
  } catch (error) {
    await (0, import_promises10.rm)(target, { recursive: true, force: true });
    if (backup) await (0, import_promises10.rename)(backup, target);
    throw error;
  }
  return { target, ...backup ? { backup } : {}, release };
}
function registerSkillCommands(program3) {
  const skill = program3.command("skill").description("Install the Buildcade Creator Skill");
  skill.command("location").description("Show the Skill installation destination").option("--agent <name>", "agent preset: codex, claude, cursor, or agents").option("--target <directory>", "explicit agent Skill directory").option("--json", "machine-readable output").action((options) => {
    const target = import_node_path11.default.join(destinationRoot(options), SKILL_NAME);
    if (options.json) {
      printJson({
        schemaVersion: 1,
        command: "skill location",
        ok: true,
        result: { target }
      });
    } else {
      console.log(target);
    }
  });
  skill.command("install").description("Verify and install the packaged Creator Skill").option("--agent <name>", "agent preset: codex, claude, cursor, or agents").option("--target <directory>", "explicit agent Skill directory").option("--upgrade", "back up and replace an existing installation").option("--json", "machine-readable output").action(async (options) => {
    try {
      const result = await installSkill(options);
      if (options.json) {
        printJson({
          schemaVersion: 1,
          command: "skill install",
          ok: true,
          result
        });
      } else {
        console.log(`Installed ${SKILL_NAME} ${result.release} to:`);
        console.log(result.target);
        if (result.backup)
          console.log(`Previous installation backed up to: ${result.backup}`);
        console.log(
          "Restart or reopen your agent task, then invoke $buildcade-creator."
        );
      }
    } catch (error) {
      console.error(`error: ${error.message}`);
      process.exitCode = 9;
    }
  });
}

// src/public-main.ts
process.env["BUILDCADE_API_URL"] ??= "https://api.tokenaimax.com";
var program2 = new Command();
program2.name("buildcade").description("Buildcade Creator tools").helpOption("-h, --help", "display help for command");
program2.command("version").description("Print CLI, Validator and supported Game Spec versions").action(() => {
  console.log(`Buildcade CLI ${CLI_VERSION}`);
  console.log(`Validator ${VALIDATOR_VERSION}`);
  console.log("Supported Game Spec: 1");
});
registerSkillCommands(program2);
registerInitCommand(program2);
registerValidateCommand(program2);
registerPackCommand(program2);
registerPreviewCommand(program2);
registerLoginCommand(program2);
registerWhoamiCommand(program2);
registerUploadCommand(program2);
program2.parseAsync(process.argv).catch((error) => {
  console.error(`error: ${error.message}`);
  process.exitCode = 9;
});
