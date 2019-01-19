import React from 'react';
import CreateInstanceWizardNameStep from './createInstanceWizardNameStep';
import CreateInstanceWizardPlanStep from './createInstanceWizardPlanStep';
import CreateInstanceWizardContextStep from './createInstanceWizardContextStep';
import CreateInstanceWizardStartupStep from './createInstanceWizardStartupStep';
import CreateInstanceWizardToolsStep from './createInstanceWizardToolsStep';
import CreateInstanceWizardResultsStep from './createInstanceWizardResultsStep';

const createInstanceWizardSteps = [
  {
    step: 1,
    label: '1',
    title: 'Name',
    page: <CreateInstanceWizardNameStep />,
    subSteps: []
  },
  {
    step: 2,
    label: '2',
    title: 'Plan',
    page: <CreateInstanceWizardPlanStep />,
    subSteps: []
  },
  {
    step: 3,
    label: '3',
    title: 'Context',
    page: <CreateInstanceWizardContextStep />,
    subSteps: []
  },
  {
    step: 4,
    label: '4',
    title: 'Startup Info',
    page: <CreateInstanceWizardStartupStep />,
    subSteps: []
  },
  {
    step: 5,
    label: '5',
    title: 'Tools',
    page: <CreateInstanceWizardToolsStep />,
    subSteps: []
  },
  {
    step: 6,
    label: '6',
    title: 'Results',
    page: <CreateInstanceWizardResultsStep />,
    subSteps: []
  }
];

export { createInstanceWizardSteps };
