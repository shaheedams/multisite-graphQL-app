import mongoose, { Document, Schema } from "mongoose";

interface SiteTypes extends Document {
    siteId: string,
    brandName: string,
    languages: ContentTypes
}

interface ContentTypes extends Document {
    nav: string,
    component_1: string,
    component_2: string,
    component_3: string,
    footer: string,
}

interface LinkTypes extends Document {
    link: string,
    name: string,
}

const LinkSchema = new Schema<LinkTypes>({
    link: { type: String },
    name: { type: String }
});

const LanguageContentSchema = new Schema<ContentTypes>({
    nav: {
        links: [LinkSchema]
    },
    component_1: {
        headline: String,
        body: String
    },
    component_2: {
        headline: String,
        button: LinkSchema
    },
    component_3: {
        headline: String,
        body: String,
        tags: [String]
    },
    footer: {
        footer: String
    }
})

const SiteSchema = new Schema<SiteTypes>({
    siteId: {
        type: String,
        unique: true,
        index: true,
        required: [true, "SiteId is required"]
    }, brandName: {
        type: String,
        required: [true, "Brabd name is required"]
    }, languages: {
        type: Map,
        of: LanguageContentSchema
    }
}, { timestamps: true });

export const SiteModel = mongoose.model<SiteTypes>('Site', SiteSchema);