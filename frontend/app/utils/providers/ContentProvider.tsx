/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useFetch } from "../customHooks/useFetch";
import { SiteService } from "@/app/api/services/siteService";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

interface siteDataType {
    siteData: any;
    setLang: any;
    lang: string;
    loading: boolean;
}

const ContentProvider = createContext<null | siteDataType>(null);

const siteQuery = gql`
    query Site($id: String) {
        site(id: $id) {
            siteId
            brandName
            languages {
            en {
                nav {
                links {
                    link
                    name
                }
                }
                component_1 {
                headline
                body
                }
                component_2 {
                headline
                button {
                    link
                    name
                }
                }
                component_3 {
                headline
                body
                tags
                }
                footer {
                footer
                }
            }
            es {
                nav {
                links {
                    link
                    name
                }
                }
                component_1 {
                headline
                body
                }
                component_2 {
                headline
                button {
                    link
                    name
                }
                }
                component_3 {
                headline
                body
                tags
                }
                footer {
                footer
                }
            }
            fr {
                nav {
                links {
                    link
                    name
                }
                }
                component_1 {
                headline
                body
                }
                component_2 {
                headline
                button {
                    link
                    name
                }
                }
                component_3 {
                headline
                body
                tags
                }
                footer {
                footer
                }
            }
            }
        }
    }
`


