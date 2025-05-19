export default {
    plugins: {
      'postcss-nested': {},
      'postcss-preset-env': {
        stage: 3,
        features: {
          'nesting-rules': false
        }
      }
    }
  }