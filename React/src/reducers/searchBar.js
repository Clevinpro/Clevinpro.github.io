/**
 * Created by Clevin on 20.10.2016.
 */
const initialState = {
    displayedHotels: HOTELS
};

export default function searchBar (state = initialState, action) {

    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            
            return { ...state, open: !state.open };

        default:
            return state;
    }

}