export default {
  // 路由国际化
  routes: {
    dashboard: {
      dashboard: {
        title: 'Dashboard'
      }
    },
    example: {
      title: 'Example',
      table: {
        title: 'Table'
      },
      tree: {
        title: 'Tree'
      }
    },
    form: {
      form: {
        title: 'Form'
      }
    },
    nested: {
      title: 'Nested',
      menu1: {
        title: 'Menu1',
        menu1_1: {
          title: 'Menu1-1'
        },
        menu1_2: {
          title: 'Menu1-2',
          menu1_2_1: {
            title: 'Menu1-2-1'
          },
          menu1_2_2: {
            title: 'Menu1-2-2'
          }
        },
        menu1_3: {
          title: 'Menu1-3'
        }
      },
      menu2: {
        title: 'Menu2'
      }
    },
    externalLink: {
      externalLink: {
        title: 'External Link'
      }
    },
    tests: {
      test1: {
        title: 'Test1'
      }
    },
    system: {
      title: 'System Management',
      settings: {
        title: 'System Settings'
      }
    }
  },
  // 页面国际化
  views: {
    dashboard: {},
    form: {
      activityName: 'Activity Name',
      activityType: 'Activity Type',
      activityTime: 'Activity Time',
      activityAddress: 'Activity Address',
      activityZone: 'Activity Zone',
      activityZoneOptions: [
        {
          value: 'beijing',
          label: 'Beijing'
        },
        {
          value: 'shanghai',
          label: 'Shanghai'
        }
      ],
      activityZonePlaceholder: 'Please select your zone',
      activityTimePlaceholder: 'Pick a time',
      instantDelivery: 'Instant Delivery',
      activityTypeChecks: [
        {
          label: 'Online Activity',
          value: 1
        },
        {
          label: 'Promotion Activity',
          value: 2
        },
        {
          label: 'Offline Activity',
          value: 3
        },
        {
          label: 'Pure Brand Exposure',
          value: 4
        }
      ],
      resources: 'Resources',
      resourcesOptions: [
        {
          value: 'Sponsor',
          label: 'Sponsor'
        },
        {
          value: 'Venue',
          label: 'Venue'
        }
      ],
      activityDesc: 'Activity Description',
      btn: {
        submit: 'Create',
        cancel: 'Cancel'
      },
      elMessages: {
        submit: 'submit!',
        cancel: 'cancel!'
      }
    },
    login: {
      title: 'Login',
      usernamePlaceholder: 'Please enter your username',
      passwordPlaceholder: 'Please enter your password',
      btn: {
        login: 'Login'
      },
      tips: {
        username: 'Username:admin',
        password: 'Password:any'
      }
    },
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
    system: {
      settings: {
        languageTitle: 'Language Preference',
        currentLanguage: 'Current Language',
        languageOptions: [
          {
            value: 'zh-cn',
            label: 'Chinese'
          },
          {
            value: 'en',
            label: 'English'
          }
        ],
        changeLanguage: 'Change Language'
      }
    },
    // 表格
    table: {
      id: 'ID',
      title: 'Title',
      author: 'Author',
      pageviews: 'Pageviews',
      createdAt: 'Created At',
      status: 'Status'
    },
    tree: {
      filterTextPlaceholder: 'Filter keyword'
    },
    notFount: {
      // The webmaster said that you can not enter this page...
      message: 'The webmaster said that you can not enter this page...',
      bullshitInfo:
        'Please check that the URL you entered is correct, or click the button below to return to the homepage.',
      bullshitReturnHome: 'Back to home'
    }
  },
  // 登录页面国际化
  login: {
    title: 'Vue3 Element Plus Template',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    verifyCode: 'Verify Code'
  },
  // 导航栏国际化
  navbar: {
    dashboard: 'Dashboard',
    logout: 'Logout',
    document: 'Document',
    github: 'Github',
    settings: 'Settings'
  },
  language: {
    'zh-cn': 'Chinese',
    en: 'English'
  }
}
