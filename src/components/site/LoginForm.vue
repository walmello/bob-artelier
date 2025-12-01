<script setup>
    import supabase from "../../scripts/Supabase.js"
    import { ref } from 'vue'
    const email = ref('')
    const password = ref('')
    const feedback = ref('')

    async function login(){
        const {data, error} = await supabase.auth.signInWithPassword({email: email.value, password: password.value})
        if(error){
            console.log(error)
            feedback.value = "Deu erro"
        }
        console.log('logado!')
        window.location.href = './dashboard'
    }
</script>

<template>
    <article>
    <form @submit.prevent="login">
        <h1>Fazer Login</h1>
        <label>
            Email:
            <input type="text" v-model="email">
        </label>
        <label>
            Senha:
            <input type="password" v-model="password">
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