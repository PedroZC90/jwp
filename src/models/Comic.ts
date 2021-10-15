import { Document, Model, model, Schema } from "mongoose";

//  1. create a interface representing a decumento in mongodb.
export interface IComic extends Document {
    url: string;
    title: string;
    type?: string;
    status?: string;
    genres?: string[];
    authors?: string[];
    artists?: string[];
}

//  2. create a schema corresponding to the document interface.
const ComicSchema = new Schema<IComic>({
    url: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: false },
    status: { type: String, required: false },
    genres: [ String ],
    authors: [ String ],
    artists: [ String ]
});

//  3. create a model.
const Comic: Model<IComic> = model("Comic", ComicSchema, "comics");

export default Comic;
