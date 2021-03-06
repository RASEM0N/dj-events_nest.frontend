import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/common/Layout'
import { API_URL_EVENTS } from '@/config/API'
import styles from '@/styles/Add.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import moment from 'moment'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

const EditEventPage = ({ evt }) => {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        addres: evt.addres,
        date: evt.date,
        time: evt.time,
        description: evt.description,
    })
    const [imagePreview, setImagePreview] = useState(evt.image?.formats?.thumbnail?.url || null)
    const [showModel, setShowModel] = useState(false)

    const imageUploaded = async (e) => {
        const res = await fetch(API_URL_EVENTS + `/${evt.id}`)
        const data = await res.json()

        setImagePreview(data.image?.formats?.thumbnail?.url)
        setShowModel(false)
    }

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const hasEmptyFields = Object.values(values).some((element) => element === '')

        if (hasEmptyFields) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(API_URL_EVENTS + `/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            toast.error('Something Went Wrong')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return (
        <Layout title="Add New Event">
            <Link href="/events">Go Back</Link>
            <h1>Edit Event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input
                            type="text"
                            name="performers"
                            id="performers"
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            id="venue"
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="addres"
                            id="addres"
                            value={values.addres}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={moment(values.date).format('yyyy-MM-DD')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input
                            type="text"
                            name="time"
                            id="time"
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description">Event Description</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type="submit" value="Update Event" className="btn" />
            </form>

            <h2>Event image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
            ) : (
                <div>
                    <p>No image uploaded</p>
                </div>
            )}
            <div>
                <button className="btn-secondary" onClick={() => setShowModel(true)}>
                    Upload Image
                </button>
            </div>
            <Modal show={showModel} onClose={() => setShowModel(false)}>
                <ImageUpload imageUploaded={imageUploaded} evtId={evt.id} />
            </Modal>
        </Layout>
    )
}

export default EditEventPage

export const getServerSideProps = async ({ params: { id } }) => {
    const data = await axios.get(API_URL_EVENTS + `/${id}`).then((resp) => resp.data)
    return {
        props: {
            evt: data,
        },
    }
}
