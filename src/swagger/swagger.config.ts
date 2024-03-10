import { OpenAPIObject } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { resolve } from 'path';
import { parse } from 'yamljs';

const RELATIVE_API_YAML_PATH = '../../doc/api.yaml';

export const getSwaggerConfig = async (): Promise<
  Omit<OpenAPIObject, 'paths'>
> => {
  const apiYamlPath: string = resolve(__dirname, RELATIVE_API_YAML_PATH);
  const file: string = await readFile(apiYamlPath, 'utf-8');
  return parse(file);
};
