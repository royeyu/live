import { isvalidPhone, isvalidSmscType, isvalidUsername } from '@/utils/validate'

export const checkTextName = (rule, value, callback) => {
  if (value) {
    if (value.length < 2 || value.length > 32) {
      callback(new Error('长度在2-32个字符!'))
    } else {
      callback()
    }
  }
}

export const checkNotRequired = (rule, value, callback) => {
  if (value) {
    if (value.length < 2 || value.length > 32) {
      callback(new Error('长度在2-32个字符!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const validUsername = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback(new Error('请输入'))
  } else if (!isvalidUsername(value)) {
    callback(
      new Error(
        '只能包含数字、字母、下划线 长度为4-16个字符'
      )
    )
  } else {
    callback()
  }
}
export const validNotUsername = (rule, value, callback) => {
  if (value) {
    if (!isvalidUsername(value)) {
      callback(new Error('只能包含数字、字母、下划线 长度为4-16个字符'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const validNotSmscType = (rule, value, callback) => {
  if (value) {
    if (!isvalidSmscType(value)) {
      callback(new Error('只能包含数字和符号",/"'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const validMoney = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback(new Error('请输入'))
  } else if (value < 0 || value > 30000) {
    callback(
      new Error(
        '数值只能为正数且小于30000'
      )
    )
  } else {
    callback()
  }
}

export const validRequiredPhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请填写正确的手机号码'))
  }
}

export const validRPhone = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback()
  } else if (!isvalidPhone(value)) {
    callback(new Error('请填写正确的手机号码'))
  } else {
    callback()
  }
}

export const validArrTwo = (rule, value, callback) => {
  if (value === '' || value === null) {
    callback(new Error('请选择'))
  } else if (value.length < 2) {
    callback(
      new Error(
        '至少得选择两项'
      )
    )
  } else {
    callback()
  }
}

// 整数  >0
export const validIntNum = (rule, value, callback) => {
  const Rexp = /^[1-9]\d*$/
  if (!(Rexp.test(value))) {
    callback(new Error('请输入大于0的整数'))
  }
  callback()
}

// 整数  >=0
export const validAllIntNum = (rule, value, callback) => {
  const Rexp = /^\d*$/
  if (!(Rexp.test(value))) {
    callback(new Error('请输入不小于0的整数'))
  }
  callback()
}

// 中文字符 2-6 位
export const validChineseName = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value == '' || value == null) {
    callback()
  }
  const Rexp = /^[\u4e00-\u9fa5]{2,6}$/
  if (!(Rexp.test(value))) {
    callback(new Error('请输入2-6位中文'))
  }
  callback()
}

// 验证多个手机号码和固定号码  示例: 18612345678,01012345678
export const DropvalidatePhoneAndTel = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value == '' || value == null) {
    callback()
  }
  const allRexp = /^[0-1][0-9,]*$/
  const mRexp = /^1[3-9][0-9]\d{8}$/
  // const tRexp = /^0\d{2,3}-\d{7,8}$/
  const tRexp = /^0\d{2,3}[1-9]\d{6,7}$/
  if (!(allRexp.test(value))) {
    callback(new Error('请输入正确的号码，使用英文逗号 “ , ” 隔开'))
  } else {
    const arr = value.split(',')
    arr.map((item) => {
      if (item == '') {
        callback(new Error('请输入正确的号码，使用英文逗号 “ , ” 隔开'))
      }
      if (!(mRexp.test(item)) && !(tRexp.test(item))) {
        callback(new Error('请输入正确的手机号码或固话号码'))
      }
    })
  }
  callback()
}

// 验证多个手机号码和固定号码组成字符串   示例: 18612345678,01012345678
export const validatePhoneAndTel = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value == '' || value == null) {
    callback()
  }
  const intRexp = /^[0-1][0-9,]*$/
  const mRexp = /^1[3-9][0-9]\d{8}$/
  const tzRexp = /^0(10|2[0-9])[1-9]\d{7}$/
  const tnRexp = /^0[3-9]\d{2}[1-9]\d{6,7}$/
  // const tRexp = /^0\d{2,3}-\d{7,8}$/
  if (!(intRexp.test(value))) {
    callback(new Error('请输入正确的手机号码或固话号码'))
  } else {
    const arr = value.split(',')
    arr.map((item) => {
      if (item == '') {
        callback(new Error('请输入正确的手机号码或固话号码，使用英文逗号 “ , ” 隔开'))
      }
      if (item.substring(0, 1) == '1') {
        if (!(mRexp.test(item))) {
          callback(new Error('请输入正确的手机号码或固话号码，使用英文逗号 “ , ” 隔开'))
        }
      } else if (item.substring(0, 2) == '01' || item.substring(0, 2) == '02') {
        if (!(tzRexp.test(item))) {
          callback(new Error('请输入正确的手机号码或固话号码，使用英文逗号 “ , ” 隔开'))
        }
      } else {
        if (!(tnRexp.test(item))) {
          callback(new Error('请输入正确的手机号码或固话号码，使用英文逗号 “ , ” 隔开'))
        }
        callback()
      }
    })
  }
  callback()
}

// 验证规则固定号码
export const DropvalidateTel = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value == '' || value == null) {
    callback()
  }
  const tRexp = /^0\d{2,3}[1-9]\d{6,7}$/
  if (!(tRexp.test(value))) {
    callback(new Error('请输入正确的固话号码'))
  } else {
    callback()
  }
}

