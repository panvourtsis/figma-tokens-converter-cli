import chalk from 'chalk';

const NAME = 'figma-tokens-converter-cli';
const log = console.log;

const logs = {
  error: (...props: any) => log(chalk.red(NAME, '[ERROR]', ...props)),
  info: (...props: any) => log(chalk.blue(NAME, '[INFO]', ...props)),
  success: (...props: any) => log(chalk.green(NAME, '[SUCCESS]', ...props)),
  warning: (...props: any) => log(chalk.bgYellow(NAME, '[WARNING]', ...props)),
};

export default logs;
