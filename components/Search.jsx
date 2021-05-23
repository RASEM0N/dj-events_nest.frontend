import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '@/styles/Search.module.scss'

const Search = () => {
    const [text, setText] = useState('')

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/events/search?term=${text}`)
    }

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search Events"
                />
            </form>
        </div>
    )
}

export default Search
