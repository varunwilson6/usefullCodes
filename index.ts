const poll = async ({ fn, validate, interval, maxAttempts }) => {
  let attempts = 0;

  const executePoll = async (resolve, reject) => {
    const result = await fn();
    attempts++;

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new Error("Exceeded max attempts"));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};

const isSameOrigin = (url: string) =>
  new URL(url, window.location.href).origin === window.location.origin;

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
const isMobile = navigator.userAgent.includes("Mobi");

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const decodeBase64 = (base64: string) =>
  new TextDecoder().decode(
    new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0))
    )
  );

const encodeBase64 = (str: string) =>
  btoa(
    Array.from(new TextEncoder().encode(str))
      .map((n) => String.fromCharCode(n))
      .join("")
  );

const xor = (...args: any[]) => args.filter(Boolean).length === 1;
