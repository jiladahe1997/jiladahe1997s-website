
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")
const VueLoaerPLugin = require('vue-loader/lib/plugin')

module.exports = {
	entry:{
		//以下入口已废弃
		//note_detail : './src/note_detail/note_detail.js',
		//manage : './src/manage/manage.js',

		//以下入口为了测试速度更快，暂时屏蔽
		//resume : './src/resume/resume.js',
		//index_vue :"./src/index_vue/index_vue.js",
		//login : './src/login/custom-js.js',
		//note : './src/note/note.js',
		//private : './src/private/private.js',
		//private_vue: './src/private_vue/private_vue.js'
		//test:"./src/test/test.js"
		index: './src/index/index.js',
    ml: ["@babel/polyfill",'./src/ml/ml_vue.js']

	},
	// devServer:{
	// 	contentBase: './build',
	// 	port:9000,
	// 	hot:true
	// },
	plugins:[
		// new HtmlWebpackPlugin({
		// 	title:"Outpur Management",
		// 	filename: 'test.html'
		// }),
		// new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
    new VueLoaerPLugin()
	],
	/*resolve: {
		alias: {
		  'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
		}
	},*/
	devtool: 'inline-source-map',  //仅开发用，sourcemao启用
	output:{
		filename:'[name].js',
    path:path.resolve(__dirname,'build'),
    publicPath: '/'
	},

//对js后缀文件要求使用babel-loader插件标准进行打包（babel实质是一个单独的转译器插件）
//options是babel在转译时的选项（babel官网称作插件）
//要求按照react(jsx语法)，以及es2015的标准进行转译

//对css后缀的文件要求使用css-loader和style-loader进行打包
//将css引入为js变量，并实现style注入。
//官方API建议两者一起使用：https://doc.webpack-china.org/loaders/style-loader/

//对jgp后缀的文件要求使用file-loader
//直接将文件名改成hash后输出

//对html的文件要求使用html-loader、extract-loader以及file-loader，主要要处理img标签中的文件路径
//先将html引入为js变量。
//首先将html中的所有路径标签（src、href）等改成hash值。
//再通过file-loader输出文件名为【name】.[ext]即不改变文件名和后缀。
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader',
					// options:{
					// 	presets:['@babel/preset-env','@babel/preset-react'],
					// }
				}
      },
      {
        test:/\.vue$/,
        use:{
          loader:'vue-loader'
        }
      },
			{
				test:/private\.css/,
				loader:"style-loader!css-loader?modules"
			},
			{
				test:/\.css$/,
				exclude:/private\.css/,
				use:[
					{
						loader:'style-loader'
					},
					{
						loader:'css-loader'
						//开启cssmodule模式
						//loader:'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
					},
					{
						loader:"postcss-loader"
					}
				]
			},
			{
				test:/\.jpg$/,
				use:{
					loader:'file-loader'
				}
			},
			{
				test:/\.png$/,
				use:{
					loader:'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}
			},
			{
				test:/\.html$/,
				use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                    {
						loader: "extract-loader",
                    },
                    {
                        loader: "html-loader",
                    },
                ],
      },
      {
        test: /\.woff(2)?|ttf|eot|svg/,
        use: ['file-loader']
      }
		]
  },
  mode: 'development'
};