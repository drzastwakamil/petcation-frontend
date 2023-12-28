import { _ as __nuxt_component_0 } from './nuxt-img-970693dc.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import './index-6a088328.mjs';
import '@unhead/shared';
import '../../nitro/netlify.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:url';
import 'ipx';
import 'unhead';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="bg-gradient-to-r from-white to-[#FFC6C6]"><div class="container mx-auto bg-transparent pt-20"><div class="grid max-h-[80vh] grid-cols-2 gap-16"><div class="flex flex-col justify-center"><h1 class="pb-10 text-6xl font-bold">Znajd\u017A idealne miejsce dla Twojego pupila</h1><p class="text-xl"> Nasza platforma zawiera tylko sprawdzone i renomowane hotele dla zwierz\u0105t, aby\u015B m\xF3g\u0142 podr\xF3\u017Cowa\u0107 z pe\u0142nym spokojem. </p></div>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    class: "max-h-[80vh]",
    src: "/images/dog_n_cat.png"
  }, null, _parent));
  _push(`</div></div></div><div class="flex justify-center gap-16 pt-16">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    height: "400",
    src: "/images/search_image.svg",
    width: "400"
  }, null, _parent));
  _push(`<div class="flex max-w-[400px] flex-col justify-center"><h1 class="pb-10 text-6xl font-bold">Wyszukaj</h1><p class="text-xl">Wprowad\u017A swoje preferencje i przeszukaj nasz\u0105 baz\u0119 hoteli dla zwierz\u0105t.</p></div></div><div class="flex justify-center gap-16 pt-16"><div class="flex max-w-[400px] flex-col justify-center"><h1 class="pb-10 text-6xl font-bold">Wybierz</h1><p class="text-xl">Por\xF3wnaj r\xF3\u017Cne hotele i wybierz ten, kt\xF3ry najbardziej Ci odpowiada.</p></div>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    height: "400",
    src: "/images/choose_image.svg",
    width: "400"
  }, null, _parent));
  _push(`</div><div class="flex justify-center gap-16 py-16">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    height: "400",
    src: "/images/book_image.svg",
    width: "400"
  }, null, _parent));
  _push(`<div class="flex max-w-[400px] flex-col justify-center"><h1 class="pb-10 text-6xl font-bold">Rezerwuj</h1><p class="text-xl"> Dokonaj rezerwacji online i zapewnij swojemu zwierzakowi komfortowy pobyt podczas Twojej nieobecno\u015Bci. </p></div></div><div class="bg-gradient-to-r from-[#E1EBFB] to-white"><div class="container mx-auto bg-transparent"><div class="grid grid-cols-2 gap-16 pt-16">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    class: "",
    src: "/images/home_image.png"
  }, null, _parent));
  _push(`<div class="flex flex-col justify-center"><h1 class="pb-10 text-6xl font-bold">Bezpiecze\u0144stwo ponad wszystko</h1><p class="text-xl"> Nasz system oceniania gwarantuje spok\xF3j. Tylko zwierz\u0119ta z dobrymi opiniami znajduj\u0105 miejsce w naszych hotelach. </p></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-640c472d.mjs.map
