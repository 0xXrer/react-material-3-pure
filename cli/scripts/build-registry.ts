import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const SRC = path.join(ROOT, 'src');
const REGISTRY_PATH = path.join(ROOT, 'registry.json');
const OUTPUT = path.join(ROOT, 'cli', 'src', 'generated', 'registry.ts');

interface FileEntry {
  path: string;
  target: string;
  type: string;
}

interface ComponentEntry {
  name: string;
  description: string;
  files: FileEntry[];
  hooks?: string[];
  styles?: string[];
}

interface HookEntry {
  name: string;
  description: string;
  files: FileEntry[];
}

interface StyleEntry {
  name: string;
  description: string;
  files: FileEntry[];
}

interface Registry {
  name: string;
  version: string;
  description: string;
  components: Record<string, ComponentEntry>;
  hooks: Record<string, HookEntry>;
  styles: Record<string, StyleEntry>;
}

function readSource(relativePath: string): string {
  const fullPath = path.join(SRC, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing: ${fullPath}`);
    process.exit(1);
  }
  let content = fs.readFileSync(fullPath, 'utf-8');

  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/hooks['"]/g,
    "from '../hooks/useRipple'"
  );
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/hooks\/index['"]/g,
    "from '../hooks/useRipple'"
  );

  return content;
}

function escapeForTemplate(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function main() {
  const registry: Registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));

  const lines: string[] = [];
  lines.push('// AUTO-GENERATED — do not edit. Run `npm run build:registry` to regenerate.');
  lines.push('');

  lines.push('export interface RegistryFile {');
  lines.push('  target: string;');
  lines.push('  type: string;');
  lines.push('  content: string;');
  lines.push('}');
  lines.push('');
  lines.push('export interface RegistryComponent {');
  lines.push('  name: string;');
  lines.push('  description: string;');
  lines.push('  files: RegistryFile[];');
  lines.push('  hooks: string[];');
  lines.push('  styles: string[];');
  lines.push('}');
  lines.push('');
  lines.push('export interface RegistryHook {');
  lines.push('  name: string;');
  lines.push('  description: string;');
  lines.push('  files: RegistryFile[];');
  lines.push('}');
  lines.push('');
  lines.push('export interface RegistryStyle {');
  lines.push('  name: string;');
  lines.push('  description: string;');
  lines.push('  files: RegistryFile[];');
  lines.push('}');
  lines.push('');

  lines.push(`export const REGISTRY_VERSION = ${JSON.stringify(registry.version)};`);
  lines.push('');

  lines.push('export const COMPONENTS: Record<string, RegistryComponent> = {');
  for (const [key, comp] of Object.entries(registry.components)) {
    const files = comp.files.map((f) => {
      const content = readSource(f.path);
      return `    { target: ${JSON.stringify(f.target)}, type: ${JSON.stringify(f.type)}, content: \`${escapeForTemplate(content)}\` }`;
    });
    lines.push(`  ${JSON.stringify(key)}: {`);
    lines.push(`    name: ${JSON.stringify(comp.name)},`);
    lines.push(`    description: ${JSON.stringify(comp.description)},`);
    lines.push(`    hooks: ${JSON.stringify(comp.hooks || [])},`);
    lines.push(`    styles: ${JSON.stringify(comp.styles || [])},`);
    lines.push(`    files: [`);
    lines.push(files.join(',\n'));
    lines.push(`    ],`);
    lines.push(`  },`);
  }
  lines.push('};');
  lines.push('');

  lines.push('export const HOOKS: Record<string, RegistryHook> = {');
  for (const [key, hook] of Object.entries(registry.hooks)) {
    const files = hook.files.map((f) => {
      const content = readSource(f.path);
      return `    { target: ${JSON.stringify(f.target)}, type: ${JSON.stringify(f.type)}, content: \`${escapeForTemplate(content)}\` }`;
    });
    lines.push(`  ${JSON.stringify(key)}: {`);
    lines.push(`    name: ${JSON.stringify(hook.name)},`);
    lines.push(`    description: ${JSON.stringify(hook.description)},`);
    lines.push(`    files: [`);
    lines.push(files.join(',\n'));
    lines.push(`    ],`);
    lines.push(`  },`);
  }
  lines.push('};');
  lines.push('');

  lines.push('export const STYLES: Record<string, RegistryStyle> = {');
  for (const [key, style] of Object.entries(registry.styles)) {
    const files = style.files.map((f) => {
      const content = readSource(f.path);
      return `    { target: ${JSON.stringify(f.target)}, type: ${JSON.stringify(f.type)}, content: \`${escapeForTemplate(content)}\` }`;
    });
    lines.push(`  ${JSON.stringify(key)}: {`);
    lines.push(`    name: ${JSON.stringify(style.name)},`);
    lines.push(`    description: ${JSON.stringify(style.description)},`);
    lines.push(`    files: [`);
    lines.push(files.join(',\n'));
    lines.push(`    ],`);
    lines.push(`  },`);
  }
  lines.push('};');
  lines.push('');

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, lines.join('\n'));

  const compCount = Object.keys(registry.components).length;
  const hookCount = Object.keys(registry.hooks).length;
  const styleCount = Object.keys(registry.styles).length;
  console.log(`✓ Registry built: ${compCount} components, ${hookCount} hooks, ${styleCount} styles → ${path.relative(ROOT, OUTPUT)}`);
}

main();
