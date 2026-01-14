#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = '0.1.0';

interface ComponentDefinition {
  name: string;
  description: string;
  files: {
    source: string;
    target: string;
  }[];
  dependencies: string[];
  hooks?: string[];
  styles?: string[];
}

const COMPONENTS_REGISTRY: Record<string, ComponentDefinition> = {
  button: {
    name: 'Button',
    description: 'M3 Common Button with 5 variants (filled, outlined, text, elevated, tonal)',
    files: [
      { source: 'components/Button/Button.tsx', target: 'button.tsx' },
      { source: 'components/Button/Button.module.css', target: 'button.module.css' },
    ],
    dependencies: [],
    hooks: ['useRipple'],
    styles: ['theme'],
  },
  checkbox: {
    name: 'Checkbox',
    description: 'M3 Checkbox with checked, unchecked, and indeterminate states',
    files: [
      { source: 'components/Checkbox/Checkbox.tsx', target: 'checkbox.tsx' },
      { source: 'components/Checkbox/Checkbox.module.css', target: 'checkbox.module.css' },
    ],
    dependencies: [],
    hooks: ['useRipple'],
    styles: ['theme'],
  },
  chip: {
    name: 'Chip',
    description: 'M3 Chips (AssistChip, FilterChip, InputChip, SuggestionChip, ChipSet)',
    files: [
      { source: 'components/Chip/Chip.tsx', target: 'chip.tsx' },
      { source: 'components/Chip/Chip.module.css', target: 'chip.module.css' },
    ],
    dependencies: [],
    hooks: ['useRipple'],
    styles: ['theme'],
  },
  dialog: {
    name: 'Dialog',
    description: 'M3 Dialog with modal behavior, focus trapping, and animations',
    files: [
      { source: 'components/Dialog/Dialog.tsx', target: 'dialog.tsx' },
      { source: 'components/Dialog/Dialog.module.css', target: 'dialog.module.css' },
    ],
    dependencies: [],
    hooks: [],
    styles: ['theme'],
  },
  divider: {
    name: 'Divider',
    description: 'M3 Divider with inset variants for lists and containers',
    files: [
      { source: 'components/Divider/Divider.tsx', target: 'divider.tsx' },
      { source: 'components/Divider/Divider.module.css', target: 'divider.module.css' },
    ],
    dependencies: [],
    hooks: [],
    styles: ['theme'],
  },
};

const HOOKS_REGISTRY: Record<string, { source: string; target: string }> = {
  useRipple: {
    source: 'hooks/useRipple.ts',
    target: 'use-ripple.ts',
  },
};

const STYLES_REGISTRY: Record<string, { source: string; target: string }> = {
  theme: {
    source: 'styles/theme.css',
    target: 'm3-theme.css',
  },
  global: {
    source: 'styles/global.css',
    target: 'm3-global.css',
  },
};

interface M3Config {
  $schema?: string;
  componentsDir: string;
  hooksDir: string;
  stylesDir: string;
  typescript: boolean;
  cssModules: boolean;
  aliases?: Record<string, string>;
}

const DEFAULT_CONFIG: M3Config = {
  componentsDir: 'src/components/ui',
  hooksDir: 'src/hooks',
  stylesDir: 'src/styles',
  typescript: true,
  cssModules: true,
};

function getConfigPath(): string {
  return path.join(process.cwd(), 'm3-pure.json');
}

async function loadConfig(): Promise<M3Config | null> {
  const configPath = getConfigPath();
  if (await fs.pathExists(configPath)) {
    return fs.readJson(configPath);
  }
  return null;
}

async function saveConfig(config: M3Config): Promise<void> {
  const configPath = getConfigPath();
  await fs.writeJson(configPath, config, { spaces: 2 });
}

function getSourcePath(relativePath: string): string {
  const rootDir = path.join(__dirname, '..', '..');
  return path.join(rootDir, 'src', relativePath);
}

async function copyComponent(
  sourcePath: string,
  targetPath: string,
  config: M3Config
): Promise<void> {
  const absoluteTarget = path.join(process.cwd(), targetPath);
  await fs.ensureDir(path.dirname(absoluteTarget));
  
  let content = await fs.readFile(sourcePath, 'utf-8');
  
  if (config.aliases) {
    for (const [alias, replacement] of Object.entries(config.aliases)) {
      content = content.replace(new RegExp(alias, 'g'), replacement);
    }
  }
  
  await fs.writeFile(absoluteTarget, content);
}

