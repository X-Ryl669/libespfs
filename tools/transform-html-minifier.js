const process = require('node:process');

try {
	require('html-minifier/package')
} catch {
	const { spawnSync } = require('node:child_process');
	spawnSync('npm', ['--prefix=' + process.env.NODE_PREFIX, 'install', 'html-minifier'], {'stdio': ['ignore', 'ignore', 'inherit']});
	spawnSync('node', process.argv.slice(1), {'stdio': 'inherit'});
	process.exit(0);
}

const html_minifier = require('html-minifier');

const options = {
	includeAutoGeneratedTags: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortClassName: true,
	useShortDoctype: true,
	collapseWhitespace: true
};

var input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (data) => {
	input = input.concat(data.toString());
});
process.stdin.on('close', () => {
	let output = html_minifier.minify(input, options);
	process.stdout.write(output);
	process.exit(0);
});
