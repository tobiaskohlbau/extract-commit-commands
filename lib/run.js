const core = require('@actions/core');
const github = require('@actions/github');

const { extractCommands } = require('./extract-commands');

async function run() {
	try {
		const delimiter = core.getInput('delimiter');
		const command = core.getInput('command');

		const pushPayload = github.context.payload;

		const commands = pushPayload.commits.flatMap((commit) =>
			extractCommands(commit.message, command, delimiter)
		);
		core.setOutput('commands', JSON.stringify(commands));
	} catch (error) {
		core.setFailed(error.message);
	}
}

module.exports = run;
