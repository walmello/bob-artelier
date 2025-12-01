<script setup>
import { onMounted, ref } from 'vue';
import supabase from '../../scripts/Supabase';

const user = ref()

onMounted(async () => {
    const { data: { user: u } } = await supabase.auth.getUser()
    user.value = u
})

function logOff(){
    supabase.auth.signOut();
    window.location.href = '/'
}
</script>

<template>
    <header>
        <nav class="container-fluid">
            <div class="menu">
                <ul class="desktop">
                    <li><a href="/#courses">Cursos</a></li>
                    <li><a href="/#about">Sobre Mim</a></li>
                    <li><a href="/#gallery">Galeria</a></li>
                    <li><a href="/#community">Comunidade</a></li>
                    <li><a href="/#FAQ">Perguntas</a></li>
                </ul>
            </div>
            <a class="logo" href="/">
                <img src="/bob-icon.svg" alt="">
            </a>
            <ul v-if="!user" style="margin-left: auto;">
                <li>
                    <a type="button" href="/login">Login</a>
                </li>
                
                <li>
                    <a type="button" class="secondary" href="/registrar">Registrar</a>
                </li>
            </ul>
            <ul v-if="user" style="margin-left: auto;">
                <li>
                    <a type="button" href="/dashboard">Dashboard</a>
                </li>
                
                <li>
                    <a @click="logOff" class="secondary" href="#">Logout</a>
                </li>
            </ul>
        </nav>
        <div class="spacer"></div>
    </header>
</template>


<style>
.spacer {
    height: 10vh;
}

nav {
    display: grid;
    grid-template-columns: 5fr 1fr 5fr;
    position: fixed;
    background-color: white;
    top: 0;
    align-items: center;
    padding: 0.5rem 1.5rem;
    z-index: 99999999;
    box-shadow: 1px 1px 1px black;
}

.logo {
    margin: auto;
}

.mobile {
    display: none;
}

@media (max-width: 720px) {
    .desktop {
        display: none;
    }        
    .mobile {
        display: block;
    }
    
    nav {
        display: flex;
        justify-content: space-between;
    }
    
    .logo {
        margin-left: 0;
        width: 4rem;
    }
}
</style>