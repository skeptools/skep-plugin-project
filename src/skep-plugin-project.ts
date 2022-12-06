import { addFiles, loadSettings } from '@rlmartin-projen/projen-project';
import { cdk } from 'projen';

export interface SkepPluginProjectOptions extends cdk.JsiiProjectOptions {
}

export class SkepPluginProject extends cdk.JsiiProject {
  constructor(options: SkepPluginProjectOptions) {
    const { options: projectOpts, files } = loadSettings(options, true);
    super(projectOpts);
    addFiles(this, files);
    // Add non-templated resources here
  }
}
