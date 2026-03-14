#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';

import {
  COMPONENTS,
  HOOKS,
  STYLES,
  REGISTRY_VERSION,
} from './generated/registry.js';

const VERSION = '0.4.0';

interface M3Config {
  $schema?: string;
  componentsDir: string;
  hooksDir: string;
  stylesDir: string;
  typescript: boolean;
  cssModules: boolean;
  installed?: Record<string, string>;
}

const DEFAULT_CONFIG: M3Config = {
  componentsDir: 'src/components/ui',
  hooksDir: 'src/hooks',
  stylesDir: 'src/styles',
  typescript: true,
  cssModules: true,
};

function getConfigPath(cwd: string): string {
  return path.join(cwd, 'm3-pure.json');
}

async function loadConfig(cwd: string): Promise<M3Config | null> {
  const p = getConfigPath(cwd);
  if (await fs.pathExists(p)) return fs.readJson(p);
  return null;
}

async function saveConfig(cwd: string, config: M3Config): Promise<void> {
  await fs.writeJson(getConfigPath(cwd), config, { spaces: 2 });
}

async function writeFile(cwd: string, targetPath: string, content: string): Promise<void> {
  const abs = path.join(cwd, targetPath);
  await fs.ensureDir(path.dirname(abs));
  await fs.writeFile(abs, content);
}

async function fileExists(cwd: string, targetPath: string): Promise<boolean> {
  return fs.pathExists(path.join(cwd, targetPath));
}

async function readInstalledFile(cwd: string, targetPath: string): Promise<string | null> {
  const abs = path.join(cwd, targetPath);
  if (await fs.pathExists(abs)) return fs.readFile(abs, 'utf-8');
  return null;
}

function rewriteImports(content: string, config: M3Config): string {
  const hooksRelative = path.posix.relative(
    path.posix.normalize(config.componentsDir),
    path.posix.normalize(config.hooksDir)
  );

  return content.replace(
    /from\s+['"]\.\.\/hooks\/useRipple['"]/g,
    `from '${hooksRelative}/useRipple'`
  );
}

const program = new Command();

program
  .name('m3-pure')
  .description(chalk.bold('Material Design 3 components for React'))
  .version(VERSION);

// ─── INIT ─────────────────────────────────────────────
program
  .command('init')
  .description('Initialize m3-pure in your project')
  .option('-y, --yes', 'Skip prompts, use defaults')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    const cwd = path.resolve(options.cwd);
    const spinner = ora('Initializing...').start();

    try {
      const existing = await loadConfig(cwd);
      if (existing && !options.yes) {
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

      let config = { ...DEFAULT_CONFIG };

      if (!options.yes) {
        spinner.stop();
        const r = await prompts([
          {
            type: 'text',
            name: 'componentsDir',
            message: 'Components directory?',
            initial: DEFAULT_CONFIG.componentsDir,
          },
          {
            type: 'text',
            name: 'hooksDir',
            message: 'Hooks directory?',
            initial: DEFAULT_CONFIG.hooksDir,
          },
          {
            type: 'text',
            name: 'stylesDir',
            message: 'Styles directory?',
            initial: DEFAULT_CONFIG.stylesDir,
          },
        ]);
        config = { ...config, ...r };
        spinner.start();
      }

      await fs.ensureDir(path.join(cwd, config.componentsDir));
      await fs.ensureDir(path.join(cwd, config.hooksDir));
      await fs.ensureDir(path.join(cwd, config.stylesDir));

      config.installed = {};
      await saveConfig(cwd, config);

      const theme = STYLES['theme'];
      if (theme) {
        for (const f of theme.files) {
          await writeFile(cwd, path.join(config.stylesDir, f.target), f.content);
        }
      }

      const global = STYLES['global'];
      if (global) {
        for (const f of global.files) {
          await writeFile(cwd, path.join(config.stylesDir, f.target), f.content);
        }
      }

      const entryCSS = `/* m3-pure — Material Design 3 tokens & reset */\n@import './theme.css';\n@import './global.css';\n`;
      await writeFile(cwd, path.join(config.stylesDir, 'm3-pure.css'), entryCSS);

      let patched = false;
      if (!options.yes) {
        spinner.stop();
        const entryFiles = [
          'src/main.tsx', 'src/main.ts', 'src/main.jsx', 'src/main.js',
          'src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js',
          'src/App.tsx', 'src/App.jsx',
        ];
        const found = entryFiles.find((f) => fs.pathExistsSync(path.join(cwd, f)));
        if (found) {
          const { patch } = await prompts({
            type: 'confirm',
            name: 'patch',
            message: `Auto-import styles in ${found}?`,
            initial: true,
          });
          if (patch) {
            const absEntry = path.join(cwd, found);
            const original = await fs.readFile(absEntry, 'utf-8');
            const importLine = `import './${path.posix.relative(path.posix.normalize(path.dirname(found)), path.posix.normalize(config.stylesDir))}/m3-pure.css';\n`;
            if (!original.includes('m3-pure.css')) {
              await fs.writeFile(absEntry, importLine + original);
              patched = true;
            }
          }
        }
        spinner.start();
      }

      spinner.succeed(chalk.green('m3-pure initialized!'));
      console.log('');
      if (patched) {
        console.log(`  ${chalk.green('✓')} Theme styles auto-imported`);
      } else {
        console.log(`  ${chalk.cyan('!')} Add this import to your app entry:`);
        console.log(chalk.dim(`     import '${config.stylesDir}/m3-pure.css'`));
      }
      console.log('');
      console.log(chalk.dim('  Next: npx m3-pure add button'));
      console.log('');
    } catch (err) {
      spinner.fail(chalk.red('Init failed'));
      console.error(err);
      process.exit(1);
    }
  });

