<template>
  <q-page>
    <q-card class="q-pa-lg absolute-center" style="width: 500px">
      <h3 class="text-weight-bold text-center">Registration</h3>

      <q-stepper
        ref="stepRef"
        v-model="stepModel"
        vertical
        active-color="welcome"
        done-color="welcome"
        animated
      >
        <q-step
          :name="1"
          title="Send verification email"
          :done="stepModel > steps.InputEmail"
        >
          <q-input
            ref="emailRef"
            @keydown.enter.prevent="onContinue"
            v-model="emailModel"
            type="email"
            label="Email *"
            color="welcome"
            lazy-rules="ondemand"
            :rules="emailRules"
            :clearable="true"
          />
        </q-step>

        <q-step
          :name="2"
          title="Check PIN"
          :done="stepModel > steps.VerifyEmail"
        >
          <q-input
            ref="pinRef"
            @keydown.enter.prevent="onContinue"
            v-model="pinModel"
            label="PIN *"
            color="welcome"
            :rules="pinRules"
            lazy-rules="ondemand"
            :hint="`It will arrive to ${emailModel} within a minute`"
            :clearable="true"
            :autofocus="true"
          />
        </q-step>

        <q-step :name="3" title="Nickname and password">
          <q-input
            ref="nicknameRef"
            v-model="nicknameModel"
            label="Nickname *"
            color="welcome"
            :rules="nicknameRules"
            lazy-rules="ondemand"
            :clearable="true"
            :autofocus="true"
          />
          <q-input
            ref="passwordRef"
            v-model="passwordModel"
            label="Password *"
            color="welcome"
            :type="passwordShow ? 'text' : 'password'"
            :rules="passwordRules"
            lazy-rules="ondemand"
            :clearable="true"
            @keydown.enter.prevent="onContinue"
          >
            <template #append>
              <q-icon
                class="cursor-pointer"
                :name="passwordShow ? 'visibility_off' : 'visibility'"
                @click="passwordShow = !passwordShow"
              />
            </template>
          </q-input>
        </q-step>
        <template #navigation>
          <q-stepper-navigation class="text-center">
            <q-btn
              :label="
                step.stepModel?.value !== steps.CreateAccount
                  ? 'Continue'
                  : 'Create account'
              "
              color="welcome"
              @click="onContinue"
              :loading="inProgress"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { ApiError, api } from 'boot/axios';
import { useAccountStore } from 'src/stores/account';
import { QInput, QStepper, useQuasar } from 'quasar';

function useEmail() {
  const reEmail = /.+@.+/;
  const emailModel = ref('');
  const emailRef = ref<QInput>();
  const emailRules = [
    (val: string) => (val && val.length > 0) || 'Email is required',
    (val: string) =>
      (val.length <= 40 && reEmail.test(val)) || 'Email is invalid',
  ];

  return {
    emailModel,
    emailRef,
    emailRules,
  };
}

function usePin(email: Ref<string>) {
  const pinModel = ref('');
  const pinRef = ref<QInput>();
  const pinRules = [
    (val: string) => (val && val.length === 5) || 'Pin is required',
    async (val: string) => {
      try {
        const params = new URLSearchParams();
        params.append('email', email.value);
        params.append('pin', val);

        await api.get(`/email-verification?${params.toString()}`);

        return true;
      } catch (e) {
        return 'Pin not equal';
      }
    },
  ];

  return {
    pinModel,
    pinRef,
    pinRules,
  };
}

function useNickname() {
  const reNickname = /^[a-zA-Z0-9]{3,15}$/;
  const nicknameModel = ref('');
  const nicknameRef = ref<QInput>();
  const nicknameRules = [
    (val: string) => (val && val.length > 0) || 'Nickname is required',
    (val: string) => reNickname.test(val) || '3-15 letters/numbers',
  ];

  return {
    nicknameModel,
    nicknameRef,
    nicknameRules,
  };
}

function usePassword() {
  const rePassword = /^[a-zA-Z0-9]{6,32}$/;
  const passwordModel = ref('');
  const passwordRef = ref<QInput>();
  const passwordRules = [
    (val: string) => (val && val.length > 0) || 'Password is required',
    (val: string) => rePassword.test(val) || '6-32 letters/numbers',
  ];
  const passwordShow = ref(false);

  return {
    passwordModel,
    passwordRef,
    passwordRules,
    passwordShow,
  };
}

enum Steps {
  InputEmail = 1,
  VerifyEmail = 2,
  CreateAccount = 3,
}

function useStepper() {
  const stepModel = ref<Steps>(Steps.InputEmail);
  const stepRef = ref<QStepper>();
  const stepNext = (): void => void stepRef.value?.next();

  return {
    stepModel,
    stepRef,
    stepNext,
  };
}

export default defineComponent({
  name: 'Register',
  setup() {
    const $q = useQuasar();
    const $account = useAccountStore();
    const email = useEmail();
    const pin = usePin(email.emailModel);
    const nickname = useNickname();
    const password = usePassword();
    const step = useStepper();
    const inProgress = ref(false);

    return {
      step,
      ...email,
      ...pin,
      ...nickname,
      ...password,
      ...step,
      inProgress,
      steps: Steps,
      async onContinue() {
        inProgress.value = true;

        try {
          switch (step.stepModel.value) {
            case Steps.InputEmail:
              if (email.emailRef.value?.validate()) {
                await api.post('/email-verification', {
                  email: email.emailModel.value,
                });

                step.stepNext();
              }
              break;
            case Steps.VerifyEmail:
              if (await pin.pinRef.value?.validate()) {
                step.stepNext();
              }

              break;
            case Steps.CreateAccount:
              if (
                nickname.nicknameRef.value?.validate() &&
                password.passwordRef.value?.validate()
              ) {
                await $account.signup(
                  email.emailModel.value,
                  password.passwordModel.value,
                  nickname.nicknameModel.value
                );
              }
              break;
            default:
            // console.log('unknown');
          }
        } catch (error) {
          const err = error as ApiError;

          $q.notify({
            message: err.response?.data.err_message,
            type: 'negative',
          });
        } finally {
          inProgress.value = false;
        }
      },
    };
  },
});
</script>
