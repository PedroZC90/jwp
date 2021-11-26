import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { axios } from "../axios";

import "./styles.css";

const ComicList = () => {
    const navigate = useNavigate();

    const [comics, setComics] = useState([]);
    const [params, setParams] = useState({ page: 1, rpp: 15 });
    const [error_message, setErrorMessage] = useState(null);
    //const [total, setTotal] = useState(0);

    const isMounted = false;

    const load = async () => {
        const request_params = params;
        console.log(params);
        const comics = await axios
            .get("/comics", {
                params: request_params,
                paramsSerializer: (v) => QueryString.stringify(v, { arrayFormat: "repeat" })
            })
            .then((res) => (res && res.data && res.data.comics) || [])
            .catch((e) => {
                setErrorMessage((e.response) ? e.response.data.message : e);
                resetErrorMessage();
            });

        setComics(comics);
    };

    const resetErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }

    const next = async (event) => {
        event.preventDefault();

        //setPage(page + 1);
        const page = (params.page || 0) + 1;
        setParams({ ...params, page });
        await load();
    };

    const previous = async (event) => {
        event.preventDefault();

        if (params.page <= 1) return;
        const page = (params.page || 2) - 1;
        setParams({ ...params, page });
        await load();
    };

    const onDeleteComic = (index) => {
        const comic = comics[index];
        return (event) => {
            event.preventDefault();

            axios.delete(`/comics/${ comic._id }`)
                .then((response) => {
                    if (response && response.status === 200) {
                        setComics( comics.filter((v, i) => i !== index));
                    }
                }).catch((e) => {
                    setErrorMessage((e.response) ? e.response.data.message : e);
                    resetErrorMessage();
                });
        }
    }

    const render_comics = (comics = []) => {
        if (comics && Array.isArray(comics) && comics.length > 0) {
            return comics.map((comic, index) => {
                return (
                    <a className="box no-color" href={`comics/${comic._id}`} key={comic._id}>
                        <div className="card">
                            <h2>{comic.title}</h2>
                            <span>{comic.type}</span>
                            <button id={ `btn-${index}` } className="delete" onClick={ onDeleteComic(index) }>Delete</button>
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

    const onSelectGenres = (event) => {
        event.preventDefault();

        const key = event.target.name;
        const value = event.target.value;

        if (event.target.multiple) {
            // do something
            const genre = Array.from(event.target.selectedOptions).map(
                (opt) => opt.value,
            );
            setParams({ ...params, genre });
        } else {
            // do something
            setParams({ ...params, genre: value });
        }        
    };

    useEffect(() => {
        load();
    }, [ isMounted ]);

    return (
        <div className="comic-list">
            { (error_message) ? <span className="warning">{ error_message }</span> : <></> }
            <div className="header">
                <h2>Comics</h2>
            </div>
            <div className="comics-ctrl">
                <div className="box">
                    <label htmlFor="genres">Status</label>
                    <select id="genres" name="genres" multiple value={ params.genre } onChange={ onSelectGenres } >
                        <option>Action</option>
                        <option>Adult</option>
                        <option>Adventure</option>
                        <option>Comedy</option>
                        <option>Cooking</option>
                        <option>Doujinshi</option>
                        <option>Drama</option>
                        <option>Ecchi</option>
                        <option>Fantasy</option>
                        <option>Gender Bender</option>
                        <option>Harem</option>
                        <option>Historical</option>
                        <option>Horror</option>
                        <option>Isekai</option>
                        <option>Josei</option>
                        <option>Manhua</option>
                        <option>Manhwa</option>
                        <option>Martial Arts</option>
                        <option>Mature</option>
                        <option>Mecha</option>
                        <option>Medical</option>
                        <option>Mystery</option>
                        <option>One Shot</option>
                        <option>Psychological</option>
                        <option>Romance</option>
                        <option>School Life</option>
                        <option>Sci-fi</option>
                        <option>Seinen</option>
                        <option>Shoujo-Ai</option>
                        <option>Shoujo</option>
                        <option>Shounen-Ai</option>
                        <option>Shounen</option>
                        <option>Slice of Life</option>
                        <option>Smut</option>
                        <option>Sports</option>
                        <option>Supernatural</option>
                        <option>Tragedy</option>
                        <option>Webtoons</option>
                        <option>Yaoi</option>
                        <option>Yuri</option>
                    </select>
                </div>
                <button id="filter" className="box" onClick={load}>Filter</button>
                <button id="create" className="box" onClick={create}>Create</button>
            </div>
            <div className="comics-grid">{render_comics(comics)}</div>
            <div className="comics-ctrl">
                { (params.page > 1) ? (
                <button id="previous" onClick={previous}>Back</button>
                ) : (<></>) }
                <button id="next" onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default ComicList;
