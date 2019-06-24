import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import style from '../style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import XCircle from 'Components/Icons/XCircle'
import SelectFilters from 'Components/ModuleSelectFilters'
import { actions, makeSelectInfoShowSection, makeSelectDoughnutFilters } from 'Reducers/libraryDetail';

class Header extends React.Component {
  handleDateChange = value => {
		this.props.changeFilters({name: 'date', value: value ? value.value : value});
	}

	handleMetricChange = value => {
		this.props.changeFilters({name: 'metric', value: value ? value.value : value});
	}

	componentDidMount() {
		const { filters: { date, metric } } = this.props;

		if (!date) {
			this.props.changeFilters({name: 'date', value: 'week'});
		}

		if (!metric) {
			this.props.changeFilters({name: 'metric', value: 'likes'});
		}
	}

  render() {
		const { toggleInfoSection, sectionData } = this.props;

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
            <div onClick={() => toggleInfoSection(null)}>
              <div className={style.iconWrapper}>
                <XCircle />
                <p className={style.iconTitle}>{sectionData.title} - {sectionData.label}</p>
              </div>
            </div>
            <div className={style.headerInfo}>
              <div />
              <div className={style.formWrapper}>
                <SelectFilters
									moduleKey="LDDH"
                  onChange={this.handleDateChange}
									type="dateRange"
									selectKey="date"
									defaultValue="week"
                />
                <SelectFilters
									moduleKey="LDDH"
                  onChange={this.handleMetricChange}
									type="metric"
									selectKey="metric"
									defaultValue="likes"
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
	sectionData: makeSelectInfoShowSection(),
	filters: makeSelectDoughnutFilters()
})

function mapDispatchToProps(dispatch) {
  return {
		toggleInfoSection: show => dispatch(actions.toggleInfoSection(show)),
		changeFilters: filters => dispatch(actions.changeDoughnutFilters(filters))
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Header);
