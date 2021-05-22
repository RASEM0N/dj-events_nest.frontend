import Layout from '@/components/common/Layout'
import axios from 'axios'
import { API_URL_EVENTS } from '@/config/API'
import EventItem from '@/components/Event/EventItem'
import Link from 'next/link'

const HomePage = ({ events }) => {
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
            {events.length > 0 && (
                <Link href="/events">
                    <a className="btn-secondary">View All Events</a>
                </Link>
            )}
        </Layout>
    )
}

export default HomePage

export const getStaticProps = async () => {
    const data = await axios.get(API_URL_EVENTS).then((resp) => resp.data.data)

    return {
        props: {
            events: data.slice(0, 3),
        },
        revalidate: 1,
    }
}
