import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axios } from "../axios";

import "./styles.css";

const ComicPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [comic, setComic] = useState({ title: "", url: "", cover_url: "", type: "", status: "", genres: [], authors: [], artists: [] });
    const [chapters, setChapters] = useState([]);
    const [new_chapter, setNewChapter] = useState({ url: "", number: 0, released_at: new Date().toISOString(), comid_id: params._id });
    const [show_new_chapter, setShowNewChapter] = useState(false);
    const [error_message, setErrorMessage] = useState(null);

    const loadChapters = async () => {
        const temp = await axios
            .get("/chapters", { params: { comic_id: params._id } })
            .then((res) => (res && res.data && res.data.chapters) || []);

        setChapters(chapters.concat(temp));
    };

    const load = async () => {
        if (!params._id || comic._id) return;

        const temp = await axios
            .get(`/comics/${params._id}`)
            .then((res) => (res && res.data) || null)
            .catch((e) => {
                setErrorMessage((e.response) ? e.response.data.message : e);
                resetErrorMessage();
            });

        setComic(temp);

        await loadChapters();
    };

    const resetErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }

    const onChange = (event) => {
        event.preventDefault();

        const key = event.target.name;
        const value = event.target.value;

        if (event.target.nodeName === "SELECT") {
            if (event.target.multiple) {
                // do something
                const values = Array.from(event.target.selectedOptions).map(
                    (opt) => opt.value,
                );
                setComic({ ...comic, [key]: values });
            } else {
                // do something
                setComic({ ...comic, [key]: value });
            }
        } else if (event.target.nodeName === "INPUT") {
            if (key === "artists" || key === "authors") {
                const array = value.split(";").map((v) => v.trim());
                //comic[key] = array;
                setComic({ ...comic, [key]: array });
            } else {
                setComic({ ...comic, [key]: value });
            }
        }
        
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        if (params._id) {
            const temp = await axios
                .put(`/comics/${params._id}`, comic)
                .then((res) => (res && res.data) || null);
            if (!temp) return;
            setComic({ ...comic, ...temp });
        } else {
            const temp = await axios
                .post("/comics", comic)
                .then((res) => (res && res.data) || null);
            if (!temp) return;
            navigate(`/comics/${temp._id}`);
        }
    };

    const addNewChapter = (event) => {
        event.preventDefault();
        setShowNewChapter(!show_new_chapter);
    };

    const onChangeChapter = (field) => {
        return (event) => {
            event.preventDefault();

            let value = (field === "number") ? Number(event.target.value) : event.target.value;
            setNewChapter({ ...new_chapter, [field]: value });

            console.log(new_chapter);
        };
    }

    const saveNewChapter = (event) => {
        event.preventDefault();

        axios.post(`/comics/${params._id}/chapters`, new_chapter).then((res) => {
            if (!res || !res.data) return;
            
            setChapters(chapters.concat([ res.data.chapter ]).sort((a, b) => b.number - a.number));

            setNewChapter({ url: "", number: 0, released_at: new Date().toISOString(), comid_id: params._id });
            setShowNewChapter(false);
        }).catch((e) => {
            setErrorMessage((e.response) ? e.response.data.message : e);
            resetErrorMessage();
        });
    }

    const cancelNewChapter = (event) => {
        setShowNewChapter(false);
    }

    const deleteChapter = (index) => {
        const chapter = chapters[index];
        return (event) => {
            event.preventDefault();
            axios.delete(`/chapters/${ chapter._id }`).then((response) => {
                setChapters(chapters.filter((v, i) => i !== index));
            })
            .catch((e) => {
                setErrorMessage((e.response) ? e.response.data.message : e);
                resetErrorMessage();
            });
        }
    }

    const formatDate = (released_at) => {
        const dt = new Date(released_at);
        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        const month = months[dt.getMonth()];
        const day = dt.getDate();
        const year = dt.getFullYear();
        return `${ month } ${ day }, ${ year }`;
    }

    useEffect(() => {
        load();
    }, [comic._id]);

    const render_chapters = () => {
        if (chapters && Array.isArray(chapters) && chapters.length > 0) {
            return chapters.map((v, index) => (
                <div className="chapter" key={v._id || index}>
                    <a className="no-color" href={v.url} target="_blank" >{`Chapter ${v.number}`}</a>
                    <span>{ formatDate(v.released_at) }</span>
                    <button className="delete" onClick={ deleteChapter(index) }>Delete</button>
                </div>));
        }
        return (
            <div className="no-chapters">
                <span>No Chapters</span>
            </div>
        );
    };

    return (
        <div id="comic-page" className="page">
            { (error_message) ? <span className="warning">{ error_message }</span> : <></> }
            <div className="header">
                <h2>Comic</h2>
            </div>
            <div className="content">
                { (params._id && comic.cover_url) ? (<img className="cover" src={comic.cover_url} alt={comic.title} />) : (<></>) }
                <form className={ "form" + ((params._id && comic.cover_url) ? " show-cover" : " no-cover") }>
                    <div className="box">
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" type="text" value={ comic.title } onChange={ onChange } />
                    </div>
                    <div className="box">
                        <label htmlFor="url">Official Url</label>
                        <input id="url" name="url" type="text" value={comic.url} onChange={ onChange } />
                    </div>
                    <div className="box">
                        <label htmlFor="cover_url">Cover Url</label>
                        <input id="cover_url" name="cover_url" type="text" value={comic.cover_url} onChange={ onChange } />
                    </div>
                    <div className="box">
                        <label htmlFor="type">Type</label>
                        <input id="type" name="type" type="text" value={comic.type} onChange={ onChange } />
                    </div>
                    <div className="box">
                        <label htmlFor="status">Status</label>
                        <input id="status" name="status" type="text" value={comic.status} onChange={ onChange } />
                    </div>
                    <div className="box">
                        <label htmlFor="genres">Status</label>
                        <select id="genres" name="genres" multiple value={ comic.genres } onChange={ onChange } >
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
                    <div className="box">
                        <label htmlFor="authors">Authors</label>
                        <input id="authors" name="authors" type="text" value={comic.authors} onChange={ onChange } />
                    </div>
                    <div className="box">
                        <label htmlFor="artists">Artists</label>
                        <input id="artists" name="artists" type="text" value={comic.artists} onChange={ onChange } />
                    </div>
                    <div className="actions">
                        <button id="submit" type="submit" onClick={ onSubmit }>Save</button>
                    </div>
                </form>
            </div>

            {
            (show_new_chapter) ? (
                <div className="new_chapter">
                    <div className="header">
                        <h2>New Chapter</h2>
                    </div>
                    <form className="content">
                        <input id={ `new_chapter_url` } name={ `new_chapter_url` } type="text" value={ new_chapter.url } onChange={ onChangeChapter("url") } />
                        <input id={ `new_chapter_number` } name={ `new_chapter_number` } type="number" value={ new_chapter.number } onChange={ onChangeChapter("number") } />
                        <input id={ `new_chapter_released_at` } name={ `new_chapter_released_at` } type="datetime-local" value={ new_chapter.released_at } onChange={ onChangeChapter("released_at") } />
                        <div className="actions">
                            <button onClick={ saveNewChapter }>Save</button>
                            <button onClick={ cancelNewChapter }>Cancel</button>
                        </div>
                    </form>
                </div>) : (<></>)
            }

            {params._id ? (
                <div className="chapters">
                    <div className="header">
                        <h2>Chapters</h2>
                        <button id="new_chapter" onClick={addNewChapter}>
                            Add Chapter
                        </button>
                    </div>
                    <div className="grid">{render_chapters()}</div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ComicPage;
