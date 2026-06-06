# South Maroubra Dolphins Winter Swimming Club

## Installation

### Clone repository

```shell
git clone git@github.com:robertlove/south-maroubra-dolphins.git
cd south-maroubra-dolphins
```

### Install dependencies

```shell
bundle install
npm i -g purgecss
gem install html-proofer
```

## Usage

### Serve site

```shell
bundle exec jekyll serve
```

### Remove unused CSS

```shell
purgecss --config ./purgecss.config.js
```

### Check HTML

```shell
htmlproofer ./_site --swap-urls '^/south-maroubra-dolphins/:/'
```

## Contributing

See [Contributing](https://github.com/robertlove/.github/blob/master/CONTRIBUTING.md).

## Credits

See [Contributors](https://github.com/robertlove/south-maroubra-dolphins/graphs/contributors).
