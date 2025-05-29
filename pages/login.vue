<script setup lang="ts">
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url'

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)

definePageMeta({ layout: 'blank' })

// handle login
const { login, googleLogin } = useAuth()

const handleLogin = async () => {
  try {
    const user = await login(form.value.email, form.value.password)

    if (user) {
      const path = user.role === 'superadmin' ? '/admin/dashboard' : '/photos'
      console.log('Redirecting to:', path)
      await navigateTo(path)
    }
  } catch (error: any) {
    alert('Login gagal: ' + (error?.data?.message || 'Terjadi kesalahan'))
    console.error(error)
  }
}


import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";


const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response
  console.log(credential)
  if (credential) {
    await googleLogin(credential)
  }
}


const handleLoginError = () => {
  console.error("Login failed");
};
</script>


<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg
        :src="authV1TopShape"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <NuxtLink
            to="/"
            class="app-logo"
          >
            <nuxt-img
              src="/images/ownize_logo.png"
              alt=""
              class="float-left margin-fleche"              
              style="max-width: 120px; height: auto;"
               />
         
          </NuxtLink>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Welcome to Ownize! 👋🏻
          </h4>
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="handleLogin">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  :id="useId()"
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  :id="useId()"
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  autocomplete="password"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                  <VCheckbox
                    :id="useId()"
                    v-model="form.remember"
                    label="Remember me"
                  />

                  <a
                    class="text-primary"
                    href="javascript:void(0)"
                  >
                    Forgot Password?
                  </a>
                </div>

                <!-- login button -->
                <VBtn
                  block
                  color="#FB3AA2"
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-body-1 text-center"
              >
                <span class="d-inline-block">
                  New on our platform?
                </span>
                <NuxtLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  to="/register"
                >
                  Create an account
                </NuxtLink>
              </VCol>
              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol>
              <VCol
                cols="12"
                class="text-body-1 text-center"
              >
                <GoogleSignInButton
                  @success="handleLoginSuccess"                
                  @error="handleLoginError"
                ></GoogleSignInButton>
              </VCol>
               
              <VCol
                cols="12"
                class="d-flex align-center"
              >
              </VCol>              
              
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
