const global = {
  sizing: {
    '0': {
      value: '0px',
      type: 'sizing',
    },
    '1': {
      value: '4px',
      type: 'sizing',
    },
    '2': {
      value: '8px',
      type: 'sizing',
    },
  },
  lineHeight: {
    '1': {
      value: '14',
      type: 'lineHeights',
      description: 'For form field labels only',
    },
    '2': {
      value: '16',
      type: 'lineHeights',
      description: 'For input fields only (Form Fields & Tables)',
    },
    '3': {
      value: '18px',
      type: 'lineHeights',
    },
    '4': {
      value: '20',
      type: 'lineHeights',
    },
  },
  fontWeight: {
    regular: {
      value: 'Regular',
      type: 'fontWeights',
    },
    medium: {
      value: 'Medium',
      type: 'fontWeights',
    },
    bold: {
      value: 'Bold',
      type: 'fontWeights',
    },
  },
  fontSize: {
    '1': {
      value: '12',
      type: 'fontSizes',
    },
    '2': {
      value: '13',
      type: 'fontSizes',
    },
    '3': {
      value: '14',
      type: 'fontSizes',
    },
  },
  spacing: {
    '0': {
      value: '0px',
      type: 'spacing',
    },
    '1': {
      value: '2px',
      type: 'spacing',
    },
    '2': {
      value: '4px',
      type: 'spacing',
    },
  },
} as const;

export default global;
