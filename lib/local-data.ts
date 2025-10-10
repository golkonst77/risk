import { readFile } from 'fs/promises'
import { join } from 'path'

export async function readJson<T>(relativePath: string): Promise<T> {
  const fullPath = join(process.cwd(), relativePath)
  const content = await readFile(fullPath, 'utf-8')
  return JSON.parse(content) as T
}


