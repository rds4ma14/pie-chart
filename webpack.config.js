const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
 entry: [
   './src/index.js',
 ],

 output: {
   path: path.resolve(__dirname, 'dist'),
   filename: 'main.js'
 },

 resolve: {
   extensions: ['.js', '.jsx'],
 },

 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: [
         {
           loader: 'babel-loader',
           options: {
             presets: ['env', 'react']
           }
         }
       ],
     },
   ],
 },

 plugins: [
   new CopyWebpackPlugin([
     {
       from: './node_modules/@dvsl/zoomcharts/lib/assets',
       to: 'assets'
     }
   ]),
 ],

 devServer: {
   contentBase: path.join(__dirname),
   compress: true,
   port: 9000
 }
};