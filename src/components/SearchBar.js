import { useDispatch } from 'react-redux';
import { searchInputChange } from '../store/slices/searchSlice';
import { useEffect, useRef } from 'react';

function SearchBar({ onSubmit, value }) {
  const dispatch = useDispatch();
  const inputRef = useRef();

  // 'document.activeElement' returns the currently focused element in the document
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape' && inputRef.current === document.activeElement) {
        dispatch(searchInputChange('')); // input reset on 'Esc' press
      }
    })
  }, [dispatch])

  return (
    <form className="box" onSubmit={onSubmit}>
      <div className="field">
        <input
          className="input is-medium"
          type="text"
          onChange={e => dispatch(searchInputChange(e.target.value))}
          value={value}
          ref={inputRef}
          placeholder="Search..."
        />
      </div>
      <button className="button is-primary">Search</button>
    </form>
  )
}

export default SearchBar;