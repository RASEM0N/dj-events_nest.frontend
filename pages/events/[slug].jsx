import React from 'react'
import Layout from '@/components/common/Layout'
import axios from 'axios'
import { API_URL_EVENTS } from '@/config/API'
import styles from '@/styles/Event.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const EventPage = ({ evt }) => {
    const deleteEvent = () => {
        console.log('delete event')
    }

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            {/*<FaPencilAlt /> */}
                            Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        {/*<FaTimes /> */}
                        Delete Event
                    </a>
                </div>

                <span>
                    {new Date(evt.date).toLocaleDateString('ru-RU')} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                {evt.image && (
                    <div className={styles.image}>
                        <Image
                            src={evt.image?.formats?.medium?.url || '/images/event-default.png'}
                            width={960}
                            height={600}
                        />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                <Link href="/events">
                    <a className={styles.back}>{'<'} Go Back</a>
                </Link>
            </div>
        </Layout>
    )
}

export default EventPage

// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async () => {
    const data = await axios.get(API_URL_EVENTS).then((resp) => resp.data)

    const paths = data.map((evt) => ({
        params: {
            slug: evt.slug,
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const data = await axios.get(API_URL_EVENTS + `?slug=${slug}`).then((resp) => resp.data)
    console.log(slug)
    return {
        props: {
            evt: data[0],
        },
        revalidate: 1,
    }
}
