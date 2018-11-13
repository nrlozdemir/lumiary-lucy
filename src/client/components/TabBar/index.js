import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./styles.scss";

const TabBar = ({
	items,
	children,
	onSelect,
	className,
	selectedTabClassName,
	selectedTabPanelClassName,
	tablistClassName
}) => {
	return (
		<div className={cx(styles.tabBar, className)}>
			<Tabs
				onSelect={onSelect}
				selectedTabClassName={selectedTabClassName}
				selectedTabPanelClassName={selectedTabPanelClassName}
			>
				<TabList className={"react-tabs__tab-list " + tablistClassName}>
					{items.map((item, idx) => (
						<Tab key={idx}>{item}</Tab>
					))}
				</TabList>

				{children.map((item, idx) => (
					<TabPanel key={idx}>{item}</TabPanel>
				))}
			</Tabs>
		</div>
	);
};

TabBar.defaultProps = {
	onSelect: () => {},
	className: ""
};

TabBar.propTypes = {
	items: PropTypes.array,
	selectedTabClassName: PropTypes.string,
	selectedTabPanelClassName: PropTypes.string,
	tablistClassName: PropTypes.string,
	onSelect: PropTypes.func,
	children: PropTypes.object,
	className: PropTypes.object
};

export default TabBar;
