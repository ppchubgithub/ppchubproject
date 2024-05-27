/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// NextJS Material Dashboard 2 PRO Base Styles
import colors from "/assets/theme/base/colors";
import typography from "/assets/theme/base/typography";

// NextJS Material Dashboard 2 PRO Helper Functions
import pxToRem from "/assets/theme/functions/pxToRem";

const { text, dark, secondary, transparent } = colors;
const { size } = typography;

const buttonText = {
  base: {
    backgroundColor: transparent.main,
    minHeight: pxToRem(40),
    color: text.main,
    boxShadow: "none",
    padding: `${pxToRem(10)} ${pxToRem(24)}`,

    "&:hover": {
      backgroundColor: transparent.main,
      boxShadow: "none",
    },

    "&:focus": {
      boxShadow: "none",
    },

    "&:active, &:active:focus, &:active:hover": {
      opacity: 0.85,
      boxShadow: "none",
    },

    "&:disabled": {
      boxShadow: "none",
    },

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)}`,
    },
  },

  small: {
    minHeight: pxToRem(32),
    padding: `${pxToRem(6)} ${pxToRem(16)}`,
    fontSize: 16,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(16)}`,
    },
  },

  large: {
    minHeight: pxToRem(47),
    padding: `${pxToRem(12)} ${pxToRem(28)}`,
    fontSize: 24,

    "& .material-icon, .material-icons-round, svg": {
      fontSize: `${pxToRem(24)}`,
    },
  },

  primary: {
    color: dark.main,

    "&:hover": {
      color: dark.main,
    },

    "&:focus:not(:hover)": {
      color: dark.focus,
      boxShadow: "none",
    },
  },

  secondary: {
    color: secondary.main,

    "&:hover": {
      color: secondary.main,
    },

    "&:focus:not(:hover)": {
      color: secondary.focus,
      boxShadow: "none",
    },
  },
};

export default buttonText;
