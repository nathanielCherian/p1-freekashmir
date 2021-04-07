import React, { useEffect, useState } from 'react';
import { Input } from '../components/Input';

export const SearchExplore = () => {

    const [searchQuery, setSearchQuery] = useState<String>("");
 

    const loadData = () => {

    }

    useEffect(()=> {
        loadData();
    }, [])


    return (
        <div>
            <h1>Explore</h1>
            <div className="form-container">
                <h1>Search for a name or class.</h1>
                <form className="form">
                    <Input params={{placeholder:"search"}} onchange={(event)=>setSearchQuery(event.target.value)}/>
                </form>
            </div>
        </div>
    )
}