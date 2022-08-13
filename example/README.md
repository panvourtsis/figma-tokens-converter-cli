# Example

The module is installed locally. Therefore in order to run it without a problem is being in the package.json under scripts with the name `cli`

## Run

```
yarn run cli <then here all the commands explained in the cli README.md>
```

## Convert

In order to fetch all json contents i run the following. Then i get a new directory under `converted` named `json` with all the global properties
because i expanded the global.

```
yarn run cli parseFigmaTokens ./data/figma-tokens.json ./converted/json/ --expand global
```

## To code

The you can see with the below how i can convert the json source files i made to code with the following

```
yarn run cli parseJsonToCode ./converted/json/ ./theme/constants/
```

## Final use

Then you can use files in your theme to link those constants and have typed results.

Check theme/index.ts for more information on how.
