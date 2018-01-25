<template>
          <!-- result build -->
  <div v-if="showQuotaPanel">
      <div class='panel panel-default'  >
          <div class='panel-heading cds-panel-header'>
              <div class='cds-panel-header__prefix '>
                  <div class='time-off'></div>
              </div>
              <div class='cds-panel-header__main'>
                {{parentString }}
                      <br/>
                      <div>Quota : {{ leavequota}} slots available</div>
              </div>	
              <div class='cds-panel-header__suffix' >
                      <button type='button' class='btn btn-primary' @click="onClickCreateBid" data-toggle="modal" data-target="#myModal"> Create Bid </button>
              </div>        		
          </div>	
      </div>
      <!-- modal window -->
  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Confirmation</h4>
        </div>
        <div class="modal-body">
          <p>Leave Bid Request Successfuly Submitted.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class='btn btn-primary' data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div> 

</div>

</template>
<script>
export default {
    computed: {
     parentString: function() {
       return this.$store.getters.parentString;
     },
     leavequota: function() {
       return this.$store.getters.leavequota;
     },
     showQuotaPanel: function() {
       return this.$store.getters.showQuotaPanel;
     }
   },
    methods:{
        onClickCreateBid() {
            console.log("Bid Request Submitted");
            //this.$parent.count+=1;
            //this.$parent.lastSubmitDate = new Date().toLocaleString("en-US");

            this.$store.dispatch('createbid');
        }
    },
    created(){
        console.log('quota created')
    },
    mounted(){
        console.log('quota mounted')
    },
    beforeDestroy(){
        console.log('quota destroyed')
    }
}
</script>