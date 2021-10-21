import { Document, Model, model, Schema } from "mongoose";
import { IComic } from "./Comic";

//  1. create a interface representing a decumento in mongodb.
export interface IChapter extends Document {
    url: string;
    number: number;
    released_at?: Date;
    comic: IComic | string;
}

//  2. create a schema corresponding to the document interface.
const ChapterSchema = new Schema<IChapter>({
    url: { type: String, required: true },
    number: { type: Number, default: 0, required: true },
    released_at: { type: Date, required: false },
    comic: { type: Schema.Types.ObjectId, ref: "Comic" }
});

//  3. create a model.
const Chapter: Model<IChapter> = model("Chapter", ChapterSchema, "chapters");

export default Chapter;
