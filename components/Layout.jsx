import Head from 'next/head'
import styles from '../styles/Layout.module.scss'

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
            <div className={styles.container}>{children}</div>
        </div>
    )
}

export default Layout
