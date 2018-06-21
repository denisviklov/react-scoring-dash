import antdEn from "antd/lib/locale-provider/ru_RU";
import appLocaleData from "react-intl/locale-data/ru";
import enMessages from "./locales/ru.json";

window.appLocale = {
  messages: {
    ...ruMessages
  },
  antd: antdEn,
  locale: "ru-RU",
  data: appLocaleData
};
