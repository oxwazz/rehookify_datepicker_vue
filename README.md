# Customer IDP Admin App

## Prerequisites

- GitHub account with [ssh access](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- Node.js v22.17.0 or install latest [mise-en-place](https://mise.jdx.dev/installing-mise.html) or [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- Pnpm v10.13.1 via `corepack enable`
- [pre-commit](https://pre-commit.com/#install) latest version
- Install all vscode extensions in [.vscode/extensions.json](./.vscode/extensions.json)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:oxwazz/rehookify_datepicker_vue.git
   ```

1. Install Dependencies:

   ```bash
   pnpm install
   ```

1. Install the git hook scripts:

   ```bash
   pre-commit install
   ```

   and then,

   ```bash
   pre-commit install --hook-type commit-msg
   ```

1. Run the playground:

   ```bash
   pnpm play # or nr play
   ```

done 🎉
