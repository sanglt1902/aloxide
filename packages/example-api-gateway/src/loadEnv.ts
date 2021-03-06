import Logger from 'bunyan';
import dote from 'dotenv-extended';

declare global {
  var logger: Logger;
}

(() => {
  if (process.env.dote_loaded) {
    return;
  }

  dote.load({
    encoding: 'utf8',
    silent: true,
    path: '.env',
    defaults: '.env.defaults',
    schema: '.env.defaults',
    errorOnMissing: true,
    errorOnExtra: true,
    errorOnRegex: false,
    includeProcessEnv: false,
    assignToProcessEnv: true,
    overrideProcessEnv: false,
  });

  process.env.dote_loaded = 'true';

  if (!global.logger) {
    global.logger = Logger.createLogger({
      level: 'debug',
      name: 'example-api-gateway',
    });
  }
})();
