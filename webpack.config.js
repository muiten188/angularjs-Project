var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const RUN_TARGET = process.env.npm_lifecycle_event;

var config = {
	context: __dirname + '/src', // `__dirname` is root of project and `src` is source
	entry: {
		app: './app.js',
		login: './login.js',
		test: './test.js'
	},
	output: {
		path: __dirname + '/dist', // `dist` is the destination
		filename: 'js/[name].[hash].js',
	},
	devServer: {
		contentBase: __dirname + '/dist', // `__dirname` is root of the project
	},
	module: {
		rules: [{
			test: /\.js$/, // Check for all js files
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015'],
					plugins: ["transform-object-rest-spread"]
				}
			}]
		}, {
			test: /\.html$/,
			use: 'raw-loader'
		}, {
			test: /\.(scss|css)$/,
			loader: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader!sass-loader"
			})
		}, {
			test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
			use: 'file-loader?name=fonts/[name].[ext]&publicPath=../'
		}]
	},
	plugins: [],
	// devtool: 'source-map'
};

// config.plugins.push(
// 	new webpack.optimize.CommonsChunkPlugin({
// 		names: ['vendor'],
// 	})
// );

config.plugins.push(new CleanWebpackPlugin([
	'dist/*'
]));

config.plugins.push(new CopyWebpackPlugin([{
	from: 'assert/**/*.*'
}, {
	from: 'data/*.json'
}, {
	from: 'i18n/*.json'
}]));

config.plugins.push(new ExtractTextPlugin({
	filename: 'assert/[name].[hash].css',
	allChunks: true
}));

config.plugins.push(new webpack.ProvidePlugin({
	$: "jquery",
	jQuery: "jquery",
	moment: "moment",
	d3: "d3"
}));

config.plugins.push(new HtmlWebpackPlugin({
	chunks: ['app'],
	filename: 'index.html',
	template: './layout/index.html'
}));
config.plugins.push(new HtmlWebpackPlugin({
	chunks: ['login'],
	filename: 'login.html',
	template: './layout/login.html'
}));
config.plugins.push(new HtmlWebpackPlugin({
	chunks: ['test'],
	filename: 'test.html',
	template: './layout/test.html'
}));

//Fix momentjs locale issue
config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

if (RUN_TARGET == 'dist') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: true
	}));
}

module.exports = config;