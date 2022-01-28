const favicon = './src/assets/logo.png';
module.exports = {
	pages: [
		{
			name: 'doc',
			filename: 'index.html',
			template: './src/pagedoc/index.ejs',
			favicon: favicon,
		},
		{
			name: 'about',
			filename: 'about.html',
			template: './src/pageabout/index.ejs',
			favicon: favicon,
		},
		{
			name: 'list',
			filename: 'warsys.html',
			template: './src/pagewarsys/index.ejs',
			favicon: favicon,
		},
	],
};
