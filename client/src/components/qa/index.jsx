import React from 'react';
import axios from 'axios';
import QA from './QA.jsx';
import ImageModal from './ImageModal.jsx';
import AddAnswModal from './AddAnswModal.jsx';
import AddQuesModal from './AddQuesModal.jsx';
import {useState, useEffect} from 'react';


const QuesnAnsw = (props) => {
  // used to store questions data ---------------------------
  const [qaData, setQaData] = useState([]);
  // these states pass down the image url for the popup modal --------------
  const [getImage, setImage] = useState();
  const [modalOn, setModalOn] = useState(false);
  // popup modal for add new answers
  const [modalAnswOn, setModalAnswOn] = useState(false);
  // question/question id for add answers
  const [QID, setQID] = useState();

  // keep track of add question popup modal
  const [modalQuesOn, setModalQuesOn] = useState(false);

  // get questions --------------------
  useEffect(() => {
    if(props.product.id) {
      axios.get('/api/qa/questions', {params: {p_id: props.product.id} })
        .then((response) => {
          setQaData(response.data.results);
        })
        .catch(err => {
          console.log('Error fetching data: ', err);
        })
    }
  }, [props.product])


  return (
    <div>
      <div>
        {/* rendering QA ----------- */}
        <QA qaData={qaData} setImage={setImage} setModalOn={setModalOn} modalOn={modalOn} modalAnswOn={modalAnswOn} setModalAnswOn={setModalAnswOn} setQID={setQID} modalQuesOn={modalQuesOn} setModalQuesOn={setModalQuesOn} />
      </div>

      <div>
        {/* popup when clicking images in answers ----------- */}
        <ImageModal getImage={getImage} modalOn={modalOn} setModalOn={setModalOn} />
      </div>

      <div>
        {/* add new questions ----------- */}
        <AddQuesModal product={props.product} modalQuesOn={modalQuesOn} setModalQuesOn={setModalQuesOn} />
      </div>

      <div>
        {/* add new answers ----------- */}
        <AddAnswModal product={props.product} modalAnswOn={modalAnswOn} setModalAnswOn={setModalAnswOn} QID={QID} />
      </div>
    </div>
  )
}

export default QuesnAnsw;