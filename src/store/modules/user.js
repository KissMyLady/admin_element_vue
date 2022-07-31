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
          resolve()
        }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        console.log("getInfo -> 获取到的用户数据打印: ", data);
        /*
        * avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
        * introduction: "I am a super administrator"
        * name: "Super Admin"
        * roles: ['admin']
        * */
        const {roles, name, avatar, introduction} = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  GetInfo({commit, state}, sendData){
    console.log("进入到GetInfo, 发送数据打印: ", sendData);

    return new Promise((resolve, reject) => {
      api_getInfo(sendData).then((res)=>{
        //储存用户信息
        commit('SET_USER', res);

        //生成路由
        store.dispatch('permission/generateRoutes', res)
          .then(() => {
          //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
          router.addRoutes(store.getters.addRouters)
        })
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })

    })
  },

  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {root: true})

        resolve()
      }).catch(error => {
        reject(error)
      })
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
