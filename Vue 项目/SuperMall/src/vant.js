import Vue from "vue";
import 'vant/lib/index.css';
import Vant from "vant";
import { Toast } from "vant";
Toast.setDefaultOptions({ duration: 700 });
import { Checkbox, CheckboxGroup, Tabbar, TabbarItem, SwipeCell ,Card,Button } from "vant";
Vue.use(SwipeCell); 
Vue.use(Button);
Vue.use(Card);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);

export default Vant