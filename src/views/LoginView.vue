<script setup lang="ts">

function DoLogin(payload: MouseEvent) {
    payload.preventDefault()
}

</script>

<template>
  <main>
    <div>
        <h2>LOGIN</h2>
    </div>
    <div>
        <form method="post">
            <div>User name:</div>
            <input type="text" name="userName" id="userName" v-mo/>
            <div>Password:</div>
            <input type="password" name="userPassword" id="userPassword" />
            <div>
                <button name="btnLogin" v-on:click="DoLogin">Login</button>
            </div>
 
        </form>
    </div>
  </main>
</template>
