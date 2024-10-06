export default {
  token: {
    colorPrimary: "#FF4D4F",
    borderRadius: 2,
  },
  components: {
    Layout: {
      // colorBgHeader: "#17212B", // colorBgBase -3% lightness, i've pre-calculated these values manually, but it'd be smart to use color.js or something like that to manage these manipulations
      // colorBgSider: "red",
    },
    Checkbox: {
      colorBorder: "rgb(107, 105, 105)",
      lineWidth: 2,
    },
    Modal: {
      contentBg: "rgb(245, 245, 245)",
      headerBg: "rgb(245, 245, 245)",
    },
    Button: {
      borderRadius: 2,
      borderRadiusLG: 2,
      borderRadiusSM: 2,
      controlOutline: "",
      colorPrimary: "rgb(18, 18, 18)",
      colorText: "rgb(18, 18, 18)",
      fontWeight: 700,
      defaultBorderColor: "rgb(125, 125, 125)",
      colorPrimaryHover: "rgb(107, 105, 105)",
      colorPrimaryActive: "rgb(107, 105, 105)",
    },
    // Select: {
    //   colorPrimary: "rgb(18, 18, 18)",
    // },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      titleMargin: 0,
      marginXS: 0,
      marginXXS: 0,
    },
    Menu: {
      itemBg: "#F0F0F0",
      itemMarginInline: 0,
      subMenuItemBg: "#F0F0F0",
    },
    Tag: {
      marginXS: 0,
      colorSuccess: "#000",
      colorSuccessBg: "rgb(247,206,200)",
      colorSuccessBorder: "rgb(247,206,200)",
    },
  },
};