// 验证单个手机号码或固定号码
export const validatePhoneOrTel = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value == '' || value == null) {
    callback()
  }
  const intRexp = /^[0-1][1-9]\d{9,10}$/
  const mRexp = /^1[3-9][0-9]\d{8}$/
  const tzRexp = /^0(10|2[0-9])[1-9]\d{7}$/
  const tnRexp = /^0[3-8]\d{2}[1-9]\d{6,7}$/
  if (!(intRexp.test(value))) {
    callback(new Error('请输入正确的手机号码或固话号码'))
  } else {
    if (value.substring(0, 1) == '1') {
      if (!(mRexp.test(value))) {
        callback(new Error('请输入正确的手机号码或固话号码'))
      }
    } else if (value.substring(0, 2) == '01' || value.substring(0, 2) == '02') {
      if (!(tzRexp.test(value))) {
        callback(new Error('请输入正确的手机号码或固话号码'))
      }
    } else {
      if (!(tnRexp.test(value))) {
        callback(new Error('请输入正确的手机号码或固话号码'))
      }
      callback()
    }
  }
  callback()
}

// 验证不超过10个手机号码的组成字符串   示例: 18612345678,13312345678
export const validatePhoneLenTen = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value === '' || value == null) {
    callback()
  }
  const intRexp = /^[0-1][0-9,]*$/
  const mRexp = /^1[3-9][0-9]\d{8}$/
  if (!(intRexp.test(value))) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    const arr = value.split(',')
    if (arr.length > 10) {
      callback(new Error('最大支持10个手机号码'))
    }
    arr.map((item) => {
      if (!(mRexp.test(item))) {
        callback(new Error('请输入正确的手机号码，使用英文逗号 “ , ” 隔开'))
      }
    })
  }
  callback()
}

// 验证不超过3个手机号码的组成字符串   示例: 18612345678,13312345678
export const validatePhoneLenThree = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value === '' || value == null) {
    callback()
  }
  const intRexp = /^[0-1][0-9,]*$/
  const mRexp = /^1[3-9][0-9]\d{8}$/
  if (!(intRexp.test(value))) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    const arr = value.split(',')
    if (arr.length > 3) {
      callback(new Error('最大支持3个手机号码'))
    }
    arr.map((item) => {
      if (!(mRexp.test(item))) {
        callback(new Error('请输入正确的手机号码，使用英文逗号 “ , ” 隔开'))
      }
    })
  }
  callback()
}

// 验证模版内容
export const valitempContent = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value === '' || value == null) {
    callback()
  }
  // 禁止【】
  // const markExp = /^.*[【】].*$/
  // if (markExp.test(value)) {
  //   callback(new Error('不允许输入【】'))
  // }
  const first = value.indexOf('{}')
  const last = value.lastIndexOf('{}')
  if (first !== last) {
    callback(new Error('只允许一个变量存在'))
  }
  callback()
}

// 验证不超过50个手机号码的组成字符串   示例: 18612345678,13312345678
export const validatePhoneLenFifty = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value === '' || value == null) {
    callback()
  }
  const intRexp = /^[0-1][0-9,]*$/
  const mRexp = /^1[3-9][0-9]\d{8}$/
  if (!(intRexp.test(value))) {
    callback(new Error('请输入正确的手机号码，使用英文逗号 “ , ” 隔开'))
  } else {
    const arr = value.split(',')
    if (arr.length > 50) {
      callback(new Error('最大支持50个手机号码'))
    }
    arr.map((item) => {
      if (!(mRexp.test(item))) {
        callback(new Error('请输入正确的手机号码，使用英文逗号 “ , ” 隔开'))
      }
    })
  }
  callback()
}

// 验证不限数手机号码的组成字符串   示例: 18612345678,13312345678
export const validatePhoneInfinity = (rule, value, callback) => {
  // 不验证是否为空，配合其他规则验证
  if (value === '' || value == null) {
    callback()
  }
  const intRexp = /^[0-1][0-9,]*$/
  const mRexp = /^1[3-9][0-9]\d{8}$/
  if (!(intRexp.test(value))) {
    callback(new Error('请输入正确的手机号码，使用英文逗号 “ , ” 隔开'))
  } else {
    const arr = value.split(',')
    arr.map((item) => {
      if (!(mRexp.test(item))) {
        callback(new Error('请输入正确的手机号码，使用英文逗号 “ , ” 隔开'))
      }
    })
  }
  callback()
}
