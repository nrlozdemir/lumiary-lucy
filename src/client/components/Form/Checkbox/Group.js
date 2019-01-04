import React, { PureComponent } from "react";
import cx from "classnames";
import { Field } from "redux-form";
import PropTypes from "prop-types";
import { Checkbox } from "Components/Form/Checkbox";
import style from "./styles.scss";

class Group extends PureComponent {
	render() {
		const {
			options,
			groupName,
			legend,
			handleChange,
			handleClick,
			selected,
			optionComponent,
			className,
			labelFlip
		} = this.props;

		if (!options.length) {
			return null;
		}

		const classNames = cx([style.checkboxGroup], className);

		return (
			<fieldset>
				<legend>{legend}</legend>
				<ul className={classNames}>
					{options.map((check, idx) => (
						<Checkbox
							key={`checkbox-${idx}`}
							groupName={groupName}
							value={check.value || idx}
							label={check.label}
							className={check.className}
							handleChange={handleChange}
							selected={selected}
							handleClick={handleClick}
							labelFlip={labelFlip}
						/>
					))}
				</ul>
			</fieldset>
		);
	}
}

Group.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	groupName: PropTypes.string,
	legend: PropTypes.string,
	input: PropTypes.object,
	meta: PropTypes.object,
	options: PropTypes.array
};

Group.defaultProps = {
	handleChange: () => {},
	handleClick: () => {},
	options: [],
	className: ""
};

export default Group;
