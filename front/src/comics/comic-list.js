import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { axios } from "../axios";

import "./styles.css";

const ComicList = () => {
    const navigate = useNavigate();

    const [comics, setComics] = useState([]);
    const [page, setPage] = useState(1);
    const rpp = 15;
    const isMounted = false;

    const load = async () => {
        const params = { page: page, rpp: rpp };
        const comics = await axios
            .get("/comics", { params })
            .then((res) => (res && res.data && res.data.comics) || []);

        setComics(comics);
    };

    const next = async (event) => {
        event.preventDefault();

        setPage(page + 1);
        await load();
    };

    const previous = async (event) => {
        event.preventDefault();

        setPage(page - 1);
        await load();
    };

    const render_comics = (comics = []) => {
        if (comics && Array.isArray(comics) && comics.length > 0) {
            return comics.map((comic) => {
                return (
                    <a className="box no-color" href={`comics/${comic._id}`} key={comic._id}>
                        <div >
                            <h2>{comic.title}</h2>
                            <span>{comic.type}</span>
                        </div>
                    </a>
                );
            });
        } else {
            return <span>No comic found.</span>;
        }
    };

    const create = (event) => {
        event.preventDefault();
        navigate("/comics/create", { replace: true });
    };

    useEffect(() => {
        load();
    }, [ isMounted ]);

    return (
        <div className="comic-list">
            <div className="header">
                <h2>Comics</h2>
            </div>
            <div className="comics-ctrl">
                <button id="create" onClick={create}>Create</button>
            </div>
            <div className="comics-grid">{render_comics(comics)}</div>
            <div className="comics-ctrl">
                { (page > 1) ? (
                <button id="previous" onClick={previous}>Back</button>
                ) : (<></>) }
                <button id="next" onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default ComicList;
