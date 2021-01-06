<template>
<div class="add-smoothie container">
    <h2 class="center-align violet-text">Add New Smoothie Recipe</h2>
    <!-- .prevent prevents the browser from refreshing -->
    <form @submit.prevent="addSmoothie">
        <div class="field-title">
            <label for="title">Smoothie Title</label>
            <input type="text" name="title" v-model="title">
        </div>
        <!-- this loop signifies that for every ingredient added in the ingredients array theres an input field that displays-->
        <div v-for="(ing,index) in ingredients" :key="index" class="field">
            <label for="">Ingredient:</label>
            <input type="text" v-model="ingredients[index]">
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
            <label for="add-ingredient">Add an ingredient</label>
            <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
            <small>press the tab key on your keyboard to add new ingredient</small>
        </div>
        <div class="field center-align">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <button class="btn teal">Add Smoothie</button>
        </div>
    </form>
</div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
 data(){
    return{
        title: null,
        another: null,
        ingredients: [],
        feedback: null,
        // slug means url title
        slug: null
    }
 },
 methods:{
    addSmoothie(){
        // if title is being entered post to firebase db
        if (this.title) {
            this.feedback = null
            // create a slug
            this.slug = slugify(this.title, {
                replacement: '-',
                remove:/[$*_+~.()'"!\-:@]/g,
                lower:true
            })
            db.collection('smoothies').add({
                title:this.title,
                ingredients: this.ingredients,
                slug: this.slug
            }).then(() => {
                this.$router.push({ name: 'Index'})
            }).catch((err) => {
                console.log(err);
            })
        } else {
            this.feedback = 'You must enter a smoothie title'
        }
    },
    addIngredient(){
        if (this.another) {
            this.ingredients.push(this.another)
            // clearing out the form field after the op has been performed
            this.another = null
            this.feedback = null
        } else {
            this.feedback = 'You must enter a value to add an ingredient'
        }
    },
    deleteIng(ing){
        this.ingredients = this.ingredients.filter(ingredient => {
            // remember that the filter method returns true or false if its true it  wont remove it from the array
            return ingredient != ing
        })
    }
 }
}
</script>

<style>
.add-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.add-smoothie .field{
    position: relative;
    margin: 20px auto;
}
.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4em;
}
</style>