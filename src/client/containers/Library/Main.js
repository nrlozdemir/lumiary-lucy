"use strict";

import React from "react";

// Styles
import style from "./styles.scss";
import Card from "../../components/Card";

class Library extends React.Component {
	render() {
		console.log(this.props);
		return (
			<React.Fragment>
				<div className={style.main}>
					<div className="col-6 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-charcoal-grey border-bt-dark"
							customBodyClass="bg-charcoal-grey"
						>
							<div className="col-12 p-25">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
								veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
								velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
								cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
								est laborum.
							</div>
							<div className="col-12 p-25">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
								veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
								commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
								velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
								cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
								est laborum.
							</div>
						</Card>
					</div>
					<div className="col-6 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-charcoal-grey border-bt-dark"
							customBodyClass="bg-charcoal-grey"
						>
							<div className="col-6 p-25">
								<Card
									title="Lumiere Data"
									customHeaderClass="bg-charcoal-grey border-bt-tealish"
									customBodyClass="bg-charcoal-grey"
								>
									<div className="col-12 pt-25">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
										eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
										minim veniam, quis nostrud exercitation ullamco laboris nisi ut
										aliquip ex ea commodo consequat.
									</div>
								</Card>
							</div>
							<div className="col-6 p-25">
								<Card
									title="Lumiere Data"
									customHeaderClass="bg-charcoal-grey border-bt-tealish"
									customBodyClass="bg-charcoal-grey"
								>
									<div className="col-12 pt-25">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
										eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
										minim veniam, quis nostrud exercitation ullamco laboris nisi ut
										aliquip ex ea commodo consequat.
									</div>
								</Card>
							</div>
						</Card>
					</div>
					<div className="col-12 mt-10">
						<Card
							title="Lumiere Data"
							customHeaderClass="bg-tealish border-bt-dark"
							customBodyClass="bg-dark-three box-shadow-black-1 color-white"
						>
							<div className="col-12 p-25">
								<div className="col-1-5">
									<Card
										title="Lumiere Data"
										customHeaderClass="bg-tealish border-bt-dark"
										customBodyClass="bg-charcoal-grey"
									>
										<div className="col-12 p-10">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
											ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
										</div>
									</Card>
								</div>
								<div className="col-1-5">
									<Card
										title="Lumiere Data"
										customHeaderClass="bg-tealish border-bt-dark"
										customBodyClass="bg-charcoal-grey"
									>
										<div className="col-12 p-10">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
											ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
										</div>
									</Card>
								</div>
								<div className="col-1-5">
									<Card
										title="Lumiere Data"
										customHeaderClass="bg-tealish border-bt-dark"
										customBodyClass="bg-charcoal-grey"
									>
										<div className="col-12 p-10">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
											ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
										</div>
									</Card>
								</div>
								<div className="col-1-5">
									<Card
										title="Lumiere Data"
										customHeaderClass="bg-tealish border-bt-dark"
										customBodyClass="bg-charcoal-grey"
									>
										<div className="col-12 p-10">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
											ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
										</div>
									</Card>
								</div>
								<div className="col-1-5">
									<Card
										title="Lumiere Data"
										customHeaderClass="bg-tealish border-bt-dark"
										customBodyClass="bg-charcoal-grey"
									>
										<div className="col-12 p-10">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
											eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
											ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
											aliquip ex ea commodo consequat.
										</div>
									</Card>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Library.propTypes = {};

Library.defaultProps = {};

export default Library;
