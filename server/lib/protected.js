import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { get } from 'lodash';

export const getConfig = (key) => {
	const configPath = path.join(__dirname, '../../config/config.yaml');
	const config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));

	return get(config, key, null);
}