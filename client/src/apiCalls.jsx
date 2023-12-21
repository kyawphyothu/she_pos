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
export async function signup(user) {
	const res = await fetch(`${apiBase}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	const result = await res.json();
	if (res.ok) {
		localStorage.setItem(apiTokenName, result.token);
		result.ok = true;
	} else {
		result.ok = false;
	}

	return result;
}

// login
export async function login(data) {
	const res = await fetch(`${apiBase}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (res.ok) {
		const result = await res.json();
		result.ok = true;
		localStorage.setItem(apiTokenName, result.token);

		return result;
	} else {
		const result = await res.json();
		result.ok = false;

		return result;
	}
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
	if (!token) return { err: "unauthorized", ok: false };

	const res = await fetch(`${apiBase}/user/getLoginUser`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.ok) {
		const result = await res.json();
		result.ok = true;
		return result;
	}

	return false;
}

//------------------------------------------acceptors------------------------------
export async function getAllAcceptors() {
	return makeApiRequest("/acceptor", "GET");
}


//------------------------------------------villages------------------------------
export async function getAllvillages() {
	return makeApiRequest("/village", "GET");
}
export async function createVillage(data) {
	return makeApiRequest("/village", "POST", {data});
}
export async function updateVillage(id, data) {
	return makeApiRequest(`/village/${id}`, "PUT", {data});
}

//------------------------------------------pawn------------------------------
export async function createPawn(data) {
	return makeApiRequest("/pawn", "POST", {data});
}


//------------------------------------------orders------------------------------
export async function searchOrder(queries) {
	return makeApiRequest(`/order${queries}`, "GET");
}
export async function getTodayOrder() {
	return makeApiRequest(`/order/this_day`, "GET");
}
export async function getOrderById(id) {
	return makeApiRequest(`/order/${id}`, "GET");
}
export async function getHistoryByOrderId(id) {		// history
	return makeApiRequest(`/order/history/${id}`, "GET");
}
export async function deleteOrder(id) {		// history
	return makeApiRequest(`/order/${id}`, "DELETE");
}


//------------------------------------------htet_yu------------------------------
export async function createHtetYu(data) {
	return makeApiRequest(`/htet_yu`, "POST", {data});
}


//------------------------------------------pay_interest------------------------------
export async function createPayInterest(data) {
	return makeApiRequest(`/pay_interest`, "POST", {data});
}

//------------------------------------------half_redeem------------------------------
export async function createHalfRedeem(data) {
	return makeApiRequest(`/half_redeem`, "POST", {data});
}
//------------------------------------------redeem------------------------------
export async function createRedeem(data) {
	return makeApiRequest(`/redeem`, "POST", {data});
}


//------------------------------------------album------------------------------
export async function getAllAlbums() {
	return makeApiRequest(`/album`, "GET");
}
export async function getOrdersByAlbumId(id) {
	return makeApiRequest(`/album/${id}`, "GET");
}
export async function createAlbum(data) {
	return makeApiRequest(`/album`, "POST", {data});
}
export async function updateAlbum(id, data) {
	return makeApiRequest(`/album/${id}`, "PUT", {data});
}
export async function deleteAlbum(id) {
	return makeApiRequest(`/album/${id}`, "DELETE");
}
//------------------------------------------order_album------------------------------
export async function createOrderAlbum(data) {
	return makeApiRequest(`/order_album`, "POST", {data});
}
export async function deleteOrderAlbum(id) {
	return makeApiRequest(`/order_album/${id}`, "DELETE");
}
