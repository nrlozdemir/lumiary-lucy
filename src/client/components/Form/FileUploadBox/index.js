import React from 'react'
import PropTypes from 'prop-types'
import style from './styles.scss'

class FileUploadBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
  }
  handleChange = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  render() {
    const { name, title, className, placeholder } = this.props

    const { file } = this.state
    const fileName = file && file.name

    return (
      <div className={style.fileUploadBox}>
        <label>{title}</label>
        <input
          name={name || "file-box"}
          type="file"
          ref={(input) => (this.fileInput = input)}
          onChange={this.handleChange}
        />   
        <input 
          type="text"
          className={style.uploadBox}
          placeholder={placeholder} 
          value={fileName} />
      </div>
    )
  }
}

export default FileUploadBox
