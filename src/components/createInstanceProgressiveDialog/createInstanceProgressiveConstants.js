import React from 'react';
import CreateInstanceProgressiveNameStep from './createInstanceProgressiveNameStep';
import CreateInstanceProgressivePlanStep from './createInstanceProgressivePlanStep';
import CreateInstanceProgressiveContextStep from './createInstanceProgressiveContextStep';
import CreateInstanceProgressiveStartupStep from './createInstanceProgressiveStartupStep';
import CreateInstanceProgressiveToolsStep from './createInstanceProgressiveToolsStep';
import CreateInstanceProgressiveResultsStep from './createInstanceProgressiveResultsStep';

const createInstanceProgressiveSteps = [
  {
    step: 1,
    label: '1',
    title: 'Name',
    page: <CreateInstanceProgressiveNameStep />,
    subSteps: []
  },
  {
    step: 2,
    label: '2',
    title: 'Plan',
    page: <CreateInstanceProgressivePlanStep />,
    subSteps: []
  },
  {
    step: 3,
    label: '3',
    title: 'Context',
    page: <CreateInstanceProgressiveContextStep />,
    subSteps: []
  },
  {
    step: 4,
    label: '4',
    title: 'Startup Info',
    page: <CreateInstanceProgressiveStartupStep />,
    subSteps: []
  },
  {
    step: 5,
    label: '5',
    title: 'Tools',
    page: <CreateInstanceProgressiveToolsStep />,
    subSteps: []
  },
  {
    step: 6,
    label: '6',
    title: 'Results',
    page: <CreateInstanceProgressiveResultsStep />,
    subSteps: []
  }
];

export { createInstanceProgressiveSteps };
