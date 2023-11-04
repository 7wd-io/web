import { WonderId } from 'src/models/game';
import { Nickname } from 'src/models/account';

export default class City {
  static classWonderHolder = 'swd-js-city-wonder-holder';

  static classBurnHolder = 'swd-js-city-burn-holder';

  static classCardInHolder = 'swd-js-city-card-in-holder';

  static classWondersBar = 'swd-js-wonders-bar';

  static classTokensBar = 'swd-js-tokens-bar';

  static classLeftMarker = 'swd-js-city-left';

  static classRightMarker = 'swd-js-right-left';

  private name: Nickname;

  private $city: HTMLElement | undefined;

  constructor(name: Nickname) {
    this.name = name;
  }

  getClassnameCity() {
    return `swd-js-city-${this.name}`;
  }

  static getClassnameCity(name: Nickname) {
    return `swd-js-city-${name}`;
  }

  static getClassnameWonder(id: WonderId) {
    return `swd-js-city-wonder-${id}`;
  }

  getElementCity() {
    if (!this.$city) {
      this.$city = document.querySelector(
        `.${this.getClassnameCity()}`
      ) as HTMLElement;
    }

    return this.$city;
  }

  getElementWonderHolder() {
    return this.getElementCity().querySelector(
      `.${City.classWonderHolder}`
    ) as HTMLElement;
  }

  getElementWondersBar() {
    return this.getElementCity().querySelector(
      `.${City.classWondersBar}`
    ) as HTMLElement;
  }

  getElementWonder(id: WonderId) {
    return this.getElementCity().querySelector(
      `.${City.getClassnameWonder(id)}`
    ) as HTMLElement;
  }

  getElementBurnHolder() {
    return this.getElementCity().querySelector(
      `.${City.classBurnHolder}`
    ) as HTMLElement;
  }

  getElementCardInHolder() {
    return this.getElementCity().querySelector(
      `.${City.classCardInHolder}`
    ) as HTMLElement;
  }

  getElementTokensBar() {
    return this.getElementCity().querySelector(
      `.${City.classTokensBar}`
    ) as HTMLElement;
  }

  isLeft() {
    return this.getElementCity().classList.contains(City.classLeftMarker);
  }
}
