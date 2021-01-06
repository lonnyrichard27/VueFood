<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card-content">
            <!-- the delete smoothie click event has a parameter of smoothie.id so as to target the id of that particular smoothie -->
            <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
            <h2 class="green-text">{{ smoothie.title }}</h2>
            <ul class="ingredients">
                <!-- looping through the smoothie array(which includes an array of ingredients) -->
                <li v-for="(ing,index) in smoothie.ingredients" :key="index">
                    <span class="chip">{{ ing }}</span>
                </li>
            </ul>
        </div>
        <span class="btn-floating btn-large halfway-fab pink">
            <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
                <i class="material-icons edit">edit</i>
            </router-link>
        </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Index',
    data (){
        return{
           smoothies:[] 
        }
    },
    methods:{
        deleteSmoothie(id){
            // .doc.id  gets a specific
            db.collection('smoothies').doc(id).delete()
            .then(() => {
                // bro remember filter runs through an array to check if an item exists there then returns a new array 
                this.smoothies = this.smoothies.filter((smoothie) => {
                    //  if the smoothie.id is not equal to the id passed when this method is clicked remove the item from the array and return a new array
                    return smoothie.id != id
                })
            })
        }
    },
    created(){
        // fetch data from the firestore
        db.collection('smoothies').get()
        .then((snapshot) => {
            // looping through data from the firestore
            snapshot.forEach((doc) => {
                let smoothie = doc.data()
                smoothie.id = doc.id
                this.smoothies.push(smoothie)
            })
        })
    }
}
</script> 

<style>
.index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
}
.index h2{
    font-size: 1.8ems;
    text-align: center;
    margin-top: 0;
}
.index .ingredients{
    margin: 30px auto;
}
.index .ingredients li {
    display: inline-block;
}
.index .delete{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    font-size: 1.4ems;
}
</style>