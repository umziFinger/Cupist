import dev from '@/Config/dev';
import prod from '@/Config/prod';

const type = 'development';
const ENV_CONFIG = {
  development: dev,
  production: prod,
};

export default ENV_CONFIG[type] || ENV_CONFIG.development;
