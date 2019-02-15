import React from 'react';
import style from "./style.scss";

import Button from 'Components/Form/Button';
import Input from 'Components/Form/Input';

class LibraryDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textVal: "",
		};
	}

	onChange(e) {
		this.setState({ textVal: e.target.value });
	}

	render() {
		const { textVal } = this.state;
		const { setSidebarVisible } = this.props;
		return (
			<div className={style.headerContainer}>
				<div>
					<Input
						placeholder="Search a video…"
						onChange={e => this.onChange(e)}
						value={textVal}
						customClass={style.librarySearchInput}
					/>
				</div>
				<div>
					<h1 className="alpha color-white text-center font-primary text-bold">
						Library
					</h1>
				</div>
				<div>
					<Button
						onClick={() => setSidebarVisible(true)}
						customClass="float-right font-secondary-first text-bold"
						buttonText="Filter Videos"
						iconRight="qf-iconAdd"
					/>
				</div>
			</div>
		)
	}
};

export default LibraryDetail;
