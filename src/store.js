import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        //TODO: implement
        fromDate: null,
        toDate: null,
        parentString: "",
        showQuotaPanel: false,
        lastSubmitDate: null,      
        count: 0,
        leavequota: 0
    },
    getters: {
        //TODO: implement
        fromDate: function(state) {
            return state.fromDate;
        },
        toDate: function(state) {
            return state.toDate;
        },
        parentString: function(state) {
            return state.parentString;
        },
        showQuotaPanel: function(state) {
            return state.showQuotaPanel;
        },
        lastSubmitDate: function(state) {
            return state.lastSubmitDate;
        },
        count: function(state) {
            return state.count;
        },
        leavequota: function(state) {
            return state.leavequota;
        }

    },
    mutations: {
        //TODO: implement
        showquota: function(state,payload) {
                      

            state.fromDate = payload.fromDate;
            state.toDate = payload.toDate;
            state.parentString = payload.parentString;
            state.showQuotaPanel = payload.showQuotaPanel;
            
            state.leavequota = payload.leavequota;

            
        },
        cancelquota: function(state) {
            
            state.showQuotaPanel = false;
        },
        createbid: function(state) {
            
            state.count = state.count + 1;
            state.lastSubmitDate = new Date().toLocaleString("en-US");
        }

    },
    actions: {
        //TODO: implement
        showquota: function(context,payload) {
            context.commit('showquota',payload);
        },
        cancelquota: function(context) {
            context.commit('cancelquota');
        },
        createbid: function(context) {
            context.commit('createbid');
        },


    }

})