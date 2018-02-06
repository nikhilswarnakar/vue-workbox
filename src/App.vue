<template>
  <div id="app" class="appclass">
    <!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="100" alt="Angular Logo" src="./assets/logo.png">
</div>
<div>
<br/>
<leave-update></leave-update>
<!-- <total-count :myCount="count" @countUpdated="updateCount"></total-count> -->
<!-- <total-count :myCount="count"></total-count> -->
<total-count></total-count>
</div>
<div class="container">
    <div>	
        <div class="app-header">
            <div class="app-heading"><h3>CREW LEAVE</h3> </div>
            <div class="cds-logo_without-boeing-margin-50-percent app-logo" > </div>
        <!-- modal adding -->

        </div>
        <div class='panel-body'>

                <div class='col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group'>
                    <label htmlFor='fromDate'>From</label><span >*</span>
                    <!-- <input type='date' class='form-control'  [(ngModel)]="model.fromDate"  (blur) ="showdateinfo()" /> -->
                    <input type='date' class='form-control'  @change="datechecker" v-model="model.fromDate" />
                </div>
                <div class='col-xs-2 col-sm-2 col-md-2 col-lg-2 form-group' align='center'>
                    <br/>
                    -
                </div>
                <div class='col-xs-5 col-sm-5 col-md-5 col-lg-5 form-group'>
                    <label htmlFor='toDate'>To</label><span >*</span>
                    <!-- <input type='date' class='form-control'  [(ngModel)]="model.toDate"   /> -->
                    <input type='date' class='form-control'  @change="datechecker" v-model="model.toDate" />
                </div>
                <div class='btn-toolbar pull-right ' >
                    <button id="cancelbtn" type='button' class='btn btn-default' @click=" onClickHideQuota"  > Cancel </button>
                    <button id="showquotabtn" type='button' class='btn btn-primary' @click=" onClickShowQuota" disabled> Show Quota </button>
                </div>

        </div>
    </div>
    <!--
    <div *ngIf="showQuotaPanel" >
        <app-quota [vacationDate] = "parentString" ></app-quota>
    </div>
   
    <div *ngIf="(showQuotaPanel | async)" >
    <app-quota></app-quota>
    </div>
     -->     
     <quota></quota>

  <!-- modal window -->
  <!-- Modal -->
  <div class="modal fade" id="myModal1" role="dialog">
    <div class="modal-dialog">    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Warning!</h4>
        </div>
        <div class="modal-body">          
          <p>To date should be greater than From date.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class='btn btn-primary' data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div> 
    
</div>
</div>
</template>

<script>
require('crewmodules-design-system/dist/css/crewmodules-design-system.css')
require('../src/styles/styles.css')
import Quota from '@/components/Quota'
import TotalCount from '@/components/TotalCount'
import LeaveUpdate from '@/components/LeaveUpdate'
import axios from 'axios'


export default {
  name: 'app',
  components: {
    'quota':Quota,
    'total-count':TotalCount,
    'leave-update':LeaveUpdate
  },
  data(){
    return {
      title:'App',
      fromDate: null,
      toDate: null,
      //parentString: "",
      //showQuotaPanel: false,
      //lastSubmitDate: null,
      //count: 0,
      //leavequota: 0,
      model : {
        fromDate: null,
        toDate: null,
        parentString: "",
        showQuotaPanel: false,
        lastSubmitDate: null,      
        count: 0,
        leavequota: 0,
        submitmsg: ""
      }
    }
  },
  methods:{
    callDispatch(result) {
      console.log("callDispatch called")
      console.log(result);
      console.log(this.model);

      //this.model.leavequota = result;
      this.model.leavequota = result.data[0].availableQuota;
      this.model.submitmsg = result.data[0].description;
      if(this.model.leavequota === 0) {
        this.model.leavequota = 10;
      }
      if(this.model.submitmsg === "") {
        this.model.submitmsg = "Leave Bid Request Successfuly Submitted.";
      }
      this.$store.dispatch('showquota',this.model);

    },
    onClickShowQuota() {
    var vm = this
    if(this.model.fromDate != null && this.model.toDate != null){
      // this.parentString =  new DatePipe('en-US').transform (this.model.fromDate,'EEEE, MMMM d, y')+ "  to  " + new DatePipe('en-US').transform (this.model.toDate,'EEEE, MMMM d, y');
      // this.parentString =  new Date(this.model.fromDate).toDateString() + "  to  " + new Date(this.model.toDate).toDateString();
      // this.showQuotaPanel = true;

      //nik code
      this.model.parentString =  new Date(this.model.fromDate).toDateString() + "  to  " + new Date(this.model.toDate).toDateString();
      console.log(this.model.parentString);
      this.model.showQuotaPanel = true;

      this.model.fromDate = this.model.fromDate;
      this.model.toDate = this.model.toDate;
      
      var toDate = new Date(this.model.toDate).getTime();
      var fromDate = new Date(this.model.fromDate).getTime();
      var duration = (Math.floor((toDate - fromDate))/(1000*60*60*24));
      // this.leavequota = Math.abs(duration);
      // console.log('leavequota --- '+duration);
      // console.log(this);
    // this.ngRedux.dispatch({type: ADD_QUOTA, nikState: this});

    /*
    axios({
      url:'http://localhost:3000/leaves',
      method:'get'
    }).then(function(result){
      console.log('calling axios');
      console.log(result);
      //vm.leavequota = result.data[0].availableQuota;
      vm.callDispatch(result);
    }).catch(function(err){
      console.log(err)
      //vm.callDispatch(-1);
    })
    */
    this.$store.dispatch('showquota',this.model);
    } else {
      window.alert("Please select From and To Date");
    }
  },
  onClickHideQuota() {
    // this.showQuotaPanel = false;
    // console.log(this);
    // this.ngRedux.dispatch({type: HIDE_QUOTA, nikState: this});
    this.model.fromDate=null;
    this.model.toDate=null;
    this.datechecker();
    this.$store.dispatch('cancelquota');
  },
  datechecker()  {
    console.log("datechecker called");
    if(this.model.fromDate != null && this.model.toDate != null){
      var from = new Date(this.model.fromDate);
      var to = new Date(this.model.toDate);
      if(to > from)
      {
        document.getElementById("showquotabtn").disabled = false;
      }else{
        document.getElementById("showquotabtn").disabled = true;
         //window.alert('To Date should be greater than from date !!');
         // Get the modal
         //var modal = document.getElementById('myModal1');
        //  modal.style.display = "block";
        $("#myModal1").modal();
      }
      
    }
    else{
      document.getElementById("showquotabtn").disabled = true;
    }
  }
  // updateCount(newCount){
  //   this.count += newCount
  // }
  },
  created(){
        console.log('App created')
    },
    mounted(){
        console.log('App mounted')
    }
}
</script>

<style>
</style>
