import { getAsyncLifecycle } from '@openmrs/esm-framework';
// import { configSchema } from './config-schema';

const backendDependencies = { 'webservices.rest': '^2.2.0' };

// const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@openmrs/esm-patient-list-app';
const options = {
  featureName: 'patient list',
  moduleName,
};

function setupOpenMRS() {
  // defineConfigSchema(moduleName, configSchema);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root.component'), options),
        route: (location: Location) => location.pathname.startsWith(window.getOpenmrsSpaBase() + 'patient-list'),
        online: { syncUserPropertiesChangesOnLoad: true },
        offline: { syncUserPropertiesChangesOnLoad: false },
      },
    ],
    extensions: [],
  };
}

export { backendDependencies, /*importTranslation, */ setupOpenMRS };