export const ContentWrapper = ({ children }: { children: ReactNode }) => {

    // Method 1 for fetching data from REST API 

    // const searchParams = useSearchParams();

    // const [lang, setLang] = useState<string>(searchParams.get("ln") || 'en');

    // const { data: siteContent, loading } = useFetch(() => SiteService.getBySiteId("multisite_home_001"));


    // const siteData = useMemo(() => {
    //     // const data: any = {
    //     //     "_id": "multisite_home_001",
    //     //     "brand_name": "MultiSite",
    //     //     "languages": {
    //     //         "en": {
    //     //             "nav": {
    //     //                 "links": [
    //     //                     { "link": "/", "name": "Link 1" },
    //     //                     { "link": "/", "name": "Link 2" },
    //     //                     { "link": "/", "name": "Link 3" }
    //     //                 ]
    //     //             },
    //     //             "component_1": {
    //     //                 "headline": "Get the edge. Make the cut.",
    //     //                 "body": "From marketing physical goods to memorable immersive VR experiences, from conventional classroom based training to high impact VR Simulators, from limited resources to rapid scaling, from being one of many to domain expertise. With RRD GO Creative, now you can take your business to the next level. Are you ready to take the leap"
    //     //             },
    //     //             "component_2": {
    //     //                 "headline": "Click here to connect with us",
    //     //                 "button": { "link": "/", "name": "Contact us" }
    //     //             },
    //     //             "component_3": {
    //     //                 "headline": "Expertspeak marketing",
    //     //                 "body": "The momentum behind immersive solutions in Enterprise companies is undeniable. From Fortune 500 giants to emerging startups, organizations across industries recognize the profound impact that immersive technologies can have on their bottom line.",
    //     //                 "tags": ["ct1", "ct2", "ct3"]
    //     //             },
    //     //             "footer": {
    //     //                 "footer": "From limited resources to rapid scaling, from being one of many to domain expertise. With RRD GO Creative, now you can take your business to the next level. Are you ready to take the leap"
    //     //             }
    //     //         },
    //     //         "es": {
    //     //             "nav": {
    //     //                 "links": [
    //     //                     { "link": "/", "name": "Enlace 1" },
    //     //                     { "link": "/", "name": "Enlace 2" },
    //     //                     { "link": "/", "name": "Enlace 3" }
    //     //                 ]
    //     //             },
    //     //             "component_1": {
    //     //                 "headline": "Obtenga la ventaja. Marque la diferencia.",
    //     //                 "body": "Desde el marketing de bienes físicos hasta experiencias memorables de realidad virtual inmersiva, desde la formación convencional en el aula hasta simuladores de realidad virtual de alto impacto, desde recursos limitados hasta un escalado rápido, pasando de ser uno más a tener experiencia en el dominio. Con RRD GO Creative, ahora puede llevar su negocio al siguiente nivel. ¿Está listo para dar el sal"
    //     //             },
    //     //             "component_2": {
    //     //                 "headline": "Haga clic aquí para conectar con nosotros",
    //     //                 "button": { "link": "/", "name": "Contáctenos" }
    //     //             },
    //     //             "component_3": {
    //     //                 "headline": "Marketing Expertspeak",
    //     //                 "body": "El impulso detrás de las soluciones inmersivas en las empresas es innegable. Desde los gigantes de Fortune 500 hasta las startups emergentes, las organizaciones de todos los sectores reconocen el profundo impacto que las tecnologías inmersivas pueden tener en sus resultados.",
    //     //                 "tags": ["ct1", "ct2", "ct3"]
    //     //             },
    //     //             "footer": {
    //     //                 "footer": "De recursos limitados a un escalado rápido, de ser uno más a la experiencia en el dominio. Con RRD GO Creative, ahora puede llevar su negocio al siguiente nivel. ¿Está listo para dar el salto"
    //     //             }
    //     //         },
    //     //         "fr": {
    //     //             "nav": {
    //     //                 "links": [
    //     //                     { "link": "/", "name": "Lien 1" },
    //     //                     { "link": "/", "name": "Lien 2" },
    //     //                     { "link": "/", "name": "Lien 3" }
    //     //                 ]
    //     //             },
    //     //             "component_1": {
    //     //                 "headline": "Prenez l'avantage. Marquez la différence.",
    //     //                 "body": "Du marketing des biens physiques aux expériences de réalité virtuelle immersives mémorables, de la formation classique en salle aux simulateurs VR à fort impact, des ressources limitées à une croissance rapide, de l'anonymat à l'expertise métier. Avec RRD GO Creative, vous pouvez désormais propulser votre entreprise au niveau supérieur. Êtes-vous prêt à faire le saut "
    //     //             },
    //     //             "component_2": {
    //     //                 "headline": "Cliquez ici pour nous contacter",
    //     //                 "button": { "link": "/", "name": "Contactez-nous" }
    //     //             },
    //     //             "component_3": {
    //     //                 "headline": "Marketing Expertspeak",
    //     //                 "body": "L'élan derrière les solutions immersives dans les grandes entreprises est indéniable. Des géants du Fortune 500 aux startups émergentes, les organisations de tous les secteurs reconnaissent l'impact profond que les technologies immersives peuvent avoir sur leur rentabilité.",
    //     //                 "tags": ["ct1", "ct2", "ct3"]
    //     //             },
    //     //             "footer": {
    //     //                 "footer": "Des ressources limitées à une croissance rapide, de l'anonymat à l'expertise métier. Avec RRD GO Creative, vous pouvez désormais propulser votre entreprise au niveau supérieur. Êtes-vous prêt à faire le saut "
    //     //             }
    //     //         }
    //     //     }
    //     // }

    //     const data = siteContent?.data;
    //     return {
    //         brand_name: data?.brandName,
    //         data: data?.languages[lang]
    //     };
    // }, [lang, siteContent?.data]);

    // Method 2 for fetching data from GRAPHQL API 

    const searchParams = useSearchParams();

    const [lang, setLang] = useState<string>(searchParams.get("ln") || 'en');

    const { data: siteContent, error, loading }: any = useQuery(siteQuery, { variables: { id: "multisite_home_001" } });

    const siteData = useMemo(() => {
        const data = siteContent?.site;
        return {
            brand_name: data?.brandName,
            data: data?.languages[lang]
        };
    }, [lang, siteContent?.site]);


    return (
        <ContentProvider.Provider value={{ siteData, lang, setLang, loading }} >
            {children}
        </ContentProvider.Provider>
    )
}

export function useSiteData() {
    const ctx = useContext(ContentProvider);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}


