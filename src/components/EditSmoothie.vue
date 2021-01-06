<template>
<!-- if the data gets returned render the smoothie.title data-->
  <div v-if="smoothie" class="edit-smoothie container">
      <!-- getting the data from the route object -->
      <h2>Edit {{smoothie.title}} smoothie</h2>
      <form @submit.prevent="editSmoothie">
        <div class="field-title">
            <label for="title">Smoothie Title</label>
            <input type="text" name="title" v-model="smoothie.title">
        </div>
        <!-- this loop signifies that for every ingredient added in the ingredients array theres an input field that displays-->
        <div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field">
            <label for="">Ingredient:</label>
            <input type="text" v-model="smoothie.ingredients[index]">
            <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
            <label for="add-ingredient">Add an ingredient</label>
            <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
        </div>
        <div class="field center-align">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <button class="btn teal">Update Smoothie</button>
        </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return{
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    // runs before the component mounts the DOM
    created(){
        // getting the data of a particular smoothie to edit 
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            });
        })
    },
    methods: {
        addIngredient(){
        if (this.another) {
            this.smoothie.ingredients.push(this.another)
            // clearing out the form field after the op has been performed
            this.another = null
            this.feedback = null
        } else {
            this.feedback = 'You must enter a value to add an ingredient'
        }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                // remember that the filter method returns true or false if its true it  wont remove it from the array
                return ingredient != ing
            })
        },
        editSmoothie(){
             // if title is being entered post to firebase db
            if (this.smoothie.title) {
                this.feedback = null
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove:/[$*_+~.()'"!\-:@]/g,
                    lower:true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title:this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                this.feedback = 'You must enter a smoothie title'
            }
        }
    }
}
</script>

<style>
.edit-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.edit-smoothie .field{
    position: relative;
    margin: 20px auto;
}
.edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4em;
}

</style>