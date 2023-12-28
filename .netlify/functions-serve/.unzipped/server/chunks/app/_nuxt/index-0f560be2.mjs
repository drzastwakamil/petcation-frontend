import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSSRContext, defineComponent, createVNode, resolveDynamicComponent, mergeProps, unref, withCtx, renderSlot, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, ref, Fragment, renderList, computed, isRef, getCurrentInstance, watch, nextTick } from 'vue';
import { ssrRenderVNode, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrGetDynamicModelProps } from 'vue/server-renderer';
import { Search, MapPin, ChevronsUpDown, Check, ChevronLeft, ChevronRight, Calendar, Bone, Cat } from 'lucide-vue-next';
import { cva } from 'class-variance-authority';
import { useForwardPropsEmits, ComboboxRoot, ComboboxEmpty, ComboboxGroup, ComboboxLabel, ComboboxInput, useEmitAsProps, ComboboxItem, PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent, Label } from 'radix-vue';
import { addDays, format } from 'date-fns';
import { DatePicker } from 'v-calendar';
import { _ as __nuxt_component_0 } from './nuxt-link-afaf4e47.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-img-970693dc.mjs';
import { _ as _export_sfc } from '../server.mjs';
import '../../nitro/netlify.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:url';
import 'ipx';
import './index-6a088328.mjs';
import '@unhead/shared';
import 'unhead';
import 'vue-router';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    as: { default: "button" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
        class: ("cn" in _ctx ? _ctx.cn : unref(cn))(unref(buttonVariants)({ variant: _ctx.variant, size: _ctx.size }), (_a = _ctx.$attrs.class) != null ? _a : "")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/Button.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline: "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "Command",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    defaultValue: {},
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    searchTerm: {},
    multiple: { type: Boolean },
    disabled: { type: Boolean },
    name: {},
    dir: {},
    filterFunction: { type: Function },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["update:modelValue", "update:open", "update:searchTerm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(ComboboxRoot), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
          (_a = _ctx.$attrs.class) != null ? _a : ""
        ),
        "model-value": "",
        open: true
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/command/Command.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "CommandEmpty",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(ComboboxEmpty), mergeProps(props, {
        class: unref(cn)("py-6 text-center text-sm", (_a = _ctx.$attrs.class) != null ? _a : "")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/command/CommandEmpty.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "CommandGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] },
    heading: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(ComboboxGroup), mergeProps(props, {
        class: unref(cn)("overflow-hidden p-1 text-zinc-950 dark:text-zinc-50", (_a = _ctx.$attrs.class) != null ? _a : "")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.heading) {
              _push2(ssrRenderComponent(unref(ComboboxLabel), { class: "px-2 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.heading)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.heading), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              _ctx.heading ? (openBlock(), createBlock(unref(ComboboxLabel), {
                key: 0,
                class: "px-2 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.heading), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/command/CommandGroup.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __default__ = {
  inheritAttrs: false
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "CommandInput",
  __ssrInlineRender: true,
  props: {
    type: {},
    disabled: { type: Boolean },
    autoFocus: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex items-center border-b px-3",
        "cmdk-input-wrapper": ""
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Search), { class: "mr-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent));
      _push(ssrRenderComponent(unref(ComboboxInput), mergeProps({ ...props, ..._ctx.$attrs }, {
        "auto-focus": "",
        class: unref(cn)(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400",
          (_a = _ctx.$attrs.class) != null ? _a : ""
        )
      }), null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/command/CommandInput.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "CommandItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = useEmitAsProps(emits);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(ComboboxItem), mergeProps({ ...props, ...unref(emitsAsProps) }, {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-zinc-100 data-[highlighted]:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:data-[highlighted]:bg-zinc-800 dark:data-[highlighted]:text-zinc-50",
          (_a = _ctx.$attrs.class) != null ? _a : ""
        ),
        onSelect: () => {
        }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/command/CommandItem.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Popover",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/Popover.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "PopoverTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverTrigger), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverTrigger.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "PopoverContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    onPlaced: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    disableOutsidePointerEvents: { type: Boolean },
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PopoverPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PopoverContent), mergeProps({ ...unref(forwarded), ..._ctx.$attrs }, {
              class: unref(cn)(
                "z-50 w-72 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(PopoverContent), mergeProps({ ...unref(forwarded), ..._ctx.$attrs }, {
                class: unref(cn)(
                  "z-50 w-72 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/popover/PopoverContent.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Combobox",
  __ssrInlineRender: true,
  setup(__props) {
    const frameworks = [
      { value: "next.js", label: "Pozna\u0144" },
      { value: "sveltekit", label: "Szczecin" },
      { value: "nuxt.js", label: "Warszawa" },
      { value: "remix", label: "Mi\u0119dzyzdroje" },
      { value: "astro", label: "Opole" }
    ];
    const open = ref(false);
    const value = ref();
    const filterFunction = (list, search) => list.filter((i) => i.value.toLowerCase().includes(search.toLowerCase()));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$g), mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$f), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$m), {
                    "aria-expanded": open.value,
                    class: "w-[200px] justify-between",
                    role: "combobox",
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(MapPin), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(value.value ? value.value.label : "Lokalizacja")}</div>`);
                        _push4(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex" }, [
                            createVNode(unref(MapPin), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" " + toDisplayString(value.value ? value.value.label : "Lokalizacja"), 1)
                          ]),
                          createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$m), {
                      "aria-expanded": open.value,
                      class: "w-[200px] justify-between",
                      role: "combobox",
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex" }, [
                          createVNode(unref(MapPin), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" " + toDisplayString(value.value ? value.value.label : "Lokalizacja"), 1)
                        ]),
                        createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                      ]),
                      _: 1
                    }, 8, ["aria-expanded"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), { class: "w-[200px] p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$l), { "filter-function": filterFunction }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), { placeholder: "Wyszukaj" }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`No framework found.`);
                            } else {
                              return [
                                createTextVNode("No framework found.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(frameworks, (framework) => {
                                _push5(ssrRenderComponent(unref(_sfc_main$h), {
                                  key: framework.value,
                                  value: framework,
                                  onSelect: (ev) => {
                                    value.value = ev.detail.value;
                                    open.value = false;
                                  }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    var _a, _b;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(Check), {
                                        class: ("cn" in _ctx ? _ctx.cn : unref(cn))("mr-2 h-4 w-4", ((_a = value.value) == null ? void 0 : _a.value) === framework.value ? "opacity-100" : "opacity-0")
                                      }, null, _parent6, _scopeId5));
                                      _push6(` ${ssrInterpolate(framework.label)}`);
                                    } else {
                                      return [
                                        createVNode(unref(Check), {
                                          class: ("cn" in _ctx ? _ctx.cn : unref(cn))("mr-2 h-4 w-4", ((_b = value.value) == null ? void 0 : _b.value) === framework.value ? "opacity-100" : "opacity-0")
                                        }, null, 8, ["class"]),
                                        createTextVNode(" " + toDisplayString(framework.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                  return createVNode(unref(_sfc_main$h), {
                                    key: framework.value,
                                    value: framework,
                                    onSelect: (ev) => {
                                      value.value = ev.detail.value;
                                      open.value = false;
                                    }
                                  }, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(unref(Check), {
                                          class: ("cn" in _ctx ? _ctx.cn : unref(cn))("mr-2 h-4 w-4", ((_a = value.value) == null ? void 0 : _a.value) === framework.value ? "opacity-100" : "opacity-0")
                                        }, null, 8, ["class"]),
                                        createTextVNode(" " + toDisplayString(framework.label), 1)
                                      ];
                                    }),
                                    _: 2
                                  }, 1032, ["value", "onSelect"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$i), { placeholder: "Wyszukaj" }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode("No framework found.")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                return createVNode(unref(_sfc_main$h), {
                                  key: framework.value,
                                  value: framework,
                                  onSelect: (ev) => {
                                    value.value = ev.detail.value;
                                    open.value = false;
                                  }
                                }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(unref(Check), {
                                        class: ("cn" in _ctx ? _ctx.cn : unref(cn))("mr-2 h-4 w-4", ((_a = value.value) == null ? void 0 : _a.value) === framework.value ? "opacity-100" : "opacity-0")
                                      }, null, 8, ["class"]),
                                      createTextVNode(" " + toDisplayString(framework.label), 1)
                                    ];
                                  }),
                                  _: 2
                                }, 1032, ["value", "onSelect"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$l), { "filter-function": filterFunction }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), { placeholder: "Wyszukaj" }),
                        createVNode(unref(_sfc_main$k), null, {
                          default: withCtx(() => [
                            createTextVNode("No framework found.")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                              return createVNode(unref(_sfc_main$h), {
                                key: framework.value,
                                value: framework,
                                onSelect: (ev) => {
                                  value.value = ev.detail.value;
                                  open.value = false;
                                }
                              }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(unref(Check), {
                                      class: ("cn" in _ctx ? _ctx.cn : unref(cn))("mr-2 h-4 w-4", ((_a = value.value) == null ? void 0 : _a.value) === framework.value ? "opacity-100" : "opacity-0")
                                    }, null, 8, ["class"]),
                                    createTextVNode(" " + toDisplayString(framework.label), 1)
                                  ];
                                }),
                                _: 2
                              }, 1032, ["value", "onSelect"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$f), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$m), {
                    "aria-expanded": open.value,
                    class: "w-[200px] justify-between",
                    role: "combobox",
                    variant: "outline"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex" }, [
                        createVNode(unref(MapPin), { class: "mr-2 h-4 w-4" }),
                        createTextVNode(" " + toDisplayString(value.value ? value.value.label : "Lokalizacja"), 1)
                      ]),
                      createVNode(unref(ChevronsUpDown), { class: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                    ]),
                    _: 1
                  }, 8, ["aria-expanded"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$e), { class: "w-[200px] p-0" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$l), { "filter-function": filterFunction }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), { placeholder: "Wyszukaj" }),
                      createVNode(unref(_sfc_main$k), null, {
                        default: withCtx(() => [
                          createTextVNode("No framework found.")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                            return createVNode(unref(_sfc_main$h), {
                              key: framework.value,
                              value: framework,
                              onSelect: (ev) => {
                                value.value = ev.detail.value;
                                open.value = false;
                              }
                            }, {
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createVNode(unref(Check), {
                                    class: ("cn" in _ctx ? _ctx.cn : unref(cn))("mr-2 h-4 w-4", ((_a = value.value) == null ? void 0 : _a.value) === framework.value ? "opacity-100" : "opacity-0")
                                  }, null, 8, ["class"]),
                                  createTextVNode(" " + toDisplayString(framework.label), 1)
                                ];
                              }),
                              _: 2
                            }, 1032, ["value", "onSelect"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/combobox/Combobox.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const isDef = (val) => typeof val !== "undefined";
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  if (!key) {
    {
      key = "modelValue";
    }
  }
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue();
    const proxy = ref(initialValue);
    let isUpdating = false;
    watch(
      () => props[key],
      (v) => {
        if (!isUpdating) {
          isUpdating = true;
          proxy.value = cloneFn(v);
          nextTick(() => isUpdating = false);
        }
      }
    );
    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key] || deep))
          triggerEmit(v);
      },
      { deep }
    );
    return proxy;
  } else {
    return computed({
      get() {
        return getValue();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Calendar",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    modelModifiers: {},
    columns: { default: 1 },
    type: { default: "single" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true
    });
    const datePicker = ref();
    computed(() => datePicker.value.calendarRef);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div class="absolute top-3 flex w-full justify-between px-4"><button class="${ssrRenderClass(unref(cn)(unref(buttonVariants)({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"))}">`);
      _push(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent));
      _push(`</button><button class="${ssrRenderClass(unref(cn)(unref(buttonVariants)({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"))}">`);
      _push(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></div>`);
      _push(ssrRenderComponent(unref(DatePicker), mergeProps({
        ref_key: "datePicker",
        ref: datePicker,
        modelValue: unref(modelValue),
        "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null
      }, _ctx.$attrs, {
        class: "calendar",
        columns: _ctx.columns,
        "model-modifiers": _ctx.modelModifiers,
        transition: "none",
        "trim-weeks": ""
      }), null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/calendar/Calendar.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  __ssrInlineRender: true,
  setup(__props) {
    const today = /* @__PURE__ */ new Date();
    const date = ref({
      start: today,
      end: addDays(Date.now(), 20)
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ("cn" in _ctx ? _ctx.cn : unref(cn))("grid gap-2", (_a = _ctx.$attrs.class) != null ? _a : "")
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$g), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$f), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$m), {
                    id: "date",
                    class: ("cn" in _ctx ? _ctx.cn : unref(cn))("w-[300px] justify-start text-left font-normal", !date.value && "text-muted-foreground"),
                    variant: "outline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Calendar), { class: "mr-2 h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>${ssrInterpolate(date.value.start ? date.value.end ? `${unref(format)(date.value.start, "LLL dd, y")} - ${unref(format)(date.value.end, "LLL dd, y")}` : unref(format)(date.value.start, "LLL dd, y") : "Pick a date")}</span>`);
                      } else {
                        return [
                          createVNode(unref(Calendar), { class: "mr-2 h-4 w-4" }),
                          createVNode("span", null, toDisplayString(date.value.start ? date.value.end ? `${unref(format)(date.value.start, "LLL dd, y")} - ${unref(format)(date.value.end, "LLL dd, y")}` : unref(format)(date.value.start, "LLL dd, y") : "Pick a date"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$m), {
                      id: "date",
                      class: ("cn" in _ctx ? _ctx.cn : unref(cn))("w-[300px] justify-start text-left font-normal", !date.value && "text-muted-foreground"),
                      variant: "outline"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Calendar), { class: "mr-2 h-4 w-4" }),
                        createVNode("span", null, toDisplayString(date.value.start ? date.value.end ? `${unref(format)(date.value.start, "LLL dd, y")} - ${unref(format)(date.value.end, "LLL dd, y")}` : unref(format)(date.value.start, "LLL dd, y") : "Pick a date"), 1)
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), {
              align: "start",
              "avoid-collisions": true,
              class: "w-auto p-0"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    modelValue: date.value,
                    "onUpdate:modelValue": ($event) => date.value = $event,
                    modelModifiers: { range: true },
                    columns: 2
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), {
                      modelValue: date.value,
                      "onUpdate:modelValue": ($event) => date.value = $event,
                      modelModifiers: { range: true },
                      columns: 2
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$f), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$m), {
                    id: "date",
                    class: ("cn" in _ctx ? _ctx.cn : unref(cn))("w-[300px] justify-start text-left font-normal", !date.value && "text-muted-foreground"),
                    variant: "outline"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Calendar), { class: "mr-2 h-4 w-4" }),
                      createVNode("span", null, toDisplayString(date.value.start ? date.value.end ? `${unref(format)(date.value.start, "LLL dd, y")} - ${unref(format)(date.value.end, "LLL dd, y")}` : unref(format)(date.value.start, "LLL dd, y") : "Pick a date"), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$e), {
                align: "start",
                "avoid-collisions": true,
                class: "w-auto p-0"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), {
                    modelValue: date.value,
                    "onUpdate:modelValue": ($event) => date.value = $event,
                    modelModifiers: { range: true },
                    columns: 2
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/datePicker/DatePicker.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Label",
  __ssrInlineRender: true,
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Label), mergeProps(props, {
        class: unref(cn)(
          "block text-sm tracking-tight font-medium text-foreground text-left",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/label/Label.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        value: unref(modelValue),
        class: unref(cn)(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          (_a = _ctx.$attrs.class) != null ? _a : ""
        ),
        type: "text"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input/Input.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AnimalsPicker",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$g), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$f), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$m), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Zwierzaki `);
                      } else {
                        return [
                          createTextVNode(" Zwierzaki ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$m), { variant: "outline" }, {
                      default: withCtx(() => [
                        createTextVNode(" Zwierzaki ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), { class: "w-80" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4"${_scopeId2}><div class="space-y-2"${_scopeId2}><h4 class="font-medium leading-none"${_scopeId2}>Dimensions</h4><p class="text-sm text-muted-foreground"${_scopeId2}>Set the dimensions for the layer.</p></div><div class="grid gap-2"${_scopeId2}><div class="grid grid-cols-3 items-center gap-4"${_scopeId2}><div class="flex"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Bone), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { for: "width" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Psy `);
                      } else {
                        return [
                          createTextVNode("Psy ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    id: "width",
                    class: "col-span-2 h-8",
                    "default-value": "0",
                    type: "number"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-3 items-center gap-4"${_scopeId2}><div class="flex"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Cat), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$a), { for: "maxWidth" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Koty `);
                      } else {
                        return [
                          createTextVNode(" Koty ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$9), {
                    id: "maxWidth",
                    class: "col-span-2 h-8",
                    "default-value": "0",
                    type: "number"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h4", { class: "font-medium leading-none" }, "Dimensions"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Set the dimensions for the layer.")
                      ]),
                      createVNode("div", { class: "grid gap-2" }, [
                        createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode(unref(Bone), { class: "mr-2 h-4 w-4" }),
                            createVNode(unref(_sfc_main$a), { for: "width" }, {
                              default: withCtx(() => [
                                createTextVNode("Psy ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$9), {
                            id: "width",
                            class: "col-span-2 h-8",
                            "default-value": "0",
                            type: "number"
                          })
                        ]),
                        createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode(unref(Cat), { class: "mr-2 h-4 w-4" }),
                            createVNode(unref(_sfc_main$a), { for: "maxWidth" }, {
                              default: withCtx(() => [
                                createTextVNode(" Koty ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(unref(_sfc_main$9), {
                            id: "maxWidth",
                            class: "col-span-2 h-8",
                            "default-value": "0",
                            type: "number"
                          })
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$f), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$m), { variant: "outline" }, {
                    default: withCtx(() => [
                      createTextVNode(" Zwierzaki ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$e), { class: "w-80" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h4", { class: "font-medium leading-none" }, "Dimensions"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Set the dimensions for the layer.")
                    ]),
                    createVNode("div", { class: "grid gap-2" }, [
                      createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                        createVNode("div", { class: "flex" }, [
                          createVNode(unref(Bone), { class: "mr-2 h-4 w-4" }),
                          createVNode(unref(_sfc_main$a), { for: "width" }, {
                            default: withCtx(() => [
                              createTextVNode("Psy ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$9), {
                          id: "width",
                          class: "col-span-2 h-8",
                          "default-value": "0",
                          type: "number"
                        })
                      ]),
                      createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                        createVNode("div", { class: "flex" }, [
                          createVNode(unref(Cat), { class: "mr-2 h-4 w-4" }),
                          createVNode(unref(_sfc_main$a), { for: "maxWidth" }, {
                            default: withCtx(() => [
                              createTextVNode(" Koty ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(unref(_sfc_main$9), {
                          id: "maxWidth",
                          class: "col-span-2 h-8",
                          "default-value": "0",
                          type: "number"
                        })
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/animalsPicker/AnimalsPicker.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("rounded-lg border bg-card text-card-foreground shadow-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/Card.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CardHeader",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col space-y-1.5 p-6", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardHeader.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "CardTitle",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h3${ssrRenderAttrs(mergeProps({
        class: unref(cn)("text-2xl font-semibold leading-none tracking-tighter", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</h3>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardTitle.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CardDescription",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        class: unref(cn)("text-sm text-muted-foreground", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardDescription.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CardContent",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("p-6 pt-0", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CardFooter",
  __ssrInlineRender: true,
  props: {
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("p-6 pt-0", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HotelCard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({ to: "/hotels/123" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$7), { class: "overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtImg, {
                    class: "h-60 w-full",
                    src: "/images/mock_hotel.webp"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Card Title`);
                            } else {
                              return [
                                createTextVNode("Card Title")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Card Description`);
                            } else {
                              return [
                                createTextVNode("Card Description")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode("Card Title")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$4), null, {
                            default: withCtx(() => [
                              createTextVNode("Card Description")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Card Content `);
                      } else {
                        return [
                          createTextVNode(" Card Content ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Card Footer `);
                      } else {
                        return [
                          createTextVNode(" Card Footer ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtImg, {
                      class: "h-60 w-full",
                      src: "/images/mock_hotel.webp"
                    }),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode("Card Title")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$4), null, {
                          default: withCtx(() => [
                            createTextVNode("Card Description")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode(" Card Content ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createTextVNode(" Card Footer ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$7), { class: "overflow-hidden" }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtImg, {
                    class: "h-60 w-full",
                    src: "/images/mock_hotel.webp"
                  }),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode("Card Title")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), null, {
                        default: withCtx(() => [
                          createTextVNode("Card Description")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode(" Card Content ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createTextVNode(" Card Footer ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/hotelCard/HotelCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Combobox = _sfc_main$d;
  const _component_DatePicker = _sfc_main$b;
  const _component_AnimalsPicker = _sfc_main$8;
  const _component_HotelCard = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto bg-transparent pt-20" }, _attrs))}><div class="flex justify-center gap-2 pt-10">`);
  _push(ssrRenderComponent(_component_Combobox, null, null, _parent));
  _push(` `);
  _push(ssrRenderComponent(_component_DatePicker, null, null, _parent));
  _push(` `);
  _push(ssrRenderComponent(_component_AnimalsPicker, null, null, _parent));
  _push(`</div><div class="grid grid-cols-4 gap-4 pt-10">`);
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(ssrRenderComponent(_component_HotelCard, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/hotels/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-0f560be2.mjs.map
