import * as path from 'path';
import { addFiles, allCases, loadSettings, packageToString, parsePackageName, squashPackages } from '@rlmartin-projen/projen-project';
import { typescript } from 'projen';

export interface SkepPluginProjectOptions extends typescript.TypeScriptProjectOptions {
  /**
   * Compiled CDKTF provider package name, in NPM style: @scope/library-name. Example: @cdktf/provider-github
   */
  readonly cdktfProviderPackage: string;

  /**
   * Matching criteria for NPM package version. Example: ~3.0
   *
   * @default - null
   */
  readonly cdktfProviderPackageVersion?: string;
}

export class SkepPluginProject extends typescript.TypeScriptProject {
  constructor(options: SkepPluginProjectOptions) {
    const packageName = parsePackageName(options.name);
    const pluginName = packageName.name.replace(/^plugin-/i, '').replace(/-plugin$/i, '');
    const tempOpts = {
      ...options,
      name: packageToString({ org: packageName.org, name: `plugin-${pluginName.toLowerCase()}` }),
      deps: squashPackages([
        ...(options.deps ?? []),
        '@skeptools/skep-core@0.0.8-dev.1',
        'cdktf@~0',
        'constructs@~10',
      ]),
      entrypoint: options.entrypoint ?? 'dist/index.js',
      releaseBranches: options.releaseBranches ?? {
        dev: { prerelease: 'dev', npmDistTag: 'dev', majorVersion: options.majorVersion ?? 0 },
      },
      depsUpgradeOptions: options.depsUpgradeOptions ?? {
        workflowOptions: {
          branches: [options.defaultReleaseBranch],
        },
      },
      pluginName: allCases(pluginName),
    };
    const { options: projectOpts, files } = loadSettings(tempOpts, path.join(__dirname, '../files'));
    super(projectOpts);
    addFiles(this, files);
    this.addDeps(`${options.cdktfProviderPackage}${options.cdktfProviderPackageVersion ? '@' : ''}${options.cdktfProviderPackageVersion ?? ''}`);
    // Add non-templated resources here
    this.gitignore.exclude(
      '*.d.ts',
      '*.js',
      'cdktf.out',
      'terraform.tfstate*',
      '.gen',
    );
    this.compileTask.exec('tsc --declaration');
  }
}
