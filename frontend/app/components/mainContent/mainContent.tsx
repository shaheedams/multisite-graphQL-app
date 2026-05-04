import './mainContent.css'
interface MainContent {
    heading: string;
    content: string;
    subHeading?: string[];
}

export const MainContent = ({ heading, content, subHeading }: MainContent) => {
    return (
        <section className="mainContent">
            <div className="ctm-container">
                <h2 className="heading">{heading}</h2>
                <div className="content">{content}</div>
                {(subHeading && subHeading?.length > 0) && (<div className="subHeading">
                    {
                        subHeading.map((t) => {
                            return <div className="sub" key={t?.trim()}>{t}</div>
                        })
                    }
                </div>)}
            </div>
        </section>
    )
}