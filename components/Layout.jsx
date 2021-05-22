import Head from 'next/head'
import Header from './Header'
import styles from '../styles/Layout.module.scss'
import Footer from './Footer'

const Layout = ({
    title = 'DJ Events',
    keywords = 'music, dj, events',
    description = 'Welcome to DJ events',
    children,
}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Header />
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
