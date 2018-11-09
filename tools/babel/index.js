const getPresetEnvConfig = (target, presetEnv = {}) => {
  if (target === 'client') {
    return {
      targets: {
        browsers: ['last 2 versions'],
      },
      useBuiltIns: 'usage',
      modules: false,
      shippedProposals: true,
      ...presetEnv,
    };
  }

  if (target === 'server') {
    return {
      useBuiltIns: 'usage',
      targets: {
        node: 'current',
      },
      shippedProposals: true,
      ...presetEnv,
    };
  }

  throw new Error('Unsupported target for Babel configuration');
};

module.exports = options => ({
  presets: [
    [
      '@babel/preset-env',
      getPresetEnvConfig('server', options['preset-env']),
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'babel-plugin-lodash',
    '@babel/plugin-transform-classes',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-object-rest-spread',
      { useBuiltIns: true },
    ],
  ],
});
