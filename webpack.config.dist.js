const webpack = require("webpack");
const {
	resolve,
	join
} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: resolve(__dirname, "src"),
	devtool: "cheap-module-source-map",

	entry: {
		app: [
			"babel-polyfill",
			"whatwg-fetch",
			"./index.js"
		],
		vendor: [
			"react",
			"react-dom",
			"react-router-dom",
			"react-transition-group"
		]
	},

	module: {
		rules: [{
				test: /\.js?$/,
				use: [{
					loader: "babel-loader",
					options: {
						babelrc: false,
						presets: [
							["env", {
								modules: false
							}],
							"react",
							"stage-0"
						],
						plugins: [
							"react-hot-loader/patch",
							"transform-decorators-legacy"
						]
					}
				}],
				exclude: /node_modules/
			},
			{
				test: /\.css|scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					"resolve-url-loader",
					"sass-loader?sourceMap"
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					"file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true
							},
							gifsicle: {
								interlaced: false
							},
							optipng: {
								optimizationLevel: 4
							},
							pngquant: {
								quality: "75-90",
								speed: 4
							}
						}
					}
				]
			}
		]
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: "index.html"
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new UglifyJSPlugin({
			sourceMap: true,
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true
			},
			comments: false
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new CopyWebpackPlugin([{
			from: require.resolve('workbox-sw'),
			to: 'workbox-sw.prod.js'
		}]),
		new WorkboxPlugin({
			globDirectory: './dist',
			globPatterns: [
				join('**/*.{js,css,png,jpg,gif}'),
				join('index.html')
			],
			swSrc: './src/sw.js',
			swDest: './dist/sw.js',
			globIgnores: ['workbox-sw.prod.js']
		})
	],

	output: {
		filename: "assets/[name].[chunkhash].js",
		path: resolve(__dirname, "dist"),
		publicPath: `/`
	}
};