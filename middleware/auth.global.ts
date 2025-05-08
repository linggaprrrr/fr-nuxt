export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && to.path === '/login') {
      if (userStr) {
        const user = JSON.parse(userStr) as { role: string };

        if (user.role === 'superadmin') {
          return navigateTo('/admin/dashboard');
        } else {
          return navigateTo('/photos');
        }
      }
    }

    if (!token && to.path !== '/login') {
      return navigateTo('/login');
    }
  }
});
