import styles from '@/styles/EventItem.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const EventItem = ({ evt }) => {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={evt.image || '/images/event-default.png'} width={170} height={100} />
            </div>
            <div className={styles.info}>
                <span>
                    {evt.date} at {evt.time}
                </span>
            </div>

            <div>
                <Link href={`/events/${evt.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    )
}

export default EventItem
