
const path = require('path');

module.exports = {
	entry:{
		index : './src/index/index.js',
		login : './src/login/custom-js.js',
		note : './src/note/note.js',
		note_detail : './src/note_detail/note_detail.js',
		manage : './src/manage/manage.js',
		resume : './src/resume/resume.js'
	},
	output:{
		filename:'[name].js',
		path:path.resolve(__dirname,'build')
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
					options:{
						presets:['es2015','react'],
					}
				}
			},
			{
				test:/\.css$/,
				use:[
					{
						loader:'style-loader'
					},
					{
						loader:'css-loader'
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
					loader:'file-loader'
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
			}
		]
	},
};