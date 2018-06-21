import Cookie from 'js-cookie';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import enUS from 'antd/lib/locale-provider/en_US';
import ruMessages from './locales/ru.json';
import enMessages from './locales/en.json';

import {addLocaleData} from 'react-intl';

class Locale {
  setIntl(intl) {
    this.intl = intl
  }

  locales () {
    return {
      'en-US': {
        locale: 'en-US',
        title: 'English',
        data: en,
        antd: enUS,
        messages: enMessages
      },
      'ru-RU': {
        locale: 'ru-RU',
        title: 'Русский',
        data: ru,
        antd: ruRU,
        messages: ruMessages
      }
    }
  }

  getLocale() {
    return this.locales()[this.get()];
  }

  get() {
    const locale = Cookie.get('locale');
    const locales = this.locales();
    return locale in locales ? locale : locales['en-US'].locale;
  }

  set(locale) {
    Cookie.set('locale', locale);
  }

  addLocaleData () {
    let l = this.getLocale();
    addLocaleData(l.data);
  }

  getAntdLocale() {
    return this.getLocale().antd;
  }

  getMessages() {
    return this.getLocale().messages;
  }

}

export default (new Locale())