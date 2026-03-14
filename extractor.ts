import { globby } from 'globby'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const BASE = './material-web'
const OUT = './extracted'

async function extract() {
  const componentDirs = [
    'button', 'checkbox', 'chips', 'dialog', 'divider', 
    'fab', 'field', 'icon', 'iconbutton', 'list', 
    'menu', 'progress', 'radio', 'select', 'slider', 
    'switch', 'tabs', 'textfield', 'labs'
  ]

  for (const comp of componentDirs) {
    console.log(`Processing ${comp}...`)
    
    const allFiles = await globby([
      `${comp}/**/*.ts`,
      `${comp}/**/*.scss`,
      `${comp}/**/*.css`
    ], {
      cwd: BASE,
      ignore: [
        '**/*.test.ts',
        '**/*.d.ts',
        '**/demo/**',
        '**/harness.ts'
      ]
    })

    if (!allFiles.length) {
      console.log(`  Skip ${comp} - no files`)
      continue
    }

    const outDir = join(OUT, comp)
    await mkdir(outDir, { recursive: true })

    let output = ''

    for (const file of allFiles.sort()) {
      const fullPath = join(BASE, file)
      const content = await readFile(fullPath, 'utf-8')
      const ext = file.split('.').pop()
      const commentStart = ext === 'ts' ? '//' : '/*'
      const commentEnd = ext === 'ts' ? '' : ' */'
      
      output += `\n\n${commentStart} ========== /${file.replace(`${comp}/`, '')} ==========${commentEnd}\n${content}`
    }

    await writeFile(join(outDir, 'full.txt'), output.trim())
    console.log(`  ✓ ${comp} (${allFiles.length} files)`)
  }

  console.log('\n✅ Готово! ./extracted/<component>/full.txt')
}

extract().catch(console.error)