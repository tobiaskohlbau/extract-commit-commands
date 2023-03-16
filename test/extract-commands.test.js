const { extractCommands } = require('../lib/extract-commands.js');

describe('Extract command', () => {
	test('extract single command', () => {
		const resp = extractCommands('CI: test', 'CI', ',');
		expect(resp).toEqual(['test']);
	});
	test('extract multiple commands in a single line', () => {
		const resp = extractCommands('CI: test,123', 'CI', ',');
		expect(resp).toEqual(['test', '123']);
	});
	test('extract multiple commands in a multiple lines', () => {
		const resp = extractCommands('CI: test,123\nCI: 456,test', 'CI', ',');
		expect(resp).toEqual(['test', '123', '456', 'test']);
	});
	test('extract multiple commands in a multiple lines with context arround', () => {
		const resp = extractCommands(
			'THIS IS A NEW COMMIT\n\nHERE GOES THE DESCRIPTION\n\nCI: test,123\nCI: 456,test',
			'CI',
			','
		);
		expect(resp).toEqual(['test', '123', '456', 'test']);
	});
	test('extract multiple commands with spaces', () => {
		const resp = extractCommands('CI: test, 1234', 'CI', ',');
		expect(resp).toEqual(['test', '1234']);
	});
	test('extract bad command', () => {
		const resp = extractCommands('CI:', 'CI', ',');
		expect(resp).toEqual([]);
	});
	test('extract empty command', () => {
		const resp = extractCommands('TITLE\n\nDESCRIPTION', 'CI', ',');
		expect(resp).toEqual([]);
	});
});
