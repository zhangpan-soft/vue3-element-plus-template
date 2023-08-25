export default {
  // 路由国际化
  routes: {
    dashboard: {
      dashboard: {
        title: '首页'
      }
    },
    example: {
      title: '示例',
      table: {
        title: '表格'
      },
      tree: {
        title: '树'
      }
    },
    form: {
      form: {
        title: '表单'
      }
    },
    nested: {
      title: '路由嵌套',
      menu1: {
        title: '菜单1',
        menu1_1: {
          title: '菜单1-1'
        },
        menu1_2: {
          title: '菜单1-2',
          menu1_2_1: {
            title: '菜单1-2-1'
          },
          menu1_2_2: {
            title: '菜单1-2-2'
          }
        },
        menu1_3: {
          title: '菜单1-3'
        }
      },
      menu2: {
        title: '菜单2'
      }
    },
    externalLink: {
      externalLink: {
        title: '外链'
      }
    },
    tests: {
      test1: {
        title: '测试1'
      }
    },
    system: {
      title: '系统管理',
      settings: {
        title: '系统设置'
      }
    }
  },
  // 页面国际化
  views: {
    // 首页
    dashboard: {},
    // 表单页
    form: {
      activityName: '活动名称',
      activityType: '活动类型',
      activityTime: '活动时间',
      activityAddress: '活动地址',
      activityZone: '活动区域',
      activityZoneOptions: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        }
      ],
      activityZonePlaceholder: '请选择活动区域',
      activityTimePlaceholder: '请选择活动时间',
      instantDelivery: '即时配送',
      activityTypeChecks: [
        {
          label: '线上活动',
          value: 1
        },
        {
          label: '促销活动',
          value: 2
        },
        {
          label: '线下活动',
          value: 3
        },
        {
          label: '单纯品牌曝光',
          value: 4
        }
      ],
      resources: '资源',
      resourcesOptions: [
        {
          value: 'Sponsor',
          label: '赞助商'
        },
        {
          value: 'Venue',
          label: '场馆'
        }
      ],
      activityDesc: '活动描述',
      btn: {
        submit: '创建',
        cancel: '取消'
      },
      elMessages: {
        submit: '提交!',
        cancel: '取消!'
      }
    },
    // 登录页
    login: {
      title: '登 录',
      usernamePlaceholder: '请输入用户名',
      passwordPlaceholder: '请输入密码',
      btn: {
        login: '登 录'
      },
      tips: {
        username: '用户名:admin',
        password: '密码:任意字符'
      }
    },
    // 路由嵌套页
    nested: {
      menu1: {
        menu1_1: {},
        menu1_2: {
          menu1_2_1: {},
          menu1_2_2: {}
        },
        menu1_3: {}
      },
      menu2: {}
    },
    // 系统管理页
    system: {
      settings: {
        languageTitle: '语言偏好',
        currentLanguage: '当前语言',
        languageOptions: [
          {
            value: 'zh-cn',
            label: '简体中文'
          },
          {
            value: 'en',
            label: '英文'
          }
        ],
        changeLanguage: '切换语言'
      }
    },
    // 表格
    table: {
      id: 'ID',
      title: '标题',
      author: '作者',
      pageviews: '浏览量',
      createdAt: '创建时间',
      status: '状态'
    },
    tree: {
      filterTextPlaceholder: '筛选关键字'
    },
    notFount: {
      // The webmaster said that you can not enter this page...
      message: '站长说你不能进入这个页面。。。',
      bullshitInfo: '请检查您输入的URL是否正确，或者单击下面的按钮返回主页。',
      bullshitReturnHome: '返回首页'
    }
  },
  // 导航栏国际化
  navbar: {
    dashboard: '首页',
    logout: '注销',
    document: '项目文档',
    github: 'Github',
    settings: '系统设置'
  },
  language: {
    'zh-cn': '简体中文',
    en: '英文'
  }
}
