import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ecommerce-a8a02.firebaseio.com/contacts.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Data submitted successfully!');
                setFormData({ name: '', email: '', tel: '' });
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error storing data: ', error);
            alert('Error storing data!');
        }
    };

    return (
        <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label htmlFor="name" className="hidden">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col mt-2">
                <label htmlFor="tel" className="hidden">Number</label>
                <input
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Telephone Number"
                    value={formData.tel}
                    onChange={handleChange}
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
            >
                Submit
            </button>
        </form>
    );
}
