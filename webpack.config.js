const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  devServer: {
    allowedHosts: ['https://master.d3bsqhotd35heu.amplifyapp.com/']
  },
  output: {
    uniqueName: "products",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        name: "products",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './src/app/products/products.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "http://localhost:3000/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/store": { strictVersion: true, requiredVersion: '^13.2.0' },
          "@ngrx/entity": { strictVersion: true, requiredVersion: '^13.2.0' },
          "@ngrx/store-devtools": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "ngx-toastr": { strictVersion: true, requiredVersion: '^14.3.0' },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
