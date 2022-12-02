export const initialState = {
  interested: [],
  user: null
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
      case 'ADD_TO_INTERESTED':
          return {
              ...state,
              interested: [...state.interested, action.item],
          };

      case 'EMPTY_INTERESTED_LIST':
          return {
              ...state,
              interested: []
          };

      case 'REMOVE_FROM_INTERESTED':
          const index = state.interested.findIndex(
              (interestedItem) => interestedItem.id === action.id
          );

          let newInterestedList = [...state.interested];

          if(index >= 0){
              newInterestedList.splice(index, 1);
          }
          else{
              console.warn(
                  "Can't remove property (id: ${action.id}) as it's not in the interested list"
              )
          }

          return {
              ...state,
              interested: newInterestedList
          };

      case 'SET_USER':
          return {
              ...state,
              user: action.user
          };

      default:
          return state;
  }
};

export default reducer;