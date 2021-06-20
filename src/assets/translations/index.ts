/** Header */
import viHeader from './header/vi.json';
import enHeader from './header/en.json';

/** Main */
import viMain from './main/vi.json';
import enMain from './main/en.json';

/** Footer */
import viFooter from './footer/vi.json';
import enFooter from './footer/en.json';

const translations: any = {
  vi: { ...viHeader, ...viMain, ...viFooter },
  en: { ...enHeader, ...enMain, ...enFooter },
};

export default translations;
