import React from 'react';
import { useDarkMode } from '../../DarkMode.jsx'

export default function PopupComparison ({relatedItem, currentItem, setPopup, setHover}) {
  const darkMode = useDarkMode()
  const comparisonObj = {}
  currentItem.features.map((feature) => {
    comparisonObj[feature.feature] = {valueCurrent: feature.value}
  })
  relatedItem.features.map((feature) => {
    comparisonObj[feature.feature] ? comparisonObj[feature.feature].valueRelated = feature.value : comparisonObj[feature.feature] = {valueRelated: feature.value}
  })

  return (
    <div className='popup' onClick={(e)=>{setPopup(false); setHover(false)}}>
      <div className={`comparison-table ${darkMode ? 'comparison-table-dark' : ''}`}>
        <table>
          <caption>Comparing</caption>
          <thead>
            <tr>
              <th>{currentItem.name}</th>
              <th></th>
              <th>{relatedItem.name}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(comparisonObj).map((feature, index) => (
              <tr key={index}>
                <td className='td-left'>{comparisonObj[feature].valueCurrent === true ?  '✓' : comparisonObj[feature].valueCurrent}</td>
                <td className='td-feature'>{feature}</td>
                <td className='td-right'>{comparisonObj[feature].valueRelated === true ?   '✓' : comparisonObj[feature].valueRelated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
