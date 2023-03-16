jest.mock('@actions/core');
jest.mock('@actions/github');

const core = require('@actions/core');
const github = require('@actions/github');
const run = require('../lib/run');

describe('Extract CI Commands', () => {
	test('extract empty commands from commit messages', async () => {
		core.getInput = jest.fn().mockReturnValueOnce(',').mockReturnValueOnce('CI');

		core.setOutput = jest.fn().mockImplementation(() => {});
		core.setFailed = jest.fn().mockImplementation(() => {});

		github.context.payload = {
			commits: [
				{
					message: 'From Test'
				}
			]
		};

		await run();

		expect(core.setFailed).not.toHaveBeenCalled();
		expect(core.setOutput).toHaveBeenCalledWith('commands', '[]');
	}),
		test('extract command from single commit messages', async () => {
			core.getInput = jest.fn().mockReturnValueOnce(',').mockReturnValueOnce('CI');

			core.setOutput = jest.fn().mockImplementation(() => {});
			core.setFailed = jest.fn().mockImplementation(() => {});

			github.context.payload = {
				commits: [
					{
						message: 'CI: test'
					}
				]
			};

			await run();

			expect(core.setFailed).not.toHaveBeenCalled();
			expect(core.setOutput).toHaveBeenCalledWith('commands', '["test"]');
		}),
		test('extract multiple commands from multiple commit messages', async () => {
			core.getInput = jest.fn().mockReturnValueOnce(',').mockReturnValueOnce('CI');

			core.setOutput = jest.fn().mockImplementation(() => {});
			core.setFailed = jest.fn().mockImplementation(() => {});

			github.context.payload = {
				commits: [
					{
						message: 'CI: test'
					},
					{
						message: 'CI: test2'
					}
				]
			};

			await run();

			expect(core.setFailed).not.toHaveBeenCalled();
			expect(core.setOutput).toHaveBeenCalledWith('commands', '["test","test2"]');
		});
});
