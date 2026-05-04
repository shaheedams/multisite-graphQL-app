import './contact.css';

interface Contact {
    heading: string;
    button: { link: string, name: string };
}

export const Contact = ({ heading, button }: Contact) => {
    return (
        <div className='contact'>
            <div className="ctm-container">
                <div className="contact-container">
                    <div className="heading">{heading}</div>
                    <a className="contactCta" href={button?.link} target="_blank" rel="noopener noreferrer">
                        {button?.name}
                    </a>
                </div>
            </div>
        </div>
    )
}