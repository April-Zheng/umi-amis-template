/* eslint-disable no-underscore-dangle */
const getPassportHost = (
  { hostname, pathname } = {
    hostname: "passport",
    pathname: `login?back_uri=${encodeURIComponent(window.location.href)}`,
  },
) => {
  const ipv4Pattern =
    /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;

  const spPathname = `login/sp?back_uri=${encodeURIComponent(
    window.location.href,
  )}`;
  // @ts-ignore
  const { platform } = window?._CONSOLE_;

  const _pathname = `/${hostname}/${platform === "sp" ? spPathname : pathname}`;

  // @ts-ignore
  const { protocol, passport_host } = window?._CONSOLE_?.config;

  if (ipv4Pattern.test(window.location.host)) {
    window.location.href = _pathname;
  } else {
    window.location.href = protocol + passport_host + _pathname;
  }
};

export { getPassportHost };