// ─── ADD ──────────────────────────────────────────────
program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-a, --all', 'Add all components')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('--dry-run', 'Show what would be added without writing')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (components: string[], options) => {
    const cwd = path.resolve(options.cwd);
    const spinner = ora('Loading config...').start();

    try {
      const config = await loadConfig(cwd);
      if (!config) {
        spinner.fail(chalk.red('No m3-pure.json found. Run `npx m3-pure init` first.'));
        process.exit(1);
      }

      let toAdd = components.map((c) => c.toLowerCase());

      if (options.all) {
        toAdd = Object.keys(COMPONENTS);
      }

      if (toAdd.length === 0) {
        spinner.stop();
        const { selected } = await prompts({
          type: 'multiselect',
          name: 'selected',
          message: 'Which components?',
          choices: Object.entries(COMPONENTS).map(([key, val]) => ({
            title: val.name,
            value: key,
            description: val.description,
          })),
          min: 1,
        });
        if (!selected || selected.length === 0) {
          console.log(chalk.yellow('Nothing selected.'));
          process.exit(0);
        }
        toAdd = selected;
        spinner.start();
      }

      const written: string[] = [];
      const skipped: string[] = [];
      const addedHooks = new Set<string>();
      const addedStyles = new Set<string>();

      if (!config.installed) config.installed = {};

      for (const name of toAdd) {
        const comp = COMPONENTS[name];
        if (!comp) {
          spinner.warn(chalk.yellow(`Unknown component: ${name}`));
          spinner.start();
          continue;
        }

        spinner.text = `Adding ${comp.name}...`;

        for (const file of comp.files) {
          const target = path.join(config.componentsDir, file.target);

          if (await fileExists(cwd, target) && !options.overwrite) {
            skipped.push(target);
            continue;
          }

          let content = file.content;
          if (file.type === 'component') {
            content = rewriteImports(content, config);
          }

          if (!options.dryRun) {
            await writeFile(cwd, target, content);
          }
          written.push(target);
        }

        for (const hookName of comp.hooks) {
          if (addedHooks.has(hookName)) continue;
          const hook = HOOKS[hookName];
          if (!hook) continue;

          for (const f of hook.files) {
            const target = path.join(config.hooksDir, f.target);
            if (await fileExists(cwd, target) && !options.overwrite) {
              skipped.push(target);
            } else {
              if (!options.dryRun) {
                await writeFile(cwd, target, f.content);
              }
              written.push(target);
            }
          }
          addedHooks.add(hookName);
        }

        for (const styleName of comp.styles) {
          if (addedStyles.has(styleName)) continue;
          const style = STYLES[styleName];
          if (!style) continue;

          for (const f of style.files) {
            const target = path.join(config.stylesDir, f.target);
            if (await fileExists(cwd, target) && !options.overwrite) {
              skipped.push(target);
            } else {
              if (!options.dryRun) {
                await writeFile(cwd, target, f.content);
              }
              written.push(target);
            }
          }
          addedStyles.add(styleName);
        }

        config.installed[name] = REGISTRY_VERSION;
      }

      if (!options.dryRun) {
        await saveConfig(cwd, config);
      }

      const prefix = options.dryRun ? chalk.blue('[dry-run] ') : '';

      if (written.length > 0) {
        spinner.succeed(`${prefix}${chalk.green(`Added ${toAdd.length} component(s)`)}`);
        console.log('');
        for (const f of written) {
          console.log(`  ${chalk.green('+')} ${chalk.dim(f)}`);
        }
      } else {
        spinner.info(`${prefix}No new files to write`);
      }

      if (skipped.length > 0) {
        console.log('');
        console.log(chalk.dim('  Skipped (already exist):'));
        for (const f of skipped) {
          console.log(`  ${chalk.yellow('~')} ${chalk.dim(f)}`);
        }
      }

      console.log('');
    } catch (err) {
      spinner.fail(chalk.red('Failed to add components'));
      console.error(err);
      process.exit(1);
    }
  });

