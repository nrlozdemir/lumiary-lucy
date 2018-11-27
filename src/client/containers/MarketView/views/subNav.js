import React from "react";
import style from "./styles.scss";
import { Link } from "react-router";

export default function subNav() {
	const items = ["platform", "competitor", "audience", "use-case", "time"];

	return (
		<div className={style.subNav}>
			{items.map(item => {
				const label = item.replace("-", " ");
				return (
					<Link key={item} to={`/marketview/${item}/`}>
						{" "}
						By {label}{" "}
					</Link>
				);
			})}
		</div>
	);
}
