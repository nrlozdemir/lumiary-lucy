// import React, { Component } from 'react'
// import style from './style.scss'
// import ProgressBar from 'Components/ProgressBar'
// import PropTypes from 'prop-types'

// import cx from 'classnames'

// // If an image 404s, this will return null
// class ConfidenceImage extends Component {
//   constructor() {
//     super()
//     this.state = {
//       urlError: false,
//     }
//   }

//   onError = () => {
//     this.setState({ urlError: true })
//   }

//   render() {
//     const { urlError } = this.state
//     const { confidence, imgUrl, minAge, colors, label } = this.props

//     return urlError ? null : (
//       <div
//         className={cx(style.tabPanelItem, style.listObjects, 'grid-container')}
//         style={{
//           background: colors.shotByShotBackground,
//           borderColor: colors.shotByShotBorder,
//           marginRight: '16px !important',
//         }}
//       >
//         <div className={style.listImage}>
//           <img
//             src={imgUrl}
//             className={cx(style.imageItem, 'grid-container')}
//             onError={this.onError}
//           />
//         </div>
//         <div className={style.listProgress}>
//           <div className={cx(style.progressWrapper, 'pt-20')}>
//             <div className={style.progressbarContainer}>
//               <div className={style.barOptions}>
//                 <p>{label}</p>
//                 <p>{confidence}% Accurate</p>
//               </div>
//               <ProgressBar
//                 width={confidence}
//                 customBarClass={style.progressBar}
//                 customPercentageClass={style.percentage}
//                 progressBarBackgroundColor={colors.progressCountBackground}
//                 percentageBgColor={colors.progressColor}
//               />
//             </div>
//           </div>

//           {minAge && (
//             <div className="pt-20">
//               <div className={style.progressbarContainer}>
//                 <div className={style.barOptions}>
//                   <p>{minAge} Y/O</p>
//                   <p>{minAge.toFixed(0)}% Accurate</p>
//                 </div>
//                 <ProgressBar
//                   width={confidence}
//                   customBarClass={style.progressBar}
//                   customPercentageClass={style.percentage}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   }
// }

// ProgressBar.propTypes = {
//   imgUrl: PropTypes.string,
//   isPeople: PropTypes.bool,
//   label: PropTypes.string,
//   confidence: PropTypes.string,
//   minAge: PropTypes.string,
// }

// ProgressBar.defaultProps = {
//   imgUrl: '',
//   minAge: null,
// }

// export default ConfidenceImage
