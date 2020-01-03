import  { createSelector } from 'reselect'

// vyselektuje len usera zo state
export const selectUser = state => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)
