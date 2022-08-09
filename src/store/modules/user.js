import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'
import store from '../../store'

import {
  api_login, api_getInfo
} from "@/api/auth/LoginApi"

import {default as api} from '@/utils/request'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],

  nickname: "",
  userId: "",
  roleIds: [],
  menus: [],
  permissions: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  set_userId: (state, userId) => {
    state.userId = userId
  },
  SET_USER: (state, userInfo) => {
    state.nickname = userInfo.nickname;
    state.userId = userInfo.userId;
    state.roleIds = userInfo.roleIds;
    state.menus = userInfo.menuList;
    state.permissions = userInfo.permissionList;
    state.avatar = "https://blog.mylady.top/static/books/2022/7/avatar_longZhu.jpg";
  },
  RESET_USER: (state) => {
    state.nickname = "";
    state.userId = "";
    state.roleIds = [];
    state.menus = [];
    state.permissions = [];
  }
}

const actions = {

  // 用户登录
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      let sendData = {
        username: username.trim(),
        password: password
      }
      api_login(sendData)
        .then(response => {
          const token = response.token;
          commit('SET_TOKEN', token);
          setToken(token)

          //改变 promise 的状态为已完成. 就可以执行.then()了
          resolve()
        }).catch(error => {
        //改变 promise 的状态为 reject, 就可以 .catch() 这个 promise 了
        reject(error)
      });
    })
  },

  GetInfo({commit, state}, sendData) {
    return new Promise((resolve, reject) => {
      api_getInfo(sendData)
        .then((res) => {
          //储存用户信息
          commit('SET_USER', res);
          //生成路由
          store.dispatch('permission/generateRoutes', res)
            .then(() => {
              //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
              router.addRoutes(store.getters.addRouters)
            });
          resolve(res);
        }).catch((err) => {
          reject(err);
      });
    });
  },

  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('RESET_USER', [])

      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, {root: true})

      resolve()

      // logout(state.token).then(() => {
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({commit, dispatch}, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const {roles} = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('up_permission/GenerateRoutes', roles, {root: true})
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {root: true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
