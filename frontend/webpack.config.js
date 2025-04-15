const path = require('path');

module.exports = {
  entry: './src/index.js',  // Asegúrate de que la ruta al archivo de entrada esté correcta
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Regla para archivos .js y .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator'
            ]
          }
        }
      },
      {
        test: /\.css$/,  // Regla para archivos .css
        use: ['style-loader', 'css-loader'],  // Usa los loaders para cargar CSS
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Extensiones que Webpack debe resolver
  },
};
