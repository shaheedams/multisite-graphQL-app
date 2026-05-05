import mongoose from "mongoose";
import { connectDB } from "../config/db";
import { SiteModel } from "../models/Site.model";

async function seed() {
    await connectDB();

    // Clean DB 
    await SiteModel.deleteMany({});
    console.log("DB cleared");

    // Add site data 
    await SiteModel.insertOne({
        "siteId": "multisite_home_001",
        "brandName": "MultiSite 001",
        "languages": {
            "en": {
                "nav": {
                    "links": [
                        {
                            "link": "/",
                            "name": "Link 1",
                        },
                        {
                            "link": "/",
                            "name": "Link 2",
                        },
                        {
                            "link": "/",
                            "name": "Link 3",
                        }
                    ]
                },
                "component_1": {
                    "headline": "Get the edge. Make the cut.",
                    "body": "From marketing physical goods to memorable immersive VR experiences, from conventional classroom based training to high impact VR Simulators, from limited resources to rapid scaling, from being one of many to domain expertise. With RRD GO Creative, now you can take your business to the next level. Are you ready to take the leap"
                },
                "component_2": {
                    "headline": "Click here to connect with us",
                    "button": {
                        "link": "/",
                        "name": "Contact us",
                    }
                },
                "component_3": {
                    "headline": "Expertspeak marketing",
                    "body": "The momentum behind immersive solutions in Enterprise companies is undeniable. From Fortune 500 giants to emerging startups, organizations across industries recognize the profound impact that immersive technologies can have on their bottom line.",
                    "tags": [
                        "ct1",
                        "ct2",
                        "ct3"
                    ]
                },
                "footer": {
                    "footer": "From limited resources to rapid scaling, from being one of many to domain expertise. With RRD GO Creative, now you can take your business to the next level. Are you ready to take the leap"
                },
            },
            "es": {
                "nav": {
                    "links": [
                        {
                            "link": "/",
                            "name": "Enlace 1",
                        },
                        {
                            "link": "/",
                            "name": "Enlace 2",
                        },
                        {
                            "link": "/",
                            "name": "Enlace 3",
                        }
                    ]
                },
                "component_1": {
                    "headline": "Obtenga la ventaja. Marque la diferencia.",
                    "body": "Desde el marketing de bienes físicos hasta experiencias memorables de realidad virtual inmersiva, desde la formación convencional en el aula hasta simuladores de realidad virtual de alto impacto, desde recursos limitados hasta un escalado rápido, pasando de ser uno más a tener experiencia en el dominio. Con RRD GO Creative, ahora puede llevar su negocio al siguiente nivel. ¿Está listo para dar el sal"
                },
                "component_2": {
                    "headline": "Haga clic aquí para conectar con nosotros",
                    "button": {
                        "link": "/",
                        "name": "Contáctenos",
                    }
                },
                "component_3": {
                    "headline": "Marketing Expertspeak",
                    "body": "El impulso detrás de las soluciones inmersivas en las empresas es innegable. Desde los gigantes de Fortune 500 hasta las startups emergentes, las organizaciones de todos los sectores reconocen el profundo impacto que las tecnologías inmersivas pueden tener en sus resultados.",
                    "tags": [
                        "ct1",
                        "ct2",
                        "ct3"
                    ]
                },
                "footer": {
                    "footer": "De recursos limitados a un escalado rápido, de ser uno más a la experiencia en el dominio. Con RRD GO Creative, ahora puede llevar su negocio al siguiente nivel. ¿Está listo para dar el salto"
                },
            },
            "fr": {
                "nav": {
                    "links": [
                        {
                            "link": "/",
                            "name": "Lien 1",
                        },
                        {
                            "link": "/",
                            "name": "Lien 2",
                        },
                        {
                            "link": "/",
                            "name": "Lien 3",
                        }
                    ]
                },
                "component_1": {
                    "headline": "Prenez l'avantage. Marquez la différence.",
                    "body": "Du marketing des biens physiques aux expériences de réalité virtuelle immersives mémorables, de la formation classique en salle aux simulateurs VR à fort impact, des ressources limitées à une croissance rapide, de l'anonymat à l'expertise métier. Avec RRD GO Creative, vous pouvez désormais propulser votre entreprise au niveau supérieur. Êtes-vous prêt à faire le saut "
                },
                "component_2": {
                    "headline": "Cliquez ici pour nous contacter",
                    "button": {
                        "link": "/",
                        "name": "Contactez-nous",
                    }
                },
                "component_3": {
                    "headline": "Marketing Expertspeak",
                    "body": "L'élan derrière les solutions immersives dans les grandes entreprises est indéniable. Des géants du Fortune 500 aux startups émergentes, les organisations de tous les secteurs reconnaissent l'impact profond que les technologies immersives peuvent avoir sur leur rentabilité.",
                    "tags": [
                        "ct1",
                        "ct2",
                        "ct3"
                    ]
                },
                "footer": {
                    "footer": "Des ressources limitées à une croissance rapide, de l'anonymat à l'expertise métier. Avec RRD GO Creative, vous pouvez désormais propulser votre entreprise au niveau supérieur. Êtes-vous prêt à faire le saut "
                },
            }
        },
    });

    console.log("Data added successfully");

    mongoose.disconnect();
}

seed().catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
})