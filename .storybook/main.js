const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
};