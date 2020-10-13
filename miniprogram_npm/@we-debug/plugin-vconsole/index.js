module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1602588161541, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const vConsolePlugin = {};
/**
 * vConsole 插件
 *
 * @param {*} weDebug
 * @param {*} [options={}]
 */

vConsolePlugin.install = function (weDebug, options = {}) {
  if (vConsolePlugin.installed) return;
  vConsolePlugin.installed = true;
  const ruleOption = options.rule || {};
  const store = {
    vConsoleRuleState: weDebug.createCache('__vConsoleRuleState__')
  };
  const vConsoleRule = weDebug.createFormRule(Object.assign({}, {
    title: '开启 vConsole 调试工具',
    desc: 'vConsole 是微信官方推出的调试工具',
    type: 'switch',
    state: {
      disabled: false,
      checked: () => store.vConsoleRuleState.get()
    },
    handler: {
      bindChange(state) {
        if (!state.disabled) {
          store.vConsoleRuleState.set(state.checked);
          wx.setEnableDebug({
            enableDebug: state.checked
          });
        }
      }

    }
  }, ruleOption));
  weDebug.addFormRule([vConsoleRule]);
};

var _default = vConsolePlugin;
exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1602588161541);
})()
//# sourceMappingURL=index.js.map