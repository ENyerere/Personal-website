// 项目列表数据
export interface Project {
  title: string
  description: string
  techStack: string[]
  image: string
}

export const projects: Project[] = [
  {
    title: '易社区',
    description: '易社区旨在打造一个简洁、易用的社区平台。',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    image: '/img/头像.JPG',
  },
  {
    title: 'EAT WHAT',
    description: '完美解决大学生中饭晚饭吃什么的世纪难题。',
    techStack: ['React', 'Node.js', 'MongoDB'],
    image: '/img/头像.JPG',
  },
  {
    title: '暂无',
    description: '暂无。',
    techStack: ['Vue', 'TypeScript', 'Express'],
    image: '/img/头像.JPG',
  },
]
