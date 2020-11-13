import HtmlWebPackPlugin from 'html-webpack-plugin';

const config = {
    entry: './src/app/index.tsx',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/u,
                exclude: /node_modules/u,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/u,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/public/index.html',
            filename: './index.html',
        }),
    ],
};

export default config;
