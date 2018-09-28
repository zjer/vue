import fetch from '@/config/fetch'

/**
 * 登录
 */
export const signin = () => fetch('/user/login.do');
