<script setup lang="ts">
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '../assets/images/logo.svg?raw'
import authV1BottomShape from '../assets/images/svg/auth-v1-bottom-shape.svg?url'
import authV1TopShape from '../assets/images/svg/auth-v1-top-shape.svg?url'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)

definePageMeta({ layout: 'blank' })
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

      <!-- 👉 Auth card -->
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
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="d-flex"
              v-html="logo"
            />
            <h1 class="app-logo-title">
              sneat
            </h1>
          </NuxtLink>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Adventure starts here 🚀
          </h4>
          <p class="mb-0">
            Make your app management easy and fun!
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="navigateTo('/')">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <FormField label="Username">
                  <template #default="{ id, describedBy }">
                    <VTextField
                      :id="id"
                      v-model="form.username"
                      autofocus
                      placeholder="Johndoe"
                      :aria-describedby="describedBy"
                    />
                  </template>
                </FormField>
              </VCol>
              <!-- email -->
              <VCol cols="12">
                <FormField label="Email">
                  <template #default="{ id, describedBy }">
                    <VTextField
                      :id="id"
                      v-model="form.email"
                      type="email"
                      placeholder="johndoe@email.com"
                      :aria-describedby="describedBy"
                    />
                  </template>
                </FormField>
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <FormField label="Password">
                  <template #default="{ id, describedBy }">
                    <VTextField
                      :id="id"
                      v-model="form.password"
                      autocomplete="password"
                      placeholder="············"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :aria-describedby="describedBy"
                      :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                  </template>
                </FormField>

                <div class="d-flex align-center my-6">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="form.privacyPolicies"
                    inline
                  />
                  <VLabel
                    for="privacy-policy"
                    style="opacity: 1;"
                  >
                    <span class="me-1 text-high-emphasis">I agree to</span>
                    <a
                      href="javascript:void(0)"
                      class="text-primary"
                    >privacy policy & terms</a>
                  </VLabel>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Sign up
                </VBtn>
              </VCol>

              <!-- login instead -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Already have an account?</span>
                <NuxtLink
                  class="text-primary ms-1"
                  to="/login"
                >
                  Sign in instead
                </NuxtLink>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
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
