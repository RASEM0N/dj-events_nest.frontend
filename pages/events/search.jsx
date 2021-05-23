import Layout from '@/components/common/Layout'
import EventItem from '@/components/Event/EventItem'
import { useRouter } from 'next/router'
import Link from 'next/link'
import qs from 'qs'
import axios from 'axios'
import { API_URL_EVENTS } from '@/config/API'

const SearchPage = ({ events }) => {
    const router = useRouter()

    return (
        <Layout title="Search Results">
            <Link href="/events">Go back</Link>
            <h1>Search Results from {router.query.term}</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}

export default SearchPage

export const getServerSideProps = async ({ query: { term } }) => {
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers_contains: term },
                { description_contains: term },
                { venue_contains: term },
            ],
        },
    })

    const data = await axios.get(API_URL_EVENTS + `?${query}`).then((resp) => resp.data)

    return {
        props: {
            events: data,
        },
    }
}
