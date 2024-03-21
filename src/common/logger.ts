import { LambdaLog } from 'lambda-log';

const log = new LambdaLog({
  debug: process.env.DEBUG === 'true',
});

export default log;
