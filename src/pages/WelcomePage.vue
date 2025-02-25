<template>
  <q-page>
    <div class="hero">
      <h3 class="text-center text-white text-bold q-pt-lg q-pb-lg">
        7wd is a platform to play <br />
        <span style="white-space: nowrap">7 wonders duel</span> online
      </h3>
    </div>
    <div class="row justify-center items-center q-gutter-lg">
      <div class="col col-auto">
        <LoginForm />
      </div>
      <div class="col col-auto">
        <h5 class="text-weight-bold text-white">- OR -</h5>
      </div>
      <div class="col col-auto">
        <RegisterForm />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/LoginForm.vue';
import RegisterForm from 'components/RegisterForm.vue';
</script>

<style scoped lang="scss"></style>
