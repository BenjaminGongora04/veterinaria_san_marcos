
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: ["src/test-karma/**/*.spec.js"],

    preprocessors: {
      "src/test-karma/**/*.spec.js": ["webpack"]
    },

    webpack: require("./webpack.karma.cjs"),

    reporters: ["progress"],

    browsers: ["Chrome"],

    singleRun: true,

    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-webpack")
    ]
  });
};