const program = new Command();

program
  .name('m3-pure')
  .description('Add Material Design 3 components to your React project')
  .version(VERSION);

program
  .command('init')
  .description('Initialize m3-pure in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    const spinner = ora('Initializing m3-pure...').start();

    try {
      const existingConfig = await loadConfig();
      if (existingConfig && !options.yes) {
        spinner.stop();
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: 'm3-pure.json already exists. Overwrite?',
          initial: false,
        });
        if (!overwrite) {
          console.log(chalk.yellow('Cancelled.'));
          process.exit(0);
        }
        spinner.start();
      }

      let config = DEFAULT_CONFIG;

      if (!options.yes) {
        spinner.stop();
        const responses = await prompts([
          {
            type: 'text',
            name: 'componentsDir',
            message: 'Where would you like to store components?',
            initial: DEFAULT_CONFIG.componentsDir,
          },
          {
            type: 'text',
            name: 'hooksDir',
            message: 'Where would you like to store hooks?',
            initial: DEFAULT_CONFIG.hooksDir,
          },
          {
            type: 'text',
            name: 'stylesDir',
            message: 'Where would you like to store styles?',
            initial: DEFAULT_CONFIG.stylesDir,
          },
          {
            type: 'confirm',
            name: 'typescript',
            message: 'Are you using TypeScript?',
            initial: true,
          },
          {
            type: 'confirm',
            name: 'cssModules',
            message: 'Are you using CSS Modules?',
            initial: true,
          },
        ]);

        config = { ...DEFAULT_CONFIG, ...responses };
        spinner.start();
      }

      await fs.ensureDir(path.join(process.cwd(), config.componentsDir));
      await fs.ensureDir(path.join(process.cwd(), config.hooksDir));
      await fs.ensureDir(path.join(process.cwd(), config.stylesDir));

      await saveConfig(config);

      const themeSource = getSourcePath('styles/theme.css');
      const themeTarget = path.join(process.cwd(), config.stylesDir, 'm3-theme.css');
      if (await fs.pathExists(themeSource)) {
        await fs.copy(themeSource, themeTarget);
      }

      spinner.succeed(chalk.green('m3-pure initialized successfully!'));
      console.log('');
      console.log('Next steps:');
      console.log(chalk.cyan('  1. Import the theme CSS in your app:'));
      console.log(chalk.dim(`     import '${config.stylesDir}/m3-theme.css'`));
      console.log('');
      console.log(chalk.cyan('  2. Add a component:'));
      console.log(chalk.dim('     npx m3-pure add button'));
      console.log('');
    } catch (error) {
      spinner.fail(chalk.red('Failed to initialize m3-pure'));
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-a, --all', 'Add all available components')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (components: string[], options) => {
    const spinner = ora('Loading configuration...').start();

    try {
      const config = await loadConfig();
      if (!config) {
        spinner.fail(chalk.red('No m3-pure.json found. Run `npx m3-pure init` first.'));
        process.exit(1);
      }

      let componentsToAdd = components;

      if (options.all) {
        componentsToAdd = Object.keys(COMPONENTS_REGISTRY);
      }

      if (componentsToAdd.length === 0) {
        spinner.stop();
        const { selected } = await prompts({
          type: 'multiselect',
          name: 'selected',
          message: 'Which components would you like to add?',
          choices: Object.entries(COMPONENTS_REGISTRY).map(([key, value]) => ({
            title: value.name,
            value: key,
            description: value.description,
          })),
          min: 1,
        });
        componentsToAdd = selected;
        spinner.start();
      }

      const addedHooks = new Set<string>();
      const addedStyles = new Set<string>();

      for (const componentName of componentsToAdd) {
        const component = COMPONENTS_REGISTRY[componentName.toLowerCase()];
        if (!component) {
          console.log(chalk.yellow(`\n  Unknown component: ${componentName}`));
          continue;
        }

        spinner.text = `Adding ${component.name}...`;

        for (const file of component.files) {
          const sourcePath = getSourcePath(file.source);
          const targetPath = path.join(config.componentsDir, file.target);

          console.log('DEBUG SOURCE:', sourcePath);
          console.log('DEBUG EXISTS:', await fs.pathExists(sourcePath));
          console.log('DEBUG TARGET:', targetPath);

          if (await fs.pathExists(sourcePath)) {
            const absoluteTarget = path.join(process.cwd(), targetPath);
            
            if ((await fs.pathExists(absoluteTarget)) && !options.overwrite) {
              console.log(chalk.yellow(`\n  Skipping ${file.target} (already exists)`));
              continue;
            }

            await copyComponent(sourcePath, targetPath, config);
            console.log('DEBUG COPIED:', absoluteTarget);
          } else {
            console.log(chalk.red(`\n  Source not found: ${sourcePath}`));
          }
        }

        if (component.hooks) {
          for (const hookName of component.hooks) {
            if (addedHooks.has(hookName)) continue;
            
            const hook = HOOKS_REGISTRY[hookName];
            if (hook) {
              const sourcePath = getSourcePath(hook.source);
              const targetPath = path.join(config.hooksDir, hook.target);

              if (await fs.pathExists(sourcePath)) {
                await copyComponent(sourcePath, targetPath, config);
                addedHooks.add(hookName);
              }
            }
          }
        }

        if (component.styles) {
          for (const styleName of component.styles) {
            if (addedStyles.has(styleName)) continue;
            
            const style = STYLES_REGISTRY[styleName];
            if (style) {
              const sourcePath = getSourcePath(style.source);
              const targetPath = path.join(config.stylesDir, style.target);

              if (await fs.pathExists(sourcePath)) {
                await copyComponent(sourcePath, targetPath, config);
                addedStyles.add(styleName);
              }
            }
          }
        }
      }

      spinner.succeed(chalk.green(`Added ${componentsToAdd.length} component(s)`));

      console.log('');
      console.log('Added files:');
      for (const componentName of componentsToAdd) {
        const component = COMPONENTS_REGISTRY[componentName.toLowerCase()];
        if (component) {
          for (const file of component.files) {
            console.log(chalk.dim(`  - ${path.join(config.componentsDir, file.target)}`));
          }
        }
      }

      if (addedHooks.size > 0) {
        console.log('');
        console.log('Added hooks:');
        for (const hookName of addedHooks) {
          const hook = HOOKS_REGISTRY[hookName];
          if (hook) {
            console.log(chalk.dim(`  - ${path.join(config.hooksDir, hook.target)}`));
          }
        }
      }

      console.log('');
      console.log(chalk.cyan('Usage example:'));
      console.log(chalk.dim(`  import { Button } from '@/components/ui/button'`));
      console.log('');
    } catch (error) {
      spinner.fail(chalk.red('Failed to add components'));
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available components')
  .action(() => {
    console.log('');
    console.log(chalk.bold('Available M3 Pure Components:'));
    console.log('');

    for (const [key, component] of Object.entries(COMPONENTS_REGISTRY)) {
      console.log(`  ${chalk.cyan(key.padEnd(15))} ${component.description}`);
    }

    console.log('');
    console.log(chalk.dim('Add a component with: npx m3-pure add <component>'));
    console.log('');
  });

program
  .command('diff [component]')
  .description('Show differences between local and registry components')
  .action(async (componentName: string) => {
    const config = await loadConfig();
    if (!config) {
      console.log(chalk.red('No m3-pure.json found. Run `npx m3-pure init` first.'));
      process.exit(1);
    }

    const component = COMPONENTS_REGISTRY[componentName?.toLowerCase()];
    if (!component) {
      console.log(chalk.yellow(`Unknown component: ${componentName}`));
      console.log('Run `npx m3-pure list` to see available components.');
      process.exit(1);
    }

    console.log(chalk.bold(`\nChecking ${component.name} for differences...\n`));

    for (const file of component.files) {
      const sourcePath = getSourcePath(file.source);
      const targetPath = path.join(process.cwd(), config.componentsDir, file.target);

      const sourceExists = await fs.pathExists(sourcePath);
      const targetExists = await fs.pathExists(targetPath);

      if (!targetExists) {
        console.log(chalk.yellow(`  ⊘ ${file.target} - Not installed`));
      } else if (!sourceExists) {
        console.log(chalk.red(`  ✗ ${file.target} - Source not found`));
      } else {
        const sourceContent = await fs.readFile(sourcePath, 'utf-8');
        const targetContent = await fs.readFile(targetPath, 'utf-8');

        if (sourceContent === targetContent) {
          console.log(chalk.green(`  ✓ ${file.target} - Up to date`));
        } else {
          console.log(chalk.cyan(`  ≠ ${file.target} - Has local changes`));
        }
      }
    }

    console.log('');
  });

program.parse();