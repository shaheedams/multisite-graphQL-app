"use client"
import { ChangeEvent, useState } from 'react';
import './navBar.css';
import { useSiteData } from '@/app/utils/providers/ContentProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface NavBar {
    brand: string;
    links?: linkType[];
}

interface linkType {
    name: string;
    link: string;
}

export const NavBar = ({ brand, links = [] }: NavBar) => {

    const { lang, setLang } = useSiteData();
    const [selectedLang, setSelectedLang] = useState<string>(lang);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const onSelectLang = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value) {
            setLang(event.target.value);
            setSelectedLang(event.target.value);
            params.set("ln", event.target.value);
            router.push(`${pathname}?${params.toString()}`);
        }
    }


    return (
        <nav>
            <div className="ctm-container ">
                <div className="nav_container">
                    <div>
                        <div className="brand">{brand}</div>
                        <select className='customSelect' name="lang" id="lang" defaultValue={selectedLang} onChange={onSelectLang}>
                            <option value="en">en</option>
                            <option value="es">es</option>
                            <option value="fr">fr</option>
                        </select>
                    </div>
                    <div className="links">
                        {
                            links.map((t) => {
                                return <div key={t.name.trim()} className="link"><a href={t.link}>{t.name}</a></div>
                            })
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}