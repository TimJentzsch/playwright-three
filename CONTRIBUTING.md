# Contributing

Thanks for your interest in contributing to this project!

## Git

To reduce the risk of supply chain attacks, all commits must be signed.
You must configure a signing key and enable signing for commits when contributing.
See the ["Singing commits" guide by GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) for more information on how to set this up.

# Package manager

This project uses a fixed version of [pnpm](https://pnpm.io/).
Use `corepack enable` to have [corepack](https://corepack.org/) automatically install the correct `pnpm` version for you.

Run `pnpm install` to get started by installing all dependencies.

## Code quality

This project uses [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for formatting and [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting.
If you open the project via the `playwright-three.code-workspace` file instead of just the folder, the corresponding extension will be recommended to you, so you can benefit from VS Code's build in formatting capabilities.
Sometimes, it can help to disable the extensions for Prettier and Eslint for the workspace, to avoid conflicting configurations.

Use `pnpm format` and `pnpm lint` to run the formatter and linter, respectively.

## Examples

All new features should be covered by new examples, which serve both as documentation and tests.
Check the existing examples as a reference for how to add a new one.
In general, they should be named and structured by a concept / feature that the library provides.

You can test the examples automatically via `pnpm e2e`.

## Releases

A new release is published automatically when a PR bumping the version number is merged.
To decrease the likelihood of supply chain attacks, we are using [trusted publishing](https://docs.npmjs.com/trusted-publishers).

## License

By contributing to this project, you agree that your contributions will be licensed under the [Apache-2.0 license](./LICENSE).
