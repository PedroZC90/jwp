import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axios } from "../axios";

import "./styles.css";

const ComicPage = () => {

    const [ comic, setComic ] = useState({});
    const [ chapters, setChapters ] = useState([]);
    const params = useParams();

    const loadChapters = async () => {
        const temp = await axios.get("/chapters", { params: { comic_id: params._id } })
            .then((res) => ((res && res.data) && res.data.chapters) || []);

        console.log(temp);
        setChapters(chapters.concat(temp));
    }

    const load = async () => {
        if (!params._id || comic._id) return;
        
        const temp = await axios.get(`/comics/${params._id}`)
            .then((res) => (res && res.data) || null);
        
        console.log(temp);
        setComic(temp);

        await loadChapters();
    }

    const onChange = (event) => {
        event.preventDefault();

        const key = event.target.name;
        const value = event.target.value;

        comic[key] = value;

        setComic(comic);
    }

    useEffect(() => {
        load();
    }, [ comic._id ]);

    const render_genres = (genres) => {
        if (genres && Array.isArray(genres)) {
            return genres.map((g, index) => (
                <span key={ index }>{ g }</span>
            ));
        }
        return (<span>No Genre</span>)
    }

    const render_authors = (authors) => {
        if (authors && Array.isArray(authors)) {
            return authors.map((name, index) => (
                <span key={ index }>{ name }</span>
            ));
        }
        return (<span>No Authors</span>)
    }

    const render_artists = (artists) => {
        if (artists && Array.isArray(artists)) {
            return artists.map((name, index) => (
                <span key={ index }>{ name }</span>
            ));
        }
        return (<span>No Artists</span>)
    }

    const render_chapters = (chapters) => {
        if (chapters && Array.isArray(chapters)) {
            return chapters.map((v) => (
                <a className="no-color" href={ v.url } key={ v._id }>{ `Chapter ${v.number}` }</a>
            ));
        }
        return (<span>No Chapters</span>)
    }
    
    return (
        <div className="comic-page">
            <img src={ comic.cover_url } alt={ comic.title }/>
            <div className="comic-info">
                <div>
                    <label for="title">Title</label>
                    { (params._id) ?
                        <h1><a className="no-color" href={ comic.url } target="_blank" rel="noreferrer">{ comic.title }</a></h1> :
                        <input id="title" name="title" type="text" value={ comic.title } onChange={ onChange } />
                    }
                </div>
                <div>
                    <label for="type">Type</label>
                    { (params._id) ?
                        <span>{ comic.type }</span> :
                        <input id="type" name="type" type="text" placeholder="Type" value={ comic.type } onChange={ onChange } />
                    }
                </div>
                <div>
                    <label for="status">Status</label>
                    { (params._id) ?
                        <span>{ comic.status }</span> :
                        <input id="status" name="status" type="text" placeholder="Status" value={ comic.status } onChange={ onChange } />
                    }
                </div>
                <div>
                    <label for="genres">Genres</label>
                    { <div className="comic-genres">{ render_genres(comic.genres) }</div> }
                </div>
                { <div>{ render_authors(comic.authors) }</div> }
                { <div>{ render_artists(comic.artists) }</div> }
                
            </div>
            <div className="comic-chapters">
                <h2>Chapters</h2>
                { render_chapters(chapters) }
            </div>
        </div>
    );

}

export default ComicPage;
