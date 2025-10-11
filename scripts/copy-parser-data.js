import { copyFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_DIR = path.join(__dirname, '../../ausn-parser/output')
const TARGET_DIR = path.join(__dirname, '../public/data')

const FILES = ['regions.json', 'banks.json']

async function copyParserData() {
  console.log('Копирование данных из парсера...')
  
  // Создаем целевую директорию
  if (!existsSync(TARGET_DIR)) {
    await mkdir(TARGET_DIR, { recursive: true })
    console.log('✓ Создана директория public/data')
  }
  
  // Копируем файлы
  for (const file of FILES) {
    const source = path.join(SOURCE_DIR, file)
    const target = path.join(TARGET_DIR, file)
    
    if (existsSync(source)) {
      await copyFile(source, target)
      console.log(`✓ Скопирован ${file}`)
    } else {
      console.warn(`⚠ Файл ${file} не найден в ${SOURCE_DIR}`)
    }
  }
  
  console.log('Копирование завершено!')
}

copyParserData().catch(error => {
  console.error('Ошибка:', error.message)
  process.exit(1)
})

