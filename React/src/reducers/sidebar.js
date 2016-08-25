const initialState = {
  open: false
}

export default function sideBar (state = initialState, action) {

  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, open: !state.open }

    default:
      return state;
  }

}