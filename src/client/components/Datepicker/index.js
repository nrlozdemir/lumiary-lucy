import React from "react";
//import PropTypes from "prop-types";
import moment from "moment";
import { DateRange, Calendar } from "react-date-range";
import classnames from "classnames";
import style from "./style.scss";

class Datepicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateRange: {
				selection: {
					startDate: new Date(),
					endDate: new Date(),
					key: "selection"
				}
			},
			datePickerInternational: null,
			isOpen: false
		};
	}

	componentDidMount() {
		const { value, type } = this.props;
		if (value) {
			this.setState({
				...(type === "range"
					? {
							dateRange: {
								selection: {
									startDate: value[0],
									endDate: value[1],
									key: "selection"
								}
							}
					  }
					: {
							datePickerInternational: value
					  })
			});
		}
	}

	formatDateDisplay(date) {
		if (!date) return "";
		return moment(date).format("MM/DD/YYYY");
	}

	render() {
		const {
			dateRange: { selection: dateRange },
			datePickerInternational,
			isOpen
		} = this.state;

		const { type, back, apply } = this.props;

		const input = this.props.input || {};

		const cx = classnames(
			style.input,
			{
				[style.error]: input.error,
				[style.typing]: !!input.value
			},
			input.customClass
		);

		return type === "range" ? (
			<div className="absoluteInlineDatepicker">
				<DateRange
					onChange={value => this.setState({ dateRange: value })}
					moveRangeOnFirstSelection={false}
					ranges={[dateRange]}
				/>
				<div className="inline-buttons">
					<div onClick={() => back()}>Back</div>
					<div onClick={() => apply(dateRange)}>Apply</div>
				</div>
			</div>
		) : (
			<div className={style.DatePicker}>
				{input.label ? (
					<label className={style.label} htmlFor={input.label}>
						{input.label}
					</label>
				) : null}
				<input
					id={input.label}
					className={cx}
					placeholder={input.placeholder}
					value={this.formatDateDisplay(datePickerInternational)}
					onClick={() => this.setState({ isOpen: true })}
					readOnly
				/>
				{isOpen && (
					<div className="absoluteInlineDatepicker align-left">
						<Calendar
							date={datePickerInternational}
							onChange={value =>
								this.setState({ datePickerInternational: value })
							}
						/>
						<div className="inline-buttons">
							<div onClick={() => this.setState({ isOpen: false })}>Close</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Datepicker;
