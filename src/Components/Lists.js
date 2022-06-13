import Popup from 'reactjs-popup';
// Config
import database from '../firebase';
// Modules
import { useEffect, useState } from 'react';
import { ref, onValue, push } from 'firebase/database';
// Components
import ListDisplay from './ListDisplay';

const Lists = () => {
  // States for shows on a list and the list identifier
  const [listIdentifier, setListIdentifier] = useState('');
  const [listOfShows, setListOfShows] = useState([]);

  const chooseListHandler = (e) => {
    // take current key value of selected list
    setListIdentifier(e.target.selectedOptions[0].attributes.key.value);
  };

  // Naming a new list
  const handleListName = (e) => {
    e.preventDefault();
    // pull the value from input for list name
    const listName = e.target[0].value;
    // push into firebase and alert user
    push(ref(database), { listName });
    alert(`New list created: ${listName}`);
  };

  // Pulling all list names from firebase for display list select
  const loadCustomLists = (response) => {
    const theSelect = document.querySelector('.selectAList');
    theSelect.innerText = '';
    const disabledOption = document.createElement('option');
    disabledOption.setAttribute('value', 'Select A List...');
    disabledOption.setAttribute('disabled', '');
    disabledOption.setAttribute('selected', 'selected');
    disabledOption.innerText = 'Select A List...';
    theSelect.appendChild(disabledOption);
    const data = response.val();
    for (let key in data) {
      const displayedList = data[key].listName;
      const theOption = document.createElement('option');
      theOption.setAttribute('value', displayedList);
      theOption.setAttribute('key', key);
      theOption.innerText = displayedList;
      theSelect.appendChild(theOption);
    }
  };
  // when list is chosen...
  useEffect(() => {
    // find it in firebase
    const listInFirebase = ref(database, `/${listIdentifier}`)
    // load all the shows on chosen list
    onValue(listInFirebase, (response) => {
      const customListResponse = response.val();
      const showArray = Object.entries(customListResponse);
      setListOfShows(showArray);
    });
  }, [listIdentifier]);

  // load the list names from firebase
  useEffect(() => {
    onValue(ref(database), (response) => {
      loadCustomLists(response);
    });
  }, []);

  return (
    <>
      <h1>Superla-TV</h1>
      <div className="buttonsContainer">
        <div className="chooseListContainer">
          <form>
            <select
              onChange={chooseListHandler}
              name="selectAList"
              className="selectAList"
              defaultValue="selectAList"
            ></select>
          </form>
        </div>
        <Popup
          trigger={<button className="button">Create New List</button>}
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <form onSubmit={handleListName}>
                <input
                  type="text"
                  placeholder="Name Your List"
                  maxLength="40"
                />
                <button className="submitList">Submit</button>
              </form>
              <button className="close" onClick={close}>
                X
              </button>
            </div>
          )}
        </Popup>
      </div>

      {listIdentifier === '' ? null : <ListDisplay Array={listOfShows} ListKey={listIdentifier} />}
    </>
  );
};

export default Lists;
