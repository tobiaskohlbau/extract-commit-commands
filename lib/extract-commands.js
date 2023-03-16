module.exports.extractCommands = function (message, command, delimiter) {
	const re = new RegExp(`^${command}:\\s+(?<commands>.*)$`, 'gm');
	const match = message.matchAll(re);

	return Array.from(match).flatMap((rawCommand) =>
		rawCommand.groups.commands.split(delimiter).map((v) => v.trim())
	);
};
