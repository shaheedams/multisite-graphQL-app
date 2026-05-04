import { ApolloServer } from "@apollo/server";
import { SiteModel } from "../models/Site.model";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
type MultiSite {
  _id: ID
  siteId: String
  brandName: String
  languages: Languages
}

type Languages {
  en: LanguageContent
  es: LanguageContent
  fr: LanguageContent
}

type LanguageContent {
  _id: ID
  nav: Navigation
  component_1: ComponentOne
  component_2: ComponentTwo
  component_3: ComponentThree
  footer: Footer
}

type Navigation {
  links: [NavLink]
}

type NavLink {
  _id: ID
  link: String
  name: String
}

type ComponentOne {
  headline: String
  body: String
}

type ComponentTwo {
  headline: String
  button: Button
}

type Button {
  _id: ID
  link: String
  name: String
}

type ComponentThree {
  headline: String
  body: String
  tags: [String]
}

type Footer {
  footer: String
}

type Query{
  sites: [MultiSite]
  site(id: String): MultiSite
}
`



const resolvers = {
  Query: {
    async sites() {
      const data = await SiteModel.find().lean();
      return data
    }, async site(_parent: any, args: any, _context: any) {
      const data = await SiteModel.findOne({ siteId: args.id }).lean();
      return data
    },
  }
}



export const connectGraphQL = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 7800
    }
  })

  console.log(`GraphQL is running in : ${url}`)
}
