<script setup>
import { ref } from "vue";
import supabase from "../../scripts/Supabase.js";
const email = ref()
const password = ref()
const checkPassword = ref()
const feedback = ref()

async function register(){
    if(password.value != checkPassword.value){
        feedback.value = "As senhas não são iguais"
        return
    }
    
    const {data, error} = await supabase.auth.signUp({email: email.value, password: password.value}, {
        redirectTo: './login'
    })
    if(error){
        const type = Math.floor(error.status / 100); 
        if(type == 4){
            console.log(error)
        }
        
        if(type == 5){
            console.log(error)
            feedback.value = "Desculpe, o servidor está fora do ar. tente mais tarde"
        } 
    } else {
        feedback.value = "Cheque o seu email para fazer login"
    }
    
}
</script>

<template>
    <article>
        <form @submit.prevent="register">
            <h1>Crie sua conta</h1>
            <label>
                Email:
                <input type="text" v-model="email">
            </label>
            <label>
                Senha:
                <input type="password" v-model="password">
            </label>
            <label>
                Confirmar Senha:
                <input type="password" v-model="checkPassword">
            </label>
            <p>{{ feedback }}</p>
            <button type="submit">Fazer login</button>
        </form>
    </article>
</template>


<style>
p {
    color: red;
}
</style>