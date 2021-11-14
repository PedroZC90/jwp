import React from "react";
import { axios } from "../axios";

import "./styles.css";

export default class ComicList extends React.Component {
    constructor() {
        super();

        this.state = {
            page: 1,
            rpp: 15,
            comics: [],
        };
    }

    componentDidMount() {
        this.load();
    }

    async load() {
        const params = {
            page: this.state.page,
            rpp: this.state.rpp,
        };
        const comics = await axios
            .get("/comics", { params })
            .then((res) => (res && res.data && res.data.comics) || []);

        this.setState({ comics });
    }

    next = async (event) => {
        event.preventDefault();

        const page = this.state.page + 1;
        this.setState({ page }, () => {
            this.load();
        });
    };

    previous = (event) => {
        event.preventDefault();
        this.setState({ page: this.state.page - 1 }, () => {
            this.load();
        });
    };

    render_comics = (comics = []) => {
        if (comics && Array.isArray(comics) && comics.length > 0) {
            return comics.map((comic, index) => {
                return (
                    <a className="no-color" href={`comics/${comic._id}`}>
                        <div key={comic._id}>
                            <h2>{comic.title}</h2>
                            <span>{comic.type}</span>
                        </div>
                    </a>
                );
            });
        } else {
            return <span>No comic found.</span>;
        }
    }

    render() {
        const grid = this.render_comics(this.state.comics);

        return (
            <div className="comic-list">
                <h2>Comics</h2>
                <div className="comics-ctrl">
                    <button id="create">Create</button>
                </div>
                <div className="comics-grid">{ grid }</div>
                <div className="comics-ctrl">
                    {
                        (this.state.page > 1) ?
                            (<button id="previous" onClick={ this.previous }>Back</button>) :
                            (<></>)
                    }
                    <button id="next" onClick={ this.next }>Next</button>
                </div>
            </div>
        );
    }
}
