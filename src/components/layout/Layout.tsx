import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import SideBar from './SideBar'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Layout() {
  const { scrollProgressRef, backToTopVisible, scrollToTop } = useScrollAnimation()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollProgress scrollProgressRef={scrollProgressRef} />
      <Header />

      {/* 三栏 Grid 主内容区 */}
      <div className="flex-1 w-full max-w-[var(--page-width)] mx-auto px-0 md:px-4">
        <div
          id="main-grid"
          className="grid grid-cols-1 lg:grid-cols-[17.5rem_1fr] gap-4"
        >
          {/* 左栏：SideBar（pt-4 与中栏页面的 py-4 对齐，保证左右顶距一致） */}
          <aside className="mb-4 lg:mb-0 lg:row-span-2 pt-4">
            <SideBar />
          </aside>

          {/* 中栏：主内容（不可加 overflow-hidden，否则文章页 TOC 的 sticky 定位会失效） */}
          <main id="swup-container" className="min-w-0">
            <Outlet />
          </main>

          {/* Footer 跨整行 */}
          <div className="col-span-1 lg:col-span-2">
            <Footer />
          </div>
        </div>
      </div>

      <BackToTop visible={backToTopVisible} onClick={scrollToTop} />
    </div>
  )
}
