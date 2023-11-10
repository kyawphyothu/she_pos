import Add from "../pages/Add";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import HtetYu from "../pages/HtetYu";
import PayInterest from "../pages/PayInterest";
import Redeem from "../pages/Redeem";
import Search from "../pages/Search";

const UserRoutes = [
	// {
	// 	path: "/",
	// 	element: <Home />,
	// },
	{
		path: "/add",
		element: <Add />,
	},
	{
		path: "/search",
		element: <Search />,
	},
	{
		path: "/detail/:id",
		element: <Detail />,
	},
	{
		path: "/htetyu/:id",
		element: <HtetYu />,
	},
	{
		path: "/payinterest/:id",
		element: <PayInterest />,
	},
	{
		path: "/reextract/:id",
		element: <Redeem />,
	},
];

export default UserRoutes;
