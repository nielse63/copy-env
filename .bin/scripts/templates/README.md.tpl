# {{name}}

> {{description}}

<div align="center">
  <a href="https://github.com/{{user}}/{{name}}">
    <img src="docs/social.jpeg" alt="{{user}}/{{name}}" width="640">
  </a>

  <!-- <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/{{user}}/{{name}}"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/{{user}}/{{name}}">View Demo</a>
    ·
    <a href="https://github.com/{{user}}/{{name}}/issues">Report Bug</a>
    ·
    <a href="https://github.com/{{user}}/{{name}}/issues">Request Feature</a>
  </p> -->
</div>

## Features

- TypeScript - Pre-configured TypeScript configuration integrated with eslint and jest
- GitHub Actions - PR checks, dependabot, automerge, and repo settings pre-configured
- Git Hooks - Format staged files using lint-staged and husky
- Pre-Configured Formatters - eslint, prettier, airbnb-typescript-config, and .editorconfig baked in
- Unit Tests - Run TypeScript unit tests with jest
- Interactive Setup Script - takes the hassle out of initializing your repository

### Prerequisites

For the best results, make sure you have the correct version of node installed:

```bash
nvm install v16.19.0
```

### Installation

#### Using GitHub CLI

```bash
# create the repo and clone it
gh repo create my-awesome-project \
  --template {{user}}/{{name}} \
  --clone
cd my-awesome-project

# run the setup script
npm run setup
```

#### Manually via git

```bash
# clone the repo into a custom directory
git clone https://github.com/{{user}}/{{name}} my-awesome-project
cd my-awesome-project

# switch to ideal node version
nvm use

# run the setup script
npm run setup
```

<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

<!-- ROADMAP -->

## Roadmap

- [ ] Add Changelog
- [ ] Add default values for setup script
- [ ] Move `.bin/scripts` to it's own package
- [ ] Utilize plop
- [ ] Handle git initilization during setup more gracefully
- [ ] Write tests for setup and backup scripts

See the [open issues](https://github.com/{{user}}/{{name}}/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b scratch/my-feature`)
3. Commit your Changes (`git commit -m 'added new feature'`)
4. Push to the Branch (`git push origin scratch/my-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [`LICENSE.txt`](./LICENSE.txt) for more information.

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/{{user}}/{{name}}](https://github.com/{{user}}/{{name}})
