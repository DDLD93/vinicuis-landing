import mongoose from "mongoose";

export interface DivisionKeyService {
  title: string;
  description: string;
}

export interface DivisionDetailedContent {
  headline: string;
  introduction: string;
  keyServices: DivisionKeyService[];
  overview: string;
  clientele?: string;
}

export interface Division {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  detailedContent: DivisionDetailedContent;
}

const KeyServiceSchema = new mongoose.Schema(
  { title: { type: String, required: true }, description: { type: String, required: true } },
  { _id: false }
);

const DivisionSchema = new mongoose.Schema<{
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  detailedContent: DivisionDetailedContent;
}>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
    detailedContent: {
      headline: { type: String, required: true },
      introduction: { type: String, required: true },
      keyServices: [KeyServiceSchema],
      overview: { type: String, required: true },
      clientele: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const DivisionModel =
  mongoose.models.Division ?? mongoose.model("Division", DivisionSchema);

export function toDivision(doc: {
  _id: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  detailedContent: DivisionDetailedContent;
}): Division {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    image: doc.image,
    icon: doc.icon,
    detailedContent: {
      headline: doc.detailedContent.headline,
      introduction: doc.detailedContent.introduction,
      keyServices: doc.detailedContent.keyServices ?? [],
      overview: doc.detailedContent.overview,
      clientele: doc.detailedContent.clientele || undefined,
    },
  };
}
