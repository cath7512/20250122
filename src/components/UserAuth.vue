<template>
  <div class="auth-container">
    <h2>로그인</h2>
    <form v-if="!isLoggedIn" @submit.prevent="login">
      <input v-model="email" type="email" placeholder="이메일" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit" :disabled="isLoading">로그인</button>
    </form>
    <p v-if="isLoggedIn">환영합니다, {{ username }}!</p>
    <div v-if="isLoggedIn" class="logout-container">
      <button @click="logout">로그아웃</button>
    </div>
    <div v-else>
      <p class="no-account">아직 계정이 없으신가요?</p>
      <a @click.prevent="goToSignup" class="signup-link">회원가입</a>
    </div>
    <div v-if="isLoading" class="spinner"></div>
    <p v-if="isLoading">로그인 중입니다. 잠시만 기다려 주세요.</p>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoggedIn: false,
      username: '',
      isLoading: false,
      inactivityTimer: null, // Timer for inactivity
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.isLoggedIn = true;
        this.username = this.email.split('@')[0]; // Example to set username
        this.startInactivityTimer(); // Start the inactivity timer
      } catch (error) {
        console.error("로그인 오류:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.isLoading = true; // Set loading state for logout
      try {
        await signOut(auth);
        this.isLoggedIn = false;
        this.username = ''; // Clear username on logout
        this.clearInactivityTimer(); // Clear the timer on logout
      } catch (error) {
        console.error("로그아웃 오류:", error);
      } finally {
        this.isLoading = false; // Reset loading state
      }
    },
    goToSignup() {
      this.$router.push('/signup');
    },
    startInactivityTimer() {
      this.clearInactivityTimer(); // Clear any existing timer
      this.inactivityTimer = setTimeout(() => {
        alert("사용자 계정보호를 위해 자동 로그아웃 합니다. 다시 로그인 해주세요."); // Show alert message
        this.logout(); // Automatically log out after 5 seconds of inactivity
      }, 1800000); // 1800000 milliseconds = 30 minutes

      // Add event listeners for user activity
      window.addEventListener('mousemove', this.resetInactivityTimer);
      window.addEventListener('keydown', this.resetInactivityTimer);
    },
    resetInactivityTimer() {
      this.clearInactivityTimer(); // Clear the existing timer
      this.startInactivityTimer(); // Restart the timer
    },
    clearInactivityTimer() {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer); // Clear the timer
        this.inactivityTimer = null; // Reset the timer variable
      }
      // Remove event listeners when the timer is cleared
      window.removeEventListener('mousemove', this.resetInactivityTimer);
      window.removeEventListener('keydown', this.resetInactivityTimer);
    }
  }
};
</script>

<style scoped>
@import '../css/User.css'; /* Import the User.css file */
.no-account {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit color from parent */
}
</style> 