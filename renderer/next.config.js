const withCSS = require('@zeit/next-css');

// const nextConfig = {
//   webpack: (config, {isServer}) => {
//     Object.assign(config, {target: 'electron-renderer'})
//     if (isServer) {
//       const antStyles = /antd\/.*?\/style\/css.*?/;
//       const origExternals = [...config.externals];
//       config.externals = [
//         // eslint-disable-line
//         (context, request, callback) => {  // eslint-disable-line
//           if (request.match(antStyles)) return callback();
//           if (typeof origExternals[0] === 'function') {
//             origExternals[0](context, request, callback);
//           } else {
//             callback();
//           }
//         },
//         ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//       ];

//       config.module.rules.unshift({
//         test: antStyles,
//         use: 'null-loader',
//       });
//     }
//     return config;
//   },
// };
// module.exports = withPlugins(
//     [
//       [withCSS]
//       //   [
//       //     withSass,
//       //     {
//       //       cssModules: true,
//       //       cssLoaderOptions: {
//       //         localIdentName: '[path]___[local]___[hash:base64:5]',
//       //       },
//       //     },
//       //   ],
//     ],
//     nextConfig,
// );

module.exports = withCSS({
  webpack: (config) =>
    Object.assign(config, {
      target: 'electron-renderer'
    }),
  cssLoaderOptions: {
    url: false
  }
});