import { SkepPluginProject } from '../src';

test('ProjenProject', () => {
  const project = new SkepPluginProject({
    name: 'foo-project',
    defaultReleaseBranch: 'main',
    cdktfProviderPackage: '@cdktf/github-provider',
    cdktfProviderPackageVersion: '~3',
  });
  const fileNames = project.files.map(_ => _.path);
  ['.projen/tasks.json'].forEach(fileName => {
    expect(fileNames).toContain(fileName);
  });
});