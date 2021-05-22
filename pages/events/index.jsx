import Layout from '@/components/common/Layout'
import EventItem from '@/components/Event/EventItem'
import axios from 'axios'
import { API_URL_EVENTS } from '@/config/API'

const EventsPage = ({ events }) => {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}

export default EventsPage

export const getStaticProps = async () => {
    const data = await axios.get(API_URL_EVENTS).then((resp) => resp.data.data)

    return {
        props: {
            events: data,
        },
        revalidate: 1,
    }
}
