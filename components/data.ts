import type { BadgeProps, TagProps } from 'naive-ui'

export interface ListItem {
  id: string
  avatar: string
  title: string
  datetime: string
  type: string
  read?: boolean
  description?: string
  extra?: string
  color?: TagProps['type']
}

export interface TabItem {
  key: string
  name: string
  badgeType?: BadgeProps['type']
  list: ListItem[]
  unreadlist?: ListItem[]
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: 'Notification',
    list: [
      {
        id: '000000001',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'Have you received the 14 A new weekly',
        datetime: '2022-08-09',
        type: '1',
      },
      {
        id: '000000002',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title:
          'Would you recommend the Roberts has passed the third round of the interview',
        datetime: '2022-08-08',
        type: '1',
      },
      {
        id: '000000003',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title:
          'This template can distinguish between a variety of notification type',
        datetime: '2022-08-07',
        type: '1',
      },
      {
        id: '000000004',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title:
          'On the left side of the ICONS are used to distinguish between different types',
        datetime: '2022-08-07',
        type: '1',
      },
      {
        id: '000000005',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title:
          'Title can set up automatic display ellipses, in this case, the title line number is set to 1, if the content is more than 1 line automatic truncation and support tooltip displays full title.',
        datetime: '2022-08-07',
        type: '1',
      },
    ],
  },
  {
    key: '2',
    name: 'Messages',
    badgeType: 'info',
    list: [
      {
        id: '000000006',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Sally cricket comment on you',
        description:
          'Describe information description information description information',
        datetime: '2017-08-07',
        type: '2',
      },
      {
        id: '000000007',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Edwin van der SAR replied to you',
        description:
          'This template is used to remind who interact with you happened',
        datetime: '2022-08-07',
        type: '2',
      },
      {
        id: '000000008',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'title',
        description:
          'Please move the mouse to here, in order to test long messages here will be how to deal with. For this example, use the description of the maximum number of lines to 2, more than 2 lines can describe content will be omitted and through the tooltip to see full content',
        datetime: '2024-08-07',
        type: '2',
      },
    ],
  },
  {
    key: '3',
    name: 'To-Do',
    badgeType: 'success',
    list: [
      {
        id: '000000009',
        avatar: '',
        title: 'The name of the task',
        description: 'Tasks need to be started before the 2017-01-12 PM',
        datetime: '',
        extra: 'Not at the',
        color: 'default',
        type: '3',
      },
      {
        id: '000000010',
        avatar: '',
        title: 'The third party code changes of emergency',
        description:
          'Edwin van der SAR must be completed before the 2023-01-07 code changes',
        datetime: '',
        extra: 'Due immediately',
        color: 'error',
        type: '3',
      },
      {
        id: '000000011',
        avatar: '',
        title: 'Information security test',
        description:
          'Finish update assigned stephens in 2022-01-09 and released',
        datetime: '',
        extra: 'Have spent eight days',
        color: 'warning',
        type: '3',
      },
      {
        id: '000000012',
        avatar: '',
        title: 'The ABCD release',
        description:
          'Issued by the appointed bamboo, completed before the 2021-01-09 update and behind also added several thus increasing the length of the text',
        datetime: '',
        extra: 'ongoing',
        color: 'info',
        type: '3',
      },
    ],
  },
]
