<template>
  <div v-show="count > 0">
<p class="text-center"><span span class="badge badge-secondary">
  Last Leave Request Successfully Submitted on {{ lastSubmitDate }}
</span></p>
<br/>
</div>
</template>


<script>
export default {  
  computed: {
     lastSubmitDate: function() {
       return this.$store.getters.lastSubmitDate;
     },
     count: function() {
       return this.$store.getters.count;
     }        
   },
   created(){
        console.log('Leave Update created')
    },
    mounted(){
        console.log('Leave Update mounted')
    },
  beforeUpdate(){
      console.log('total count updated')
  }
//   computed:{
//       myComputedProp:function(){
//           return this.myCount+5
//       }
//   },
//   data(){
//       return{
//           count:0
//       }
//   },
//   methods:{
//       incrementCount(){
//           this.$emit('countUpdated',10)
//       }
//   }
}
</script>
