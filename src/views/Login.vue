<template>
  <div class="wrapper">
    <div class="form-image">
    </div>
    <div class="form-container">
      <b-form @submit.prevent="login" class="d-flex flex-column">
        <div class="title mb-1">
          <img
            src="@/assets/logo_inoc.png"
            alt="logo"
            width="250"
          >
          <p>Welcome To Nonconformity + CePAT Report!</p>
          <p class="top-text">
            Easy to track, Easy to take action, and Manage the cause not the result!
            <br>
            <a href="../Guidance-inoc.pdf" target="_blank">Please click here for more guidance</a>
          </p>
        </div>
        <b-alert
          variant="danger"
          :show="!!error"
        >
          {{ error }}
        </b-alert>
        <p>Sign In</p>
        <div v-if="!isPin">
          <b-form-group label="Username">
            <b-form-input
              class="username"
              autocapitalize="off"
              v-model="credentials.username"
              placeholder="Enter your username"
              :disabled="isBusy"
            />
          </b-form-group>
          <div class="position-relative mb-5">
            <b-form-group label="Password">
              <b-form-input
                class="password"
                :type="type"
                v-model="credentials.password"
                placeholder="Enter your password"
                :disabled="isBusy"
              />
            </b-form-group>
            <fa-icon
              class="icon-hide pointer"
              icon="eye"
              fixed-width
              @click="switchVisibility"
            />
          </div>
          <b-form-group class="pt-5">
            <b-button
              class="btn-custom shadow-lg p-2 rounded"
              type="submit"
              variant="primary"
              block
              :disabled="isBusy"
            >
              LOGIN
              <b-spinner
                v-if="isBusy"
                class="ml-1"
                label="Spinning"
                small
              />
            </b-button>
          </b-form-group>
        </div>
        <div v-else>
          <b-form-group label="Email">
            <b-form-input
              class="username"
              autocapitalize="off"
              v-model="credentials.username"
              placeholder="Enter your email"
              :disabled="isBusy"
            />
          </b-form-group>
          <b-form-group>
            <b-button
              class="btn-custom shadow-lg p-2 rounded"
              type="submit"
              variant="primary"
              block
              :disabled="isBusy"
            >
              SEND PIN TO EMAIL
              <b-spinner
                v-if="isBusy"
                class="ml-1"
                label="Spinning"
                small
              />
            </b-button>
          </b-form-group>
        </div>
        <div class="text-center mt-2">
          <a class="text-uppercase" @click="isPin = !isPin">Click here to login by {{ !isPin ? 'PIN' : 'username' }}</a>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data: () => ({
    credentials: {
      username: '',
      password: '',
      language: 'EN'
    },
    error: null,
    type: 'password',
    isBusy: false,
    isPin: false
  }),

  methods: {
    switchVisibility() {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    async login() {
      try {
        this.isBusy = true
        const { data: { data } } = await api.auth.login(this.credentials)
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        this.fetchProfile(data.userData.id)

        this.error = this.$options.data().error

        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 2500)
      } catch ({ response }) {
        this.isBusy = false
        this.error = response.data.message.messageEng
      }
    },
    async fetchProfile(id) {
      const { data: { data } } = await api.user.me(id)
      const response = await api.user.role(id)
      data.role = response.data.data.roleList

      localStorage.setItem('profile', JSON.stringify(data))
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-image: url('../assets/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: var(--primary);
  min-height: 100%;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    display: flex;
  }
}

.form-container {
  margin: 20px;
  background-color: rgba(255, 255, 255, 0.68);
  display: flex;
  justify-content: center;
  max-height: 100vh;
  border-radius: 20px;

  @media screen and (min-width: 992px) {
    width: 500px;
  }
}

.form-image {
  align-items: center;
  display: grid;
  justify-content: center;
  min-height: 98vh;
  margin-right: 44px;
  background-image: url('../assets/login.png');
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center;

  @media screen and (min-width: 992px) {
    width: 70%;
  }
}

form {
  width: 300px;
  height: 100%;
  padding-top: 10vh;
  padding-bottom: 10vh;
  margin: 0 4vw 0 4vw;
}

.logo-1 {
  justify-self: right;
}

.logo-2 {
  margin-bottom: 24px;
}

.username {
  background-color: #fff;
  background: url('../assets/ic_username.svg') no-repeat scroll 7px 5px;
  padding-left: 45px;
  border: 1px solid darkgray;

  @media screen and (min-width: 992px) {
    background-position: 7px 5px;
  }
}

.password {
  background: url('../assets/ic_padlock.svg') no-repeat scroll 7px 5px;
  padding-left: 45px;
  border: 1px solid darkgray;

  @media screen and (min-width: 992px) {
    background-position: 7px 5px;
  }
}

.icon-hide {
  color: var(--primary);
  position: absolute;
  right: 7px;
  top: 75%;
  transform: translateY(-50%);
}

.top-text {
  color: #3F3356;
}
</style>
