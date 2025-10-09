import { TypedUseSelectorHook, useSelector as Selector } from 'react-redux';
import { RootState, AppDispatch } from '../store';

const useSelector: TypedUseSelectorHook<RootState> = Selector;

export default useSelector;
