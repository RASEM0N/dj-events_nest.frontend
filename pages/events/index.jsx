import Layout from '@/components/common/Layout'
import EventItem from '@/components/Event/EventItem'
import Link from 'next/link'
import axios from 'axios'
import { API_URL_EVENTS } from '@/config/API'

const EventsPage = ({ events, length, page }) => {
    const lastPage = Math.ceil(length / 3)

    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}

            {page > 1 && (
                <Link href={`/events?page=${page - 1}`}>
                    <a className="btn-secondary">Prev</a>
                </Link>
            )}
            {page < lastPage && (
                <Link href={`/events?page=${page + 1}`}>
                    <a className="btn-secondary">Next</a>
                </Link>
            )}
        </Layout>
    )
}

export default EventsPage

export const getServerSideProps = async ({ query: { page = 1 } }) => {
    const start = +page === 1 ? 0 : (+page - 1) * 3

    const length = await axios.get(API_URL_EVENTS + `/count`).then((resp) => resp.data)

    const data = await axios
        .get(API_URL_EVENTS + `?_sort=date:ASC&_limit=${3}&_start=${start}`)
        .then((resp) => resp.data)

    return {
        props: {
            events: data,
            page: +page,
            length: length,
        },
    }
}
