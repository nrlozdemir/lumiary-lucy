import React, { Component } from 'react';

import style from './style.scss';

class Dropdown extends Component{
	constructor(props){
		super(props);
		this.state = {
			isDropDownVisible: false
		}
	}

	handleMouseEnter(){
		this.setState(prevState => {
			return {
				isDropDownVisible: !prevState.isDropDownVisible
			}
		})
	};

	handleMouseLeave(){
		this.setState(prevState => {
			return {
				isDropDownVisible: !prevState.isDropDownVisible
			}
		})
	}

	render(){
		const { title, listItems } = this.props;
		const { isDropDownVisible } = this.state;
		return (
			<div className={style.ddWrapper} onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}>
				<div className={style.ddHeader}>
					<p className={style.ddHeaderTitle}>{title}</p>
				</div>
				<ul className={style.ddList}>
					{
						listItems && isDropDownVisible && listItems.map((item, index) => (
							<li key={`ddwn-${index}`} className={style.ddListItem}>{item.name}</li>
						))
					}
				</ul>
			</div>
		)
	}
}

export default Dropdown;
