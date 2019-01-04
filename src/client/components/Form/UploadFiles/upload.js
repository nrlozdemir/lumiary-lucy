import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import style from "./styles.scss";
import FormFooter from "Components/Form/Footer";
import FormButton from "Components/Form/Controls/Button";
import { staticUrl, mediaUrl } from "Utils/globals";

class UploadFiles extends React.Component {
	render() {
		const {
			headerText,
			files,
			buttonLabel,
			uploading,
			handleClick,
			disabled,
			buttonClassName,
			type
		} = this.props;

		const buttonType = type === "buyer" ? "yellow" : "blue";

		return (
			<div className={style.dialog}>
				<div className={style.dialogInner}>
					<header>
						<h3>{headerText}</h3>
						<div className={style.uploadStatus}>
							{uploading ? (
								<img src={`${staticUrl}img/loading_gifs/ajax-loader.gif`} />
							) : (
								<div className={style.uploadedIcon} />
							)}
						</div>
					</header>

					<ul className={style.filesList}>
						{files &&
							files.length &&
							Object.keys(files).map((key, idx) => {
								let completed = files[key].textstate == "Upload completed";
								let classes = cx([style.progressContainer], {
									[style.complete]: completed
								});

								return (
									<li key={idx}>
										<div className={style.label}>{files[key].name}</div>
										<div className={classes}>
											<div
												className={style.progressBar}
												style={{ width: `${files[key].amt}%` }}
											/>
										</div>
										<div
											className={cx(style.percent, {
												[style.completedText]: completed
											})}
										>
											{!completed ? `${files[key].amt}%` : "Uploaded"}
										</div>
									</li>
								);
							})}
					</ul>
				</div>

				<FormFooter>
					<FormButton
						disabled={disabled}
						className={buttonClassName || buttonType}
						type="button"
						label={buttonLabel}
						onClick={handleClick}
					/>
				</FormFooter>
			</div>
		);
	}
}

UploadFiles.propTypes = {};

UploadFiles.defaultProps = {
	buttonLabel: "Done",
	disabled: true,
	type: "buyer"
};

export default UploadFiles;