// ─── LIST ─────────────────────────────────────────────
program
  .command('list')
  .description('List all available components')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    const cwd = path.resolve(options.cwd);
    const config = await loadConfig(cwd);
    const installed = config?.installed || {};

    console.log('');
    console.log(chalk.bold('  M3 Pure Components'));
    console.log(chalk.dim(`  Registry v${REGISTRY_VERSION}`));
    console.log('');

    const maxLen = Math.max(...Object.values(COMPONENTS).map((c) => c.name.length));

    for (const [key, comp] of Object.entries(COMPONENTS)) {
      const isInstalled = key in installed;
      const status = isInstalled ? chalk.green('✓') : chalk.dim('○');
      const name = comp.name.padEnd(maxLen + 2);
      const deps = comp.hooks.length > 0 ? chalk.dim(` [${comp.hooks.join(', ')}]`) : '';
      console.log(`  ${status} ${chalk.cyan(name)}${comp.description}${deps}`);
    }

    console.log('');
    console.log(chalk.dim('  npx m3-pure add <component>'));
    console.log('');
  });

// ─── DIFF ─────────────────────────────────────────────
program
  .command('diff [component]')
  .description('Show differences between installed and registry versions')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (component: string | undefined, options) => {
    const cwd = path.resolve(options.cwd);
    const config = await loadConfig(cwd);
    if (!config) {
      console.log(chalk.red('No m3-pure.json found. Run `npx m3-pure init` first.'));
      process.exit(1);
    }

    const targets = component
      ? [component.toLowerCase()]
      : Object.keys(config.installed || {});

    if (targets.length === 0) {
      console.log(chalk.dim('  No components installed.'));
      return;
    }

    console.log('');
    let totalDiffs = 0;

    for (const name of targets) {
      const comp = COMPONENTS[name];
      if (!comp) continue;

      for (const file of comp.files) {
        const target = path.join(config.componentsDir, file.target);
        const localContent = await readInstalledFile(cwd, target);

        if (!localContent) {
          console.log(`  ${chalk.red('✗')} ${chalk.dim(target)} ${chalk.red('missing')}`);
          totalDiffs++;
          continue;
        }

        let registryContent = file.content;
        if (file.type === 'component') {
          registryContent = rewriteImports(registryContent, config);
        }

        const localNorm = localContent.replace(/\r\n/g, '\n').trim();
        const regNorm = registryContent.replace(/\r\n/g, '\n').trim();

        if (localNorm !== regNorm) {
          console.log(`  ${chalk.yellow('~')} ${chalk.dim(target)} ${chalk.yellow('modified')}`);
          totalDiffs++;
        } else {
          console.log(`  ${chalk.green('✓')} ${chalk.dim(target)}`);
        }
      }
    }

    console.log('');
    if (totalDiffs === 0) {
      console.log(chalk.green('  All files match registry. No local modifications.'));
    } else {
      console.log(chalk.yellow(`  ${totalDiffs} file(s) differ. Use --overwrite to reset.`));
    }
    console.log('');
  });

