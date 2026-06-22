import { r as __exportAll$1 } from "../_runtime.mjs";
import { n as createBrowserClient } from "../_libs/@supabase/ssr+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-8iJlf6D4.js
var supabase_8iJlf6D4_exports = /* @__PURE__ */ __exportAll$1({
	n: () => supabase_exports,
	t: () => createClient
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var supabase_exports = /* @__PURE__ */ __exportAll({ createClient: () => createClient });
var client = null;
function createClient() {
	if (client) return client;
	client = createBrowserClient("https://yzwwpxtrewirbepbpbgu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6d3dweHRyZXdpcmJlcGJwYmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODU5MzEsImV4cCI6MjA5NzI2MTkzMX0.neNitFqVHN1X6C7BMxkvvtT-jtucXbahPwtdpITs5_Y");
	return client;
}
//#endregion
export { supabase_8iJlf6D4_exports as n, createClient as t };
