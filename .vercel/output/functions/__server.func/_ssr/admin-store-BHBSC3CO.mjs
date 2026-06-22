import { o as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-store-BHBSC3CO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var state = {
	isLoading: true,
	isAuthenticated: false,
	user: null,
	sidebarOpen: true
};
var listeners = /* @__PURE__ */ new Set();
function emit() {
	listeners.forEach((l) => l());
}
function subscribe(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
function getSnapshot() {
	return state;
}
function getServerSnapshot() {
	return state;
}
async function getClient() {
	const { createClient } = await import("./supabase-8iJlf6D4.mjs").then((n) => n.n).then((n) => n.n);
	return createClient();
}
var adminStore = {
	async init() {
		if (typeof window === "undefined") return;
		try {
			const supabase = await getClient();
			const { data: { session } } = await supabase.auth.getSession();
			if (session?.user) {
				const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
				state = {
					...state,
					isLoading: false,
					isAuthenticated: true,
					user: profile
				};
			} else state = {
				...state,
				isLoading: false
			};
			emit();
		} catch {
			state = {
				...state,
				isLoading: false
			};
			emit();
		}
	},
	async login(email, password) {
		const supabase = await getClient();
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
		if (data.user) {
			const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
			state = {
				...state,
				isAuthenticated: true,
				user: profile
			};
			emit();
		}
	},
	async logout() {
		await (await getClient()).auth.signOut();
		state = {
			...state,
			isAuthenticated: false,
			user: null
		};
		emit();
		if (typeof window !== "undefined") window.location.href = "/admin/login";
	},
	toggleSidebar() {
		state = {
			...state,
			sidebarOpen: !state.sidebarOpen
		};
		emit();
	}
};
function useAdmin() {
	return (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
}
//#endregion
export { useAdmin as n, adminStore as t };
