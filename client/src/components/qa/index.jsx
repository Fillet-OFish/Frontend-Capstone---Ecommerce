import React from 'react';
import axios from 'axios';
import QA from './QA.jsx';

const QuesnAnsw = (props) => {


  return (
    <div>
      <div>
        <QA qaData={props.qaData} awData={props.awData} />
      </div>
    </div>
  )
}

export default QuesnAnsw;