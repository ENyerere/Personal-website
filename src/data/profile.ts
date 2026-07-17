// 个人基本信息数据
export interface Profile {
  name: string
  role: string
  avatar: string
  about: string
}

export const profile: Profile = {
  name: '姚沈峄',
  role: 'Student',
  avatar: '/img/头像.JPG',
  about: 'Welcome to my personal introduction page, I am Yao Shenyi, a nobody from Zhejiang Vocational College of Economics and Trade.',
}
