import Head from 'next/head'

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
            <div>{children}</div>
        </div>
    )
}

export default Layout
