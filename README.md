<a href="https://github.com/tinovyatkin/action-check-deprecated-js-deps/actions"><img alt="action-check-deprecated-js-deps status" src="https://github.com/tinovyatkin/action-check-deprecated-js-deps/workflows/units-test/badge.svg"></a>

# GitHub Action that check JavaScript dependencies deprecations

[NPM deprecated packages](https://docs.npmjs.com/using-deprecated-packages) is sometimes even bigger security or stability risk for a project than known vulnerabilities (_that have a lot of monitoring tools_). However, there is no easy way to check for deprecation as both `npm outdated` nor `yarn outdated` says nothing about deprecated packages.

You may see NPM warning on first install of that package, but those warning can be easily lost in a lot of log messages during install or even will not appear for a mature project.

This action checks for all project dependencies (`dependencies`, `devDependencies` and `resolutions`) and fails the action if a deprecated dependency found:

<p align="center">
<img src="https://user-images.githubusercontent.com/5350898/70814950-f3c67b00-1da2-11ea-8906-e9b6f6539571.png" alt="screenshot of action run" />
</p>

Compatible with Yarn and Lerna monorepos.

## Usage

```yaml
uses: tinovyatkin/action-check-deprecated-js-deps@v1
with:
  ignore: css-mqpacker # you can optionally ignore some deprecations
  root: packages # optionally specify a root folder to search for package.jsons
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
