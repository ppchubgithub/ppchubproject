const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "react-github-btn",
]);

module.exports = withTM({
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/workspaces",
        permanent: true,
      },
    ];
  },
});
