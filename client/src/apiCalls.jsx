const apiBase = import.meta.env.VITE_APP_API_BASE;
const apiTokenName = import.meta.env.VITE_APP_API_TOKEN_NAME;

export function getToken() {
	return localStorage.getItem(apiTokenName) || false;
}

async function makeApiRequest(endpoint, method, body = {}) {
	const token = getToken();
	if (!token) return { msg: "unauthorized" };

	const headers = {
		Authorization: `Bearer ${token}`,
	};

	let requestOptions = {
		method,
		headers,
	};

	// Add request body for POST, PUT, and PATCH requests
	if (["POST", "PUT", "PATCH"].includes(method)) {
		headers["Content-Type"] = "application/json";
		requestOptions.body = JSON.stringify(body);
	}

	const url = `${apiBase}${endpoint}`;

	const response = await fetch(url, requestOptions);
	const result = await response.json();
	result.ok = response.ok;

	return result;
}

//---------------------------------------------auth------------------------------------------
// singup
// export async function signup(user) {
// 	const res = await fetch(`${apiBase}/auth/signup`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(user),
// 	});

// 	const result = await res.json();
// 	if (res.ok) {
// 		localStorage.setItem(apiTokenName, result.token);
// 		result.ok = true;
// 	} else {
// 		result.ok = false;
// 	}

// 	return result;
// }

// login
export async function login(handle, password) {
	if (!handle || !password) return false;

	const res = await fetch(`${apiBase}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ handle, password }),
	});

	if (res.ok) {
		const result = await res.json();
		localStorage.setItem(apiTokenName, result.token);

		return result;
	}

	return false;
}

// logout
export async function logout() {
	localStorage.removeItem(apiTokenName);
	return 1;
}

// check password
export async function checkPass(password) {
	const token = getToken();
	if (!token) return { msg: "unauthorized" };

	const res = await fetch(`${apiBase}/auth/check_pass`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password }),
	});

	const result = await res.json();
	if (res.ok) {
		result.ok = true;
	} else {
		result.ok = false;
	}
	return result;
}

// get user by token
export async function fetchUser() {
	const token = getToken();
	if (!token) return { msg: "unauthorized" };

	const res = await fetch(`${apiBase}/auth/user`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.ok) {
		const result = await res.json();
		return result;
	}

	return false;
}
