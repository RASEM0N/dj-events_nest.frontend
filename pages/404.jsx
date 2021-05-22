// import { FaExclamationTriangle } from 'react-icons/all'
import Layout from '../components/Layout'
import Link from 'next/link'
import styles from '../styles/404.module.scss'

const NotFoundPage = () => {
    return (
        <Layout title="Page Not Found">
            <div className={styles.error}>
                <h1>
                    {/*<FaExclamationTriangle /> */}
                    404
                </h1>
                <h4>Page Not Found</h4>
                <Link href="/">Go Home</Link>
            </div>
        </Layout>
    )
}

export default NotFoundPage
