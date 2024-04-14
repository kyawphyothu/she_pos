import Add from "../pages/Pawns/Add";
import EditPawn from "../pages/Pawns/Edit";
import Album from "../pages/Album";
import AlbumDetail from "../pages/Album/Detail";
import AlbumCreate from "../pages/Album/Create";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import HtetYu from "../pages/HtetYu";
import PayInterest from "../pages/PayInterest";
import Redeem from "../pages/Redeem";
import Search from "../pages/search/Search";
import TableBorrow from "../pages/TableBorrow";
import Village from "../pages/Village";
import InOutReport from "../pages/InOutReport";

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
		path: "/editpawn/:id",
		element: <EditPawn />,
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
	{
		path: "/table_borrow",
		element: <TableBorrow />,
	},
	{
		path: "/albums",
		element: <Album />,
	},
	{
		path: "/album/:id",
		element: <AlbumDetail />,
	},
	{
		path: "/album/create",
		element: <AlbumCreate />,
	},
	{
		path: "/villages",
		element: <Village />,
	},
	{
		path: "/in_out_report",
		element: <InOutReport />,
	},
];

export default UserRoutes;
