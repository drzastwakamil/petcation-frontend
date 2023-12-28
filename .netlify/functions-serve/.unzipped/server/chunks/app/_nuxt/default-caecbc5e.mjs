import { _ as __nuxt_component_0 } from './nuxt-img-970693dc.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col" }, _attrs))}><div class="absolute w-full border-b"><div class="container mx-auto"><div class="flex h-20 w-full py-4"><div class="z-10">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    class: "h-full",
    src: "/images/logo5.svg"
  }, null, _parent));
  _push(`</div></div></div></div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-caecbc5e.mjs.map
