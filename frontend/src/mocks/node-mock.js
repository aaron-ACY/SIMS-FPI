// A robust mock for Node.js modules in the browser
const noop = () => {};
const emptyObj = {};

export const readdirSync = () => [];
export const statSync = () => ({ isDirectory: () => false });
export const existsSync = () => false;
export const readFileSync = () => "";
export const join = (...args) => args.join('/');
export const resolve = (...args) => args.join('/');
export const relative = () => "";
export const dirname = () => "";
export const basename = () => "";
export const extname = () => "";

export class EventEmitter {
  on() { return this; }
  off() { return this; }
  once() { return this; }
  emit() { return true; }
  removeListener() { return this; }
  removeAllListeners() { return this; }
}

export default {
  readdirSync,
  statSync,
  existsSync,
  readFileSync,
  join,
  resolve,
  relative,
  dirname,
  basename,
  extname,
  EventEmitter,
  noop,
  ...emptyObj
};
