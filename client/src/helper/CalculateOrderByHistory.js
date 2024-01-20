const CalculateOrderByHistory = (historyArr) => {
	const order = {
		gold: "",
		weight: 0,
		price: 0,
		date: "",
		htet_yu: [],
	};

	historyArr.map(i => {
		if(i.status === "pawn") {
			order.gold=i.gold;
			order.weight=i.weight;
			order.price=i.price;
			order.date=i.date;
		} else if (i.status === "htet_yu") {
			const data = {
				gold: i.gold || "",
				weight: i.weight || 0,
				price: i.price,
				date: i.date,
			}
			order.htet_yu.push(data);
		} else if (i.status === "pay_interest") {
			if (order.htet_yu.length) {
				order.htet_yu.map(j => {
					j.gold ? order.gold+=` ${j.gold}`: "";
					j.weight ? order.wieght+=j.wieght: "";
					order.price+=j.price;
				})
				order.htet_yu = [];
			}
			order.date=i.change_date;
		} else if (i.status === "half_redeem") {
			order.price=i.left_price;
			if (i.left_gold) {
				order.gold=i.left_gold;
				order.weight=i.weight;
			} else {
				order.htet_yu.map(j => {
					order.gold+=` ${j.gold}`;
					order.weight+=j.weight
				})
			}
			order.htet_yu=[];
		} else if (i.status === "redeem") {
			//
		} else {
			return;
		}
	})

	return order;

}

export default CalculateOrderByHistory;