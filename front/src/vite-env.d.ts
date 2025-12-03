/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// some global object injected by platform
declare global {
  interface Window {
    aiSdk?: Record<string, any>;
    ywConfig?: Record<string, any>;
    ywSdk?: Record<string, any>;
  }
}

export { };