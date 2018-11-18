import React, { Component } from 'react'


// Styles
import style from './styles.scss'



class Panoptic extends Component {
  render() {
    return (
			<div>
					<div className={style.chartPanel + " col-6"}>

						<div className={style.controlGroup}>
							<label className={style.control + " controlCheckbox"}>2D Animation
								<input type="checkbox" checked="checked"/>
								<div className={style.controlIndicator + " first"}></div>
							</label>

							<label className={style.control + " controlCheckbox"}>Stop Motion
								<input type="checkbox" checked="checked"/>
								<div className={style.controlIndicator+ " second"}></div>
							</label>

							<label className={style.control + " controlCheckbox"}>Motion Graphics
								<input type="checkbox" checked="checked"/>
								<div className={style.controlIndicator}></div>
							</label>

							<label className={style.control + " controlCheckbox"}>Live Action
								<input type="checkbox" checked="checked"/>
								<div className={style.controlIndicator}></div>
							</label>
						</div>

					</div>

					<figure>
							<img src={require('../../assets/group.png')} />
					</figure>

					<div className={style.resultsPanel + " col-3"}>
					tatatata

					</div>
					<div className={style.rightPanel + " col-3"}>
					tatatatatata
					</div>
      </div>
		)






  }
}

export default Panoptic
