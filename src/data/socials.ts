// 社交链接数据
export interface Social {
  icon: string
  label: string
  url: string
}

export const socials: Social[] = [
  {
    icon: 'fab fa-bilibili',
    label: 'Bilibili',
    url: 'https://space.bilibili.com/438589744',
  },
  {
    icon: 'fab fa-github',
    label: 'GitHub',
    url: 'https://github.com/ENyerere',
  },
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    url: 'mailto:yaoshenyi@outlook.com',
  },
]
