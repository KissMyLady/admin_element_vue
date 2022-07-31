import permission from "./permission";
import Clipboard from "./clipboard";

export default {
  install(Vue) {
    Vue.directive("permission", permission);
    Vue.directive("Clipboard", Clipboard);
  }
};
