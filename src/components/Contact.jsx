import './Contact.css'
import { SendMessage } from './Icons';
import { useState } from 'react';

export function Contact(){
    const [formData, setFormData] = useState({
        fullname : '',
        email : '',
        message : ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        
        setIsSubmitting(true);
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setFormData({ fullname: '', email: '', message: '' });
        }, 1500);
    };

    const isFormValid = () => {
        return formData.fullname.trim() !== '' && formData.email.trim() !== '' && formData.message.trim() !== '';
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDisabled = !isFormValid()||isSubmitting;
    return(
        <div className="contact-page">
            <div className="contact-form">
                <h3 className='form-title'>Contact Form</h3>
                <form action="#" className='form' onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input type="text" className='form-input' name="fullname" id="" placeholder='Full Name' required value={formData.fullname} onChange={handleInputChange} />
                        <input type="email" className='form-input' name="email" id="" placeholder='Email Address' required value={formData.email} onChange={handleInputChange} />
                    </div>
                    <textarea name="message" id="" className='form-input text-area' placeholder='Your Message' value={formData.message} onChange={handleInputChange} required></textarea>
                    <a href="mailto:maheshwaranpalanisamy1@gmail.com">
                    <button className='form-btn' type='submit' disabled={isDisabled}>
                        <SendMessage />
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                    </a>
                </form>
            </div>
        </div>
    );
}