const isProd = () => process.env.NODE_ENV === 'production';
const isTest = () => process.env.NODE_ENV === 'test';
let loaded = false;

function loadEnv() {
  if (loaded) return;
  loaded = true;

  if (isProd()) {
    return;
  }

  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

  const fs = require('fs');
  const path = require('path');
  const dotEnvExpand = require('dotenv-expand');
  const dotEnv = require('dotenv');

  const envFiles = ['.env.development', '.env.test', '.env.production', '.env.seed'].filter(
    envFile => new RegExp(`${process.env.NODE_ENV}$`).test(envFile),
  );

  envFiles.push('.env');
  envFiles.forEach(envFile => {
    if (fs.existsSync(envFile)) {
      dotEnvExpand(
        dotEnv.config({ path: path.resolve(process.cwd(), envFile) }),
      );
    }
  });

  /* remove `&& isProd()` for debug env */
  if (!isTest() && isProd()) {
    console.log('\n---- env:', process.env.NODE_ENV);
    const keys = Object.keys(process.env).filter(k => /app__.*/.test(k));
    keys.push('IS_OFFLINE');
    keys.forEach(k => {
      console.log('%s = %s', k, process.env[k]);
    });
  }
}

loadEnv();
