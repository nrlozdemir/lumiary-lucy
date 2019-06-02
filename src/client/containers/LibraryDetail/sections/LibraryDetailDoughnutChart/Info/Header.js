import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import XCircle from 'Components/Icons/XCircle'
import SelectFilters from 'Components/SelectFilters'
import { actions } from 'Reducers/libraryDetail';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectDate: null,
      selectLikes: null,
    }
  }

  handleSelectFilters = (name, value) => {
		const { onFilterChange = () => {} } = this.props;

    this.setState({
      [name]: value,
		});

		onFilterChange({...this.state, [name]: value});
	}

  render() {
		const { selectDate, selectLikes } = this.state
		const { toggleInfoSection } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div
            className={style.doughnutPanelHeader}
            style={{
              background: colors.duskBackground,
              boxShadow: `0 2px 6px 0 ${colors.moduleShadow}`,
            }}
          >
            <div onClick={() => toggleInfoSection(false)}>
              <div className={style.iconWrapper}>
                <XCircle />
                <p className={style.iconTitle}>Frame Rate - 24 Fps</p>
              </div>
            </div>
            <div className={style.headerInfo}>
              <div />
              <div className={style.formWrapper}>
                <SelectFilters
                  handleSelectFilters={this.handleSelectFilters}
                  selectClasses="custom-select"
                  selectDate={selectDate}
                  selectDateShow={true}
                  selectLikes={selectLikes}
                  selectLikesShow={true}
                />
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

function mapDispatchToProps(dispatch) {
  return {
		toggleInfoSection: show => dispatch(actions.toggleInfoSection(show))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Header);
