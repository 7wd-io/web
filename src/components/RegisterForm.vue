<template>
  <div
    class="rounded-borders q-pa-lg swd-cover-dark relative-position"
    style="width: 300px; height: 480px"
  >
    <h5 class="text-weight-bold text-center text-uppercase">Register</h5>

    <q-form novalidate @submit="onSubmit" class="q-gutter-lg" ref="form-register">
      <q-input
        type="text"
        label="Nickname *"
        v-model="nickname"
        color="primary"
        label-color="black"
        bg-color="white"
        lazy-rules
        :rules="rules.nickname"
        clearable
        filled
      >
        <template #hint>
          <span class="hint">3-15 alphanumeric characters, starts with letter</span>
        </template>
      </q-input>

      <q-input
        label="Email *"
        color="primary"
        label-color="black"
        bg-color="white"
        v-model="email"
        lazy-rules
        :rules="rules.email"
        clearable
        filled
      />

      <q-input
        label="Password *"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        color="primary"
        label-color="black"
        bg-color="white"
        :rules="rules.password"
        lazy-rules
        clearable
        filled
      >
        <template #append>
          <q-icon
            class="cursor-pointer"
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
        <template #hint>
          <span class="hint">6-32 characters</span>
        </template>
      </q-input>
      <q-btn type="submit" class="hidden" />
    </q-form>
    <div class="form-footer">
      <div class="row justify-center">
        <div class="col col-auto">
          <q-btn
            style="width: 150px"
            label="Register"
            color="primary"
            :loading="inProgress"
            @click="onSubmit"
            push
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { useAccountStore } from 'stores/account';
import { ApiError } from 'boot/axios';
import { QForm, useQuasar } from 'quasar';

const $q = useQuasar();
const $account = useAccountStore();
const form = useTemplateRef<QForm>('form-register');

const inProgress = ref(false);
const nickname = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rules = {
  nickname: [
    (val: string) => (val && val.length >= 3 && val.length <= 15) || 'Invalid nickname',
  ],
  email: [(val: string) => (val && val.length > 0) || 'Email required'],
  password: [
    (val: string) => (val && val.length >= 6 && val.length <= 32) || 'Invalid password',
  ],

};

const onSubmit = async () => {
  if (!await form.value!.validate()) {
    return;
  }

  inProgress.value = true;

  try {
    await $account.signup(email.value, password.value, nickname.value);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  } finally {
    inProgress.value = false;
  }
};
</script>

<style>
.form-footer {
  position: absolute;
  width: 300px;
  left: 0px;
  bottom: 25px;
}
.hint {
  color: rgba(255, 255, 255, 0.7);
}
</style>
