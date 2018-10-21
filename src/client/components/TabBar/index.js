import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'react-router'
import styles from './styles.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const TabBar = ({ items, children, onSelect, className }) => {

  return (
    <div className={cx(styles.tabBar, className)}>
      <Tabs
        onSelect={onSelect}
      >
        <TabList>
          { items.map((item, idx) =>
            <Tab key={ idx }>{ item }</Tab>
         )}
        </TabList>

       { children.map((item, idx) =>
          <TabPanel key={ idx }>
            { item }
          </TabPanel>
        )}



      </Tabs>
    </div>
  );
}

TabBar.defaultProps = {
  onSelect: () => {},
  className: '',
};

TabBar.propTypes = {
  items: PropTypes.array,
};

export default TabBar
