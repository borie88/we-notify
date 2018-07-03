'use strict'

const axios = require('axios')

class WeNotify {

    constructor (appId, appSecret) {
		this.appId = appId
  		this.appSecret = appSecret
    }

    async getAccessToken () {
        try {
            var res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`)
        } catch (e) {
            throw Error (`Error obtaining access code: ${e}`)
        }
        if (res.status === 200) {
            if (!res.data.access_token) {
                throw 'No access token'
            }
            return res.data.access_token
        } else if (res.errcode) {
            throw Error (`Error obtaining access code: ${errcode}, ${errmsg}`)
        }
    }

    async send (params) {
        const clonedParams = Object.assign({}, params)
        // touser: '' openId,
        // template_id: '',
        // page: '',
        // form_id: '',
        // data: '',
        // emphasis_keyword: ''
        try {
            var access_token = await this.getAccessToken()
        } catch (e) {
            throw `Error sending notification: ${e}`
        }
        try {
            var res = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`, clonedParams)
        } catch (e) {
            throw Error (`Error sending notification: ${e}`)
        }
        if (res.status === 200) {
            if (res.data.errmsg && res.data.errmsg === 'ok') {
                return true
            }
            throw Error (`Error sending notification: ${res.data.errcode} - ${res.data.errmsg}`)
        } else {
            throw Error (`Error sending notification: ${res.status}`)
        }
    }
    
}

module.exports = WeNotify