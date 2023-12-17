const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({
	path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});
const { createDbConnection } = require("./config/db")
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AcceptorRoutes = require('./routes/AcceptorRoutes');
const VillageRoutes = require('./routes/VillageRoutes');
const PawnRoutes = require('./routes/PawnRoutes');
const PayInterestRoutes = require('./routes/PayInterestRoutes');
const HtetYuRoutes = require('./routes/HtetYuRoutes');
const HalfRedeemRoutes = require('./routes/HalfRedeemRoutes');
const RedeemRoutes = require('./routes/RedeemRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
const AlbumRoutes = require('./routes/AlbumRoutes');
const OrderAlbumRoutes = require('./routes/OrderAlbumRoutes');
const Authenticate = require("./middleware/Autenticate");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// login signup routes
app.use("/auth", AuthRoutes)

// autehticate middleware
app.use(Authenticate);

// routes
app.use("/user", UserRoutes)
app.use("/acceptor", AcceptorRoutes)
app.use("/village", VillageRoutes)
app.use("/pawn", PawnRoutes)
app.use("/pay_interest", PayInterestRoutes)
app.use("/htet_yu", HtetYuRoutes)
app.use("/half_redeem", HalfRedeemRoutes)
app.use("/redeem", RedeemRoutes)
app.use("/order", OrderRoutes)
app.use("/album", AlbumRoutes)
app.use("/order_album", OrderAlbumRoutes)

app.listen(process.env.PORT, () => {
	console.log(`server is running in port ${process.env.PORT}`)
})