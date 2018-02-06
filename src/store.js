import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        leavequota: 0,
        submitmsg:""
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
        },
        submitmsg: function(state) {
            return state.submitmsg;
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
            state.submitmsg = payload.submitmsg;            
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
            axios({
                url:'http://localhost:3000/leaves',
                method:'get'
              }).then(function(result){
                console.log('calling axios from vuex');
                console.log(result);
                
                payload.leavequota = result.data[0].availableQuota;
                payload.submitmsg = result.data[0].description;
                console.log('Payload after axios call: ');
                console.log(payload);                
                context.commit('showquota',payload);
                //vm.leavequota = result.data[0].availableQuota;
                //vm.callDispatch(result);
              }).catch(function(err){
                console.log("axios call cannot be completed");
                console.log(err);
                payload.leavequota=7;
                payload.submitmsg="Thanks for submitting your Leave Bid Request.";
                context.commit('showquota',payload);
              })            
        },
        cancelquota: function(context) {
            context.commit('cancelquota');
        },
        createbid: function(context) {
            context.commit('createbid');
        },


    }

})