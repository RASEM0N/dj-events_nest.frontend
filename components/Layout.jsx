import Head from 'next/head'
import Header from './Header'
import styles from '@/styles/Layout.module.scss'
import Footer from './Footer'
import Showcase from './Showcase'
import { useRouter } from 'next/router'

const Layout = ({
    title = 'DJ Events',
    keywords = 'music, dj, events',
    description = 'Welcome to DJ events',
    children,
}) => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Header />
            {router.pathname === '/' && <Showcase />}
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
