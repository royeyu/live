import { dictGetByCode } from '@/api/system'

export const data = {
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      // fileUrl: 'http://192.168.3.178:18080/file/upload',
      fileUrl: process.env.VUE_APP_UPLOAD_API,
      tableData: [],
      generateDate: null,
      listLoading: false,
      subloading: false,
      statusListText: [
        {
          label: '审核通过',
          value: '1'
        },
        {
          label: '审核不通过',
          value: '-1'
        }
      ],
      marketingCenterStatus: [
        {
          label: '未审核',
          value: 0
        },
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '审核不通过',
          value: 2
        },
        {
          label: '发送中',
          value: 3
        },
        {
          label: '已发送',
          value: 4
        },
        {
          label: '发送失败',
          value: 5
        }
      ],
      batchMessageStatus: [
        {
          label: '未审核',
          value: 99
        },
        {
          label: '审核通过',
          value: 0
        },
        {
          label: '审核未通过',
          value: -100
        }
      ],
      batchMessageStatusTextList: [
        {
          label: '审核通过',
          value: 0
        },
        {
          label: '审核不通过',
          value: -100
        }
      ],
      businessStatusOption: [
        {
          label: '挂机短信',
          value: 1
        },
        {
          label: '来电名片',
          value: 2
        }
      ],
      bannerTypeLIstOption: [],
      businessChildStatusOption: [],
      productTypeOption: [
        {
          label: '云市场',
          value: '1'
        },
        {
          label: 'CBSS产品',
          value: '2'
        },
        {
          label: '第三方接口',
          value: '3'
        },
        {
          label: '沃创新产品',
          value: '4'
        }
      ],
      productTypeChildOption: [
        {
          label: '微信产品',
          value: '1'
        },
        {
          label: 'CBSS产品',
          value: '2'
        },
        {
          label: '增值业务网关',
          value: '3'
        },
        {
          label: '本网体验',
          value: '4'
        },
        {
          label: '云市场',
          value: '5'
        }
      ],
      productNameOption: [
        {
          label: '产品1',
          value: '1'
        },
        {
          label: '产品2',
          value: '2'
        },
        {
          label: '产品3',
          value: '3'
        },
        {
          label: '产品4',
          value: '4'
        }
      ],
      businessTypeOption: [
        {
          label: '已开通',
          value: '1'
        },
        {
          label: '已退订',
          value: '4'
        },
        {
          label: '停用中',
          value: '2'
        },
        {
          label: '退订次月生效',
          value: '3'
        }
      ],
      customerStatusOption: [
        {
          label: '审核通过',
          value: '2'
        },
        {
          label: '审核不通过',
          value: '-1'
        },
        {
          label: '审核中',
          value: '1'
        },
        {
          label: '未提交',
          value: '99'
        }
      ],
      customerDataOption: [],
      numberProductTypeOption: [
        {
          label: '全部',
          value: null
        },
        {
          label: 'CBSS',
          value: '1'
        }, {
          label: '微信',
          value: '2'
        }, {
          label: '云市场',
          value: '3'
        }
      ],
      examineGroup: [],
      adminOption: [
        {
          label: '账户1',
          value: '1'
        }
      ],
      numberAddBusinessTypeOPtion: [
        {
          label: '挂机短信',
          value: 1
        },
        {
          label: '来电名片',
          value: 2
        },
        {
          label: '反诈名片',
          value: 5
        },
        {
          label: '数字来显',
          value: 6
        }
      ],
      examineTypeOption: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '未审核',
          value: 99
        },
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '审核未通过',
          value: -1
        }
      ],
      examineDelFormStatusOption: [
        {
          label: '审核通过',
          value: '1'
        },
        {
          label: '审核中',
          value: '2'
        }
      ],
      numberBusinessTypeOptionAll: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '挂机短信',
          value: 1
        },
        {
          label: '来电名片',
          value: 2
        }
      ],
      bannerSourceOption: [
        {
          label: '联通助理h5',
          value: 1
        },
        {
          label: '虚商h5',
          value: 2
        },
        {
          label: '虚商小程序',
          value: 3
        }
      ],
      bannerShowPosition: [
        {
          label: '专题推荐',
          value: 1
        },
        {
          label: '热门模块',
          value: 2
        }
      ],
      templateInfoList: [
        {
          label: '文本信息',
          value: 1
        },
        {
          label: '数字信息',
          value: 2
        }
      ],
      relationStatusOption: [
        {
          label: '未关联',
          value: '1'
        },
        {
          label: '已关联',
          value: '2'
        }
      ],
      relationTemplateformStatusOption: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '公共模板',
          value: 1
        },
        {
          label: '自定义模板',
          value: 2
        }
      ],
      msgTemplateOption: [
        {
          label: '普通短信',
          value: 1
        },
        {
          label: '群发短信',
          value: 2
        }
      ],
      flashShortShStatus: [
        {
          label: '未审核',
          value: '99'
        },
        {
          label: '初审通过',
          value: '1'
        },
        {
          label: '复审通过',
          value: '2'
        },
        {
          label: '初审不通过',
          value: '-1'
        },
        {
          label: '复审不通过',
          value: '-2'
        }
      ],
      flashShortType: [
        {
          label: '公共模板',
          value: 1
        },
        {
          label: '自定义模板',
          value: 2
        }
      ],
      flashShortContent: [
        {
          label: '单位名称',
          value: 1
        },
        {
          label: '用户姓名',
          value: 2
        },
        {
          label: '业务号码',
          value: 3
        }
      ],
      flashShortMsgType: [
        {
          label: '普通短信',
          value: 1
        },
        {
          label: '数字短信',
          value: 2
        },
        {
          label: '三网闪信',
          value: 3
        }
      ],
      signatureStatus: [
        {
          label: '审核中',
          value: '0'
        },
        {
          label: '初审通过',
          value: '1'
        },
        {
          label: '复审通过',
          value: '2'
        },
        {
          label: '初审不通过',
          value: '-1'
        },
        {
          label: '复审不通过',
          value: '-2'
        }
      ],
      swOption: [
        {
          label: '企业名片异网短信',
          value: '1'
        },
        {
          label: '行业短信',
          value: '2'
        }
      ],
      flashShorttemplateadmin: [],
      basicsSetOption: [
        {
          label: '暂停',
          value: 0
        },
        {
          label: '启动',
          value: 1
        },
        {
          label: '结束',
          value: 2
        }
      ],
      basicsSetObject: [
        {
          label: '移网',
          value: 1
        },
        {
          label: '固网',
          value: 2
        }
      ],
      basicsRuleObject: [
        {
          label: '全部业务号码',
          value: 1
        },
        {
          label: '群组号码',
          value: 2
        }
      ],
      basicsSetGroup: [],
      basicsSetFrequency: [
        {
          label: '一日一次',
          value: 1
        },
        {
          label: '一周一次',
          value: 7
        },
        {
          label: '一月一次',
          value: 30
        },
        {
          label: '不限频次',
          value: 0
        }
      ],
      basicsSetMechanism: [
        {
          label: '按任务触发',
          value: 1
        },
        {
          label: '按号码触发',
          value: 2
        }
      ],
      basicsSetNettype: [
        {
          label: '三网',
          value: '1'
        },
        {
          label: '联通',
          value: '2'
        }
      ],
      basicsSetNumbertype: [
        {
          label: '移网',
          value: '1'
        },
        {
          label: '固网',
          value: '2'
        }
      ],
      basicsSetCycle: [
        {
          label: '星期一',
          value: '1'
        },
        {
          label: '星期二',
          value: '2'
        },
        {
          label: '星期三',
          value: '3'
        },
        {
          label: '星期四',
          value: '4'
        },
        {
          label: '星期五',
          value: '5'
        },
        {
          label: '星期六',
          value: '6'
        },
        {
          label: '星期日',
          value: '7'
        }
      ],
      productType: [
        {
          label: '全部',
          value: null
        },
        {
          label: 'CBSS产品',
          value: '2'
        },
        {
          label: '微信产品',
          value: '3'
        }
      ],
      productTypeChanPin: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '微信产品',
          value: 1
        },
        {
          label: 'CBSS产品',
          value: 2
        },
        {
          label: '增值业务网关',
          value: 3
        },
        {
          label: '本网体验',
          value: 4
        },
        {
          label: '云市场',
          value: 5
        },
        {
          label: '企业名片',
          value: 6
        },
        {
          label: '渠道产品',
          value: 7
        },
        {
          label: '接口产品',
          value: 8
        },
        {
          label: '虚商产品',
          value: 9
        },
        {
          label: '权益产品',
          value: 10
        },
        {
          label: '沃创新产品',
          value: 11
        },
        {
          label: '沃运维产品',
          value: 12
        }
      ],
      tongDaoStatus: [
        {
          label: '全部',
          value: null
        },
        {
          label: '三网闪信通道',
          value: '2'
        },
        {
          label: '仿真短信通道',
          value: '3'
        }
      ],
      signStatus: [
        {
          label: '签约成功',
          value: '1'
        },
        {
          label: '解约成功',
          value: '2'
        },
        {
          label: '签约中',
          value: '3'
        },
        {
          label: '解约中',
          value: '4'
        },
        {
          label: '签约失败',
          value: '5'
        },
        {
          label: '解约失败',
          value: '6'
        }
      ],
      youXiaoZhouQi: [
        {
          label: '长期',
          value: 0
        },
        {
          label: '一个月',
          value: 1
        },
        {
          label: '二个月',
          value: 2
        },
        {
          label: '三个月',
          value: 3
        },
        {
          label: '四个月',
          value: 4
        },
        {
          label: '五个月',
          value: 5
        },
        {
          label: '六个月',
          value: 6
        },
        {
          label: '七个月',
          value: 7
        },
        {
          label: '八个月',
          value: 8
        },
        {
          label: '九个月',
          value: 9
        },
        {
          label: '十个月',
          value: 10
        },
        {
          label: '十一个月',
          value: 11
        },
        {
          label: '十二个月',
          value: 12
        }
      ],
      shengXiaoLeiXing: [
        {
          label: '当月生效',
          value: 1
        },
        {
          label: '次月生效',
          value: 2
        }
      ],
      jiFeiFangShi: [
        {
          label: '自然月',
          value: '1'
        },
        {
          label: '按有效周期',
          value: '2'
        }
      ],
      moRenTongDao: [
        {
          label: '三网闪信通道',
          value: '2'
        },
        {
          label: '仿真短信通道',
          value: '3'
        }
      ],
      keYiTongDao: [
        {
          label: '101907闪信',
          value: '2'
        },
        {
          label: '三网闪信通道',
          value: '3'
        },
        {
          label: '企业名片本网闪信',
          value: '4'
        }
      ],
      sendDetailsStatus: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未发送',
          value: 99
        },
        {
          label: '已发送',
          value: 0
        },
        {
          label: '发送失败',
          value: -100
        }
      ],
      userStatusOption: [
        {
          label: '全部',
          value: null
        },
        {
          label: '启用',
          value: '1'
        },
        {
          label: '禁用',
          value: '2'
        }
      ],
      userStatusOPtion: [
        {
          label: '全部',
          value: null
        },
        {
          label: '已拒绝',
          value: '1'
        },
        {
          label: '已通过',
          value: '2'
        },
        {
          label: '审核中',
          value: '3'
        }
      ],
      dataSourcesOption: [
        {
          label: '云市场',
          value: '1'
        },
        {
          label: '本网体验',
          value: '2'
        },
        {
          label: '接口产品',
          value: '3'
        }
      ],
      auditStatus: [
        {
          label: '审核通过',
          value: '2'
        },
        {
          label: '审核不通过',
          value: '-1'
        }
      ],
      provinceOption: [],
      areaOption: [],
      infoSourceOption: [
        {
          label: '手工创建',
          value: '0'
        },
        {
          label: '微信',
          value: '1'
        },
        {
          label: 'CBSS',
          value: '2'
        },
        {
          label: '增值业务网关',
          value: '3'
        }
      ],
      templateKeyOption: [
        {
          label: '单位名称',
          value: 'name'
        },
        {
          label: '用户姓名',
          value: 'username'
        },
        {
          label: '业务号码',
          value: 'phone'
        }
      ],
      weekList: [
        { value: 1, label: '周一' },
        { value: 2, label: '周二' },
        { value: 3, label: '周三' },
        { value: 4, label: '周四' },
        { value: 5, label: '周五' },
        { value: 6, label: '周六' },
        { value: 7, label: '周日' }
      ],
      feedbackReplyStatusList: [
        { value: null, label: '全部' },
        { value: 0, label: '未回复' },
        { value: 1, label: '已回复' }
      ],
      feedbackChannelList: [
        { value: null, label: '全部' },
        { value: 1, label: '微信H5' },
        { value: 2, label: '手厅APP' }
      ],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  computed: {},
  methods: {
    stringText(text) {
      return String(text)
    },
    // 通过字典类型编码获取字典数据
    dictGetByCodeData(dictCode) {
      return new Promise(resolve => {
        dictGetByCode({ dictCode: dictCode }).then(res => {
          res.data.filter(item => {
            item.label = item.itemText
            try {
              item.value = Number(item.itemValue)
            } catch {
              item.value = item.itemValue
            }
            return item
          })
          resolve(res.data)
        })
      })
    },
    successData(type) {
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
      if (!type) {
        this.fetchData()
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    filterName(val, arr) {
      if (val != null) {
        const items = arr.find(item => {
          return val == item.value
        })
        if (items) {
          return items.label
        }
      }
    },
    filterTypeId(val, arr) {
      if (val != null) {
        const items = arr.find(item => {
          return val == item.typeId
        })
        if (items) {
          return items.typeName
        }
      }
    },
    searchData() {
      this.page.pageNum = 1
      this.fetchData()
    },

    changePage(val) {
      this.page.pageNum = val.page
      this.page.pageSize = val.limit
      this.fetchData()
    },
    goReturn() {
      this.$router.go(-1)
    },
    goTo(path, query) {
      if (!path) {
        return
      }
      const par = {
        ...this.appform,
        ...this.page,
        generateDate: this.generateDate
      }
      // console.log( query)
      this.$store.dispatch('app/setinspectSchema', par)
      this.$router.push({
        path: path,
        query: query
      })
    },
    // 限制大小
    beforeUpload(file, filemaxsize) {
      const FileMaxSize = filemaxsize ==null ? 10 : filemaxsize
      // console.log(FileMaxSize)
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < FileMaxSize
      if (!isJPG) {
        this.$message.error('上传文件仅支持JPG、PNG格式')
      }
      if (!isLt2M) {
        this.$message.error(`上传文件大小不能超过${FileMaxSize}M`)
      }
      return isLt2M && isJPG
    },
    changeFile(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreviewUrl(url) {
      if (url == '' || url == null) {
        this.$message.error('没有图片')
        return
      }
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    remopveFile(file, fileList, ref) {
      // console.log(file, fileList)
      fileList.filter(item => {
        if (item.response) {
          item.url = item.response.data.url
        }
        return item
      })
      this.customerForm[ref] = fileList
      // console.log(this.customerForm[ref])
    },
    // 数字信息素材限制
    beforeUploadTemplate(file) {
      // console.log(file)
      const isIMAGE = (file.type === 'image/jpg') || (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
      const isVIDEO = (file.type === 'video/mp4') || (file.type === 'video/3gp')
      const isAUDIO = (file.type === 'audio/mp3') || (file.type === 'audio/wav') || (file.type === 'audio/mpeg')
      const inSize = file.size / 1024 / 1024 < 1.9
      if (file.type.indexOf('image') != -1 && !isIMAGE) {
        this.$message.error('上传图片文件仅支持JPG、JPEG、PNG、GIF格式')
        return false
      }
      if (file.type.indexOf('video') != -1 && !isVIDEO) {
        this.$message.error('上传视频文件仅支持MP4、3GP格式')
        return false
      }
      if (file.type.indexOf('audio') != -1 && !isAUDIO) {
        this.$message.error('上传音频文件仅支持MP3、WAV格式')
        return false
      }
      if (!inSize) {
        this.$message.error('上传文件大小不能超过1.9MB')
        return false
      }
      return true
    },
    // 超出上传数量提示
    handleExceed(files, fileList, ref) {
      this.$message.error('上传数量限制，请先删除已上传文件')
      // console.log(files)
      // this.$set(fileList[0], 'raw', files[0])
      // this.$set(fileList[0], 'name', files[0].name)
      // this.$refs[ref].clearFiles() // 清除文件
      // this.$refs[ref].handleStart(files[0]) // 选择文件后的赋值方法
    },
    // 匹配发送频率
    resolvedFreq(val) {
      const list = this.basicsSetFrequency.filter((item) => {
        return item.value == val
      })
      if (list.length > 0) {
        return list[0].label
      } else {
        return 'ERROR'
      }
    },
    // 匹配发送时间段
    resolvedHour(str) {
      let strs = str.replace('-', '时 - ')
      strs += '时'
      return strs
    },
    // 匹配发送周期
    resolvedWeek(str) {
      let liststr = ''
      let totalweek = 0
      this.weekList.map((item) => {
        if (str.indexOf(item.value) != -1) {
          liststr += item.label + ','
          totalweek++
        }
      })
      if (totalweek == 7) {
        return liststr = '全周'
      } else {
        return liststr = liststr.slice(0, -1)
      }
    },
    // 登录为系统用户
    isSystem() {
      return this.$store.state.user.type === 'system'
    },
    // 登录为云市场用户
    isYunCustomer() {
      return this.$store.state.user.type === 'customer' && this.$store.state.user.cust == 5
    }
  }
}
