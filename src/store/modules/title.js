import * as types from '../mutation-types'

const { locale, locales } = window.config

console.log(locale, locales)
// state
export const state = {
    title: 'Freight Crew',
    cardtitle: '',
}

// getters
export const getters = {
  title: state => state.title,
  cardtitle: state => state.cardtitle
}

// mutations
export const mutations = {
    [types.SET_TITLE] (state, { title }) {
        state.title = title
    },
    [types.COMPLETE_TITLE] (state, { title }) {
        state.title = state.title + ' ' + title
    },
    [types.SET_SUBTITLE] (state, { cardtitle }) {
        state.cardtitle = cardtitle
    },
    [types.REMOVE_TITLE] (state, ) {
        state.title = 'FreightCrew Admin'
    },
    [types.REMOVE_SUBTITLE] (state) {
        state.cardtitle = ''
    }
}

// actions
export const actions = {
    setTitle ({ commit }, { title }) {
        commit(types.SET_TITLE, { title })
    },
    completeTitle ({ commit }, { title }) {
        commit(types.COMPLETE_TITLE, { title })
    },
    removeTitle ({ commit }) {
        commit(types.REMOVE_TITLE)
    },
    setSubTitle ({ commit }, { cardtitle }) {
        commit(types.SET_SUBTITLE, { cardtitle })
    },
    removeSubTitle ({ commit }) {
        commit(types.REMOVE_SUBTITLE)
    },
}
