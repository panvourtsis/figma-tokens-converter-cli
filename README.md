# figma-tokens-converter-cli

A CLI with utilities to simplify the process of Figma Design Tokens to Frontend.

## First Steps

### Installation

In order to install it on your system simply run

```
yarn add figma-tokens-converter-cli
```

### Example

For convinience i made an example that you can see [here](https://github.com/panvourtsis/figma-tokens-converter-cli/tree/main/example)
The example is how the cli can work on a project.

### Help

By running the command as a cli on your terminal you can see the options and arguments needed
You can define help for each utility as well

```
$ figma-tokens-converter-cli --help
```

```
$ figma-tokens-converter-cli parseFigmaTokens --help
```

```
$ figma-tokens-converter-cli parseJsonToCode --help
```

## Utilities

### parseFigmaTokens

This utility grabs all the properties from your .json file and export them to the output path specified.
There are options to further expand some properties to from one file to several or specify only some properties.

Properties
| name | type | option | description |
|-----------------|--------------|------------------------|-------------------------------------------------------------------------------------------|
| input | string | | The input of the .json figma file |
| output | string | | Output directory to write the converted results |
| pick | string | -p, --pick | Specify in comma separated format the properties to pick - Optional |
| expand | string | -e, --expand | Specify in comma separated format the properties to expand in more files |
| outputExtension | string | -oe, --outputExtension | The output file extension that must be transformed to. Defaults to json (default: "json") |

### parseJsonToCode

This utility parse a directory of json files and converts them to code. By default it transforms them to TS files but you can also specify JS files.

Properties
| name | type | option | description |
|-----------------|--------------|------------------------|-------------------------------------------------------------------------------------------|
| input | string | | The input directory |
| output | string | | Output directory to write the converted results |
| outputExtension | string | -oe, --outputExtension | The output file extension that must be transformed to. Defaults to json (default: "json") |
