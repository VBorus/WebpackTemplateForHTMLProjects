const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

let path = require('path');
const fs = require('fs');

const htmlPlugins = generateHtmlPlugins('./src/template');

function generateHtmlPlugins(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))

	return templateFiles.map(item => {
		const parts = item.split('.');
		const name = parts[0];
		const extension = parts[1];
		if (parts.length === 3) {
			// Все баги появлялись из-за resolve так как из-за точки массива делится на 3 а не на 2 части
			return new HTMLWebpackPlugin({
				filename: `empty.html`,
				template: path.resolve(__dirname, `${templateDir}/empty.pug`),
				inject: false
			})
		}
		return new HTMLWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			inject: false
		})
	})
}


const js_rules = {
	test: /\.js$/,
	loader: 'babel-loader',
	options: {
			presets: ["@babel/preset-env"]
	}
};


const css_rules = {
	test: /\.styl(us)?$/,
	include: path.resolve(__dirname, "src"),
	use: [
		MiniCssExtractPlugin.loader,
		{
			loader: "css-loader",
			options: {
				sourceMap: true,
				url: false
			}
		},
		{
			loader: "postcss-loader",
			options: {
				plugins: () => [
					autoprefixer({})
				],
				options: {}
			}
		},
		{
			loader: "stylus-loader",
			options: {
				sourceMap: false
			}},
		]
};

const pug_rules = {
	test: /\.(pug|jade)$/,
	use: ['html-loader?attrs=false', 'pug-html-loader']
};

const svg_rules = {
	test: /\.svg$/,
	loader: 'svg-sprite-loader',
	options: {
     extract: true,
     spriteFilename: '[chunkname].svg'
   }
}

let moduleExport = [];

moduleExport.push({
	name: 'main',
	//devtool: 'source-map',
	//mode: 'development',
	entry: {
		'script.js': ['./src/js/script.js'],
		'style': [
			'./src/css/styles.styl',
			'./src/css/common.styl',
			'./src/img/share-vk.svg',
			'./src/img/share-vi.svg'
		]
	},
	output: {
		path: path.resolve(__dirname, './site'),
		filename: '[name]',
		publicPath: 'dist/'
	},
	resolve: {
		extensions: [ '.js' ],
	},

	optimization: {
		runtimeChunk: false,
		minimizer: [
			new TerserJSPlugin({
				include: /\/js/
			}),
			new OptimizeCSSAssetsPlugin({})
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css',
		}),
		new SpriteLoaderPlugin(),

		new CopyPlugin({
			patterns: [
				{ from: './src/img', to: './img' },
				{ from: './src/font', to: './font' }
				//{ from: './src/js-additional', to: './js' },
				//{ from: './src/css-additional', to: './css' }, //pure css
			]
		}),
		...htmlPlugins
	],
	module: {
		rules: [
			js_rules,
			css_rules,
			pug_rules,
			svg_rules
		]
	},
});

module.exports = moduleExport;
