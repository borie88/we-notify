'use strict'
require('dotenv').config()

var assert = require('chai').assert
var WeNotify = require('../dist/index')

const appId = process.env.WX_APPID
const appSecret = process.env.WX_SECRET

if (!appId || !appSecret) {
    throw 'No app id or app secret set in .env file'
}

var wenotify = new WeNotify(appId, appSecret)

describe('Access Token', () => {
    it('should get access token', async () => {
        assert.isString(await wenotify.getAccessToken())
    })
})

describe('Notification', () => {
    it('should try to send notification but fail with bad params', async () => {
        const params = {
            touser: 'fsfdsfsdfsdf',
            template_id: 'asdasdasrwetew',
            page: 'afsewstert',
            form_id: 'w543534trfger',
            data: {}
        }
        try {
            var res = await wenotify.send(params)
        } catch (e) {
            var error = e
        }
        assert.notExists(res)
    })
  
    // We can have more its here
  })