// ─── DOCTOR ───────────────────────────────────────────
program
  .command('doctor')
  .description('Check project health')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    const cwd = path.resolve(options.cwd);
    let issues = 0;

    console.log('');
    console.log(chalk.bold('  M3 Pure Doctor'));
    console.log('');

    const config = await loadConfig(cwd);
    if (!config) {
      console.log(`  ${chalk.red('✗')} No m3-pure.json found`);
      console.log(chalk.dim('    Run `npx m3-pure init` to set up.'));
      process.exit(1);
    }
    console.log(`  ${chalk.green('✓')} Config loaded`);

    const compDir = path.join(cwd, config.componentsDir);
    if (await fs.pathExists(compDir)) {
      console.log(`  ${chalk.green('✓')} Components dir exists`);
    } else {
      console.log(`  ${chalk.red('✗')} Components dir missing: ${config.componentsDir}`);
      issues++;
    }

    const hooksDir = path.join(cwd, config.hooksDir);
    if (await fs.pathExists(hooksDir)) {
      console.log(`  ${chalk.green('✓')} Hooks dir exists`);
    } else {
      console.log(`  ${chalk.red('✗')} Hooks dir missing: ${config.hooksDir}`);
      issues++;
    }

    const stylesDir = path.join(cwd, config.stylesDir);
    if (await fs.pathExists(stylesDir)) {
      console.log(`  ${chalk.green('✓')} Styles dir exists`);
    } else {
      console.log(`  ${chalk.red('✗')} Styles dir missing: ${config.stylesDir}`);
      issues++;
    }

    const installed = config.installed || {};
    const neededHooks = new Set<string>();
    const neededStyles = new Set<string>();

    for (const name of Object.keys(installed)) {
      const comp = COMPONENTS[name];
      if (!comp) {
        console.log(`  ${chalk.yellow('~')} Installed unknown component: ${name}`);
        issues++;
        continue;
      }

      let allPresent = true;
      for (const file of comp.files) {
        const target = path.join(config.componentsDir, file.target);
        if (!(await fileExists(cwd, target))) {
          console.log(`  ${chalk.red('✗')} Missing file: ${target}`);
          issues++;
          allPresent = false;
        }
      }
      if (allPresent) {
        console.log(`  ${chalk.green('✓')} ${comp.name} files present`);
      }

      comp.hooks.forEach((h) => neededHooks.add(h));
      comp.styles.forEach((s) => neededStyles.add(s));
    }

    for (const hookName of neededHooks) {
      const hook = HOOKS[hookName];
      if (!hook) continue;
      for (const f of hook.files) {
        const target = path.join(config.hooksDir, f.target);
        if (await fileExists(cwd, target)) {
          console.log(`  ${chalk.green('✓')} Hook ${hookName} present`);
        } else {
          console.log(`  ${chalk.red('✗')} Missing hook: ${target}`);
          issues++;
        }
      }
    }

    for (const styleName of neededStyles) {
      const style = STYLES[styleName];
      if (!style) continue;
      for (const f of style.files) {
        const target = path.join(config.stylesDir, f.target);
        if (await fileExists(cwd, target)) {
          console.log(`  ${chalk.green('✓')} Style ${styleName} present`);
        } else {
          console.log(`  ${chalk.red('✗')} Missing style: ${target}`);
          issues++;
        }
      }
    }

    const m3CssPath = path.join(config.stylesDir, 'm3-pure.css');
    if (await fileExists(cwd, m3CssPath)) {
      console.log(`  ${chalk.green('✓')} m3-pure.css entry file present`);
    } else {
      console.log(`  ${chalk.yellow('~')} m3-pure.css entry missing — run init again or create ${m3CssPath}`);
      issues++;
    }

    const entryFiles = [
      'src/main.tsx', 'src/main.ts', 'src/main.jsx', 'src/main.js',
      'src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js',
    ];
    let themeImported = false;
    for (const ef of entryFiles) {
      const abs = path.join(cwd, ef);
      if (await fs.pathExists(abs)) {
        const content = await fs.readFile(abs, 'utf-8');
        if (content.includes('m3-pure.css') || content.includes('theme.css')) {
          themeImported = true;
        }
        break;
      }
    }
    if (themeImported) {
      console.log(`  ${chalk.green('✓')} Theme styles imported in app entry`);
    } else {
      console.log(`  ${chalk.red('✗')} Theme styles NOT imported — add: import '${config.stylesDir}/m3-pure.css'`);
      issues++;
    }

    console.log('');
    if (issues === 0) {
      console.log(chalk.green('  ✓ Everything looks good!'));
    } else {
      console.log(chalk.red(`  ${issues} issue(s) found.`));
    }
    console.log('');
  });

program.parse